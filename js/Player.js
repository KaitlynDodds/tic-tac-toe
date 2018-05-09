function Player(value, name) {
	this.val = value;
	this.name = name;
}

Player.prototype.move = function() {
	return [0, 0];
}