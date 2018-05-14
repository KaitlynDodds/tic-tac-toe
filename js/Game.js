
function Game(gameDisplay) { 
	this.winner = null;

	// all possible winning scenarios 
	this.winningScenarios = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 4, 8],
		[2, 4, 6],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8]
	];
}

/* Game Actions
*************************/

Game.prototype.load = function() {
	this.gameDisplay.showStart();
}

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

Game.prototype.makeMove = function(move, box) {
	// add to game state
	this.gameBoard.placePiece(move, this.currentPlayer.val);

	// update UI 
	this.gameDisplay.styleBox(box, this.currentPlayer.val);

	// check if winning move was played 
	this.checkForWinner();

	// handle next actions 
	this.moveOn();
}

Game.prototype.moveOn = function() {
	if (this.isOver()) {
		this.gameDisplay.showWinOrDraw();
	} else {
		// switch currentPlayer, update UI 
		this.toggleActivePlayer();

		// if playing against computer, trigger computer player to take turn 
		if (this.isCurrentPlayerComputerPlayer()) {
			this.triggerComputerPlayer();
		}	
	}
}

// need to trigger computer player to make a move
Game.prototype.triggerComputerPlayer = function() {
	// slight delay before taking turn 
	window.setTimeout((function() {
		this.currentPlayer.takeTurn(this);
	}).bind(this), 900);
}

Game.prototype.toggleActivePlayer = function() {
	// set new current player 
	const player = this.currentPlayer;
	this.currentPlayer = this.offPlayer;
	this.offPlayer = player;

	// update UI
	this.gameDisplay.updateActivePlayerUI();	
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

Game.prototype.isCurrentPlayerComputerPlayer = function() {
	return this.currentPlayer instanceof ComputerPlayer;
}

Game.prototype.isEmptySpace = function(space) {
	return this.getGameBoard()[space] === undefined;
}

// checks if space is empty or if game is already over 
Game.prototype.isValidSpace = function(space) {
	// check if space is empty 
	if (!this.isEmptySpace(space)) return false; 

	// check if game is over 
	if (this.isOver()) return false; 

	return true;
}

// checks to see if a winning move has been played 
Game.prototype.checkForWinner = function() {
	// is it worth checking?
	if (this.gameBoard.occupiedSpaces < 5) return;

	const board = this.getGameBoard();
	
	for (let i = 0; i < this.winningScenarios.length; i++) {
		// get winning scenario to compare to 
		const ws = this.winningScenarios[i];

		if (board[ws[0]] !== undefined &&
			board[ws[0]] === board[ws[1]] &&
			board[ws[0]] === board[ws[2]]) 
		{
			// winning combo, set game winner
			this.winner = this.currentPlayer;
			break;
		}
	}
}

Game.prototype.setGameDisplay = function(gameDisplay) {
	this.gameDisplay = gameDisplay;
}































