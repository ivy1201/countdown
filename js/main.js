var WINDOW_WIDTH = document.body.clientWidth,
	WINDOW_HEIGHT = document.body.clientHeight,
	can1,
	ctx1,
	can1,
	ctx2,
	bgPic = new Image(),
	starPic = new Image(),
	secondToShow = 0,
	endTime = new Date(),
	MARGIN_LEFT = Math.round(WINDOW_WIDTH/10),
	MARGIN_TOP = 60,
	RADIUS = Math.round(WINDOW_WIDTH * 4 /5 / 108) -1,
	stars = [],
	num = 88,
	lastTime,
	deltaTime;
endTime.setTime(endTime.getTime() + 3600 * 1000);
	

window.onload = function() {
	can1 = document.getElementById("canvas1");
	ctx1 = can1.getContext("2d");
	can2 = document.getElementById("canvas2");
	ctx2 = can2.getContext("2d");
	can1.width = can2.width = WINDOW_WIDTH;
	can1.height = can2.height = WINDOW_HEIGHT;
	bgPic.onload = function() {
		ctx1.drawImage(bgPic,0,0,can1.width,can1.height);
	}
	starPic.onload = function() {
		drawStars();
	}
	bgPic.src = "images/bg.jpg";
	starPic.src ="images/star.png";
	for (var i = 0; i < num; i++) {
		stars[i] = new starObj();
		stars[i].init();
	}
	secondToShow = getSecondToShow();
	lastTime = Date.now();
	gameLoop();
}

function gameLoop() {
	window.requestAnimationFrame(gameLoop);
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	secondToShow = getSecondToShow();
	render();
	drawStars();
}

function render() {
	ctx2.clearRect(0,0, WINDOW_WIDTH,WINDOW_HEIGHT);
	var hours = parseInt(secondToShow / 3600),
		minutes = parseInt((secondToShow - hours * 60) / 60),
		seconds = parseInt(secondToShow % 60);
	renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10))
    renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10))
    renderDigit( MARGIN_LEFT + 30*(RADIUS+1) , MARGIN_TOP , 10)
    renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10));
    renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10));
    renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10);
    renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10));
    renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10));
}

function getSecondToShow() {
	var sec = endTime.getTime() - new Date().getTime();
	sec = Math.round(sec/1000);
	return sec > 0 ? sec : 0;
}

function renderDigit(x, y, num) {
	ctx2.fillStyle = "red";

	for (var i =0, len = digit[num].length; i < len; i++) {
		for(var j=0; j < digit[num][i].length; j++) {
			if(digit[num][i][j] === 1) {
				ctx2.beginPath();
				ctx2.arc(x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI);
				ctx2.closePath();
				ctx2.fill();
			}
		}
	}
}

window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            // if all else fails, use setTimeout
            function (callback) {
                return window.setTimeout(callback, 1000 / 60); // shoot for 60 fps
            };
})();