
function Game() { 
	this.winner = null;
}

/* Game Actions
*************************/

Game.prototype.start = function(player1, player2) {
	// player 1 is always 'O'
	if (player1.val === 'O') {
		this.player1 = player1;	
		this.player2 = player2;
	} else {
		this.player1 = player2;
		this.player2 = player1;
	}
	this.currentPlayer = player1;  	// default starting player
	this.offPlayer = player2;
	
	this.gameBoard = new Board();
	this.winner = null;
}

Game.prototype.nextPlayer = function() {
	// set new current player 
	const player = this.currentPlayer;
	this.currentPlayer = this.offPlayer;
	this.offPlayer = player;

	if (this.currentPlayer instanceof ComputerPlayer) {
		// need to trigger next move 
		this.currentPlayer.takeTurn(this);
	}	
}

Game.prototype.isValidSpace = function(space) {
	// check if space is empty 
	if (!this.isEmptySpace(space)) return false; 

	// check if game is over 
	if (this.isOver()) return false; 

	return true;
}

Game.prototype.makeMove = function(move) {
	this.gameBoard.placePiece(move, this.currentPlayer.val);

	this.checkForWinner();

	// no winner, move to next player 
	if (!this.winner) {
		this.nextPlayer();
	}
}


/* Helper Functions
*************************/

Game.prototype.getGameBoard = function() {
	return this.gameBoard.spaces; 
}

Game.prototype.isDraw = function() {
	return this.gameBoard.isFull() && !this.winner; 
}

Game.prototype.isOver = function() {
	return this.winner || this.isDraw();
}

Game.prototype.isEmptySpace = function(space) {
	return this.getGameBoard()[space] === undefined;
}

Game.prototype.checkForWinner = function() {
	const board = this.getGameBoard();
	// all possible winning scenarios 
	const winningScenarios = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 4, 8],
		[2, 4, 6],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8]
	];
	for (let i = 0; i < winningScenarios.length; i++) {
		// get winning scenario to compare to 
		const ws = winningScenarios[i];

		if (board[ws[0]] !== undefined &&
			board[ws[0]] === board[ws[1]] &&
			board[ws[0]] === board[ws[2]]) 
		{
			// winning combo
			this.winner = this.currentPlayer;
			break;
		}
	}
}































