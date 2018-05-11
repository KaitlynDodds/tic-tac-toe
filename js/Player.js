function Player(value, name) {
	this.val = value;
	this.name = name;
}

Player.prototype.takeTurn = function(game, move) {
	// no need to make move
	if (game.isOver()) return game;
	
	// make move on game board 
	game.makeMove(move, this);
}