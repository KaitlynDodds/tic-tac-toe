function Board() {
	this.spaces = Array(9);

	this.occupiedSpaces = 0;
	this.unoccupiedSpaces = this.spaces.length;

	this.blankSpaces = [];
	for(let i = 0; i < this.spaces.length; i++) {
		this.blankSpaces.push(i);
	} 
}

/* Board Actions
*************************/

Board.prototype.placePiece = function(space, value) {
	this.spaces[space] = value;

	// update counts 
	this.occupiedSpaces += 1;
	this.unoccupiedSpaces -= 1; 
	// remove move option 
	const i = this.blankSpaces.indexOf(space);
	this.blankSpaces.splice(i, 1);
}


/* Board Values 
*************************/

Board.prototype.isUnplayed = function() {
	return this.occupiedSpaces === 0;
}

Board.prototype.isFull = function() {
	return this.occupiedSpaces === this.spaces.length;
}

Board.prototype.getAvailableSpaces = function() {
	return this.blankSpaces;
}

Board.prototype.isEmptySpace = function(space) {
	return this.spaces[space] === undefined;
}