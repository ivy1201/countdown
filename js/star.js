var starObj = function (){
	this.x;
	this.y;
	this.picNo;
	this.timer;
	this.xSpd;
	this.ySpd;
};
starObj.prototype = {
	init: function(){
		this.x = Math.random() * WINDOW_WIDTH;
		this.y = Math.random() * WINDOW_HEIGHT;
		this.picNo = Math.random() * 5;
		this.timer = 0;
		this.xSpd = Math.random() * 6 - 3;
		this.ySpd = Math.random() * 6 - 3;
	},
	draw: function() {
		ctx2.drawImage(starPic, this.picNo * 7, 0, 7,7,this.x, this.y,7,7);
	},
	update: function() {
		this.timer += deltaTime;
		this.x += this.xSpd + deltaTime * 0.0002;
		this.y += this.ySpd + deltaTime * 0.0002;
		if(this.x < 0 || this.x > WINDOW_WIDTH || this.y < 0 || this.y > WINDOW_HEIGHT) {
			this.init();
			return;
		}
		if(this.timer > 50){
			this.picNo += 1;
			this.picNo %= 7;
		}
	}
}
function drawStars() {
	for(var i = 0; i < num; i++){
		stars[i].draw();
		stars[i].update();
	}
}
