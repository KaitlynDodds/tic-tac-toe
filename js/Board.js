function Board() {
	this.board = Array(9);
	this.numberOfEmptySpaces = this.board.length;
	this.numberOfOccupiedSpaces = 0;
	this.blankSpaces = [];
	for (let i = 0; i < this.board.length; i++) {
		this.blankSpaces.push(i);
	}
}

Board.prototype.isEmptySpace = function(space) {
	return this.board[space] === undefined;
}

Board.prototype.placePiece = function(piece, player) {
	if (this.isEmptySpace(piece)) {
		// set value 
		this.board[piece] = player.val;

		// increment/decrement related values 
		this.numberOfOccupiedSpaces += 1;
		this.numberOfEmptySpaces -= 1;

		// no longer blank space 
		const index = this.blankSpaces.indexOf(piece);
		this.blankSpaces.splice(index, 1);
	}
}

Board.prototype.contents = function(piece) {
	return this.board[piece];
}

Board.prototype.getBoard = function() {
	return this.board;
}

Board.prototype.printBoard = function() {
	let print = "";
	for (let i = 0; i < this.board.length; i++) {
		print += (this.board[i] ? `[${this.board[i]}]` : `[-]`);
		if (i === 2 || i === 5 || i === 8) {
			print += '\n';
		}
	}
	console.log(print);	
}