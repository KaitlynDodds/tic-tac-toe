function ComputerPlayer(value, name) {
	Player.call(this, value, name);
	this.activeGameState = null;
}

ComputerPlayer.prototype = Object.create(Player.prototype);

ComputerPlayer.prototype.takeTurn = function(gameState) {
	// copy objects
	this.activeGameState = gameState; 

	const tempGameBoard = $.extend(true, {}, gameState.gameBoard);
	const tempGameState = $.extend(true, {}, gameState);
	// ensure gameBoards are not referencing the same boards
	tempGameState.gameBoard = tempGameBoard;

	// select best move option
	const move = this.selectRandomMove(tempGameState);

	// trigger move on active game state 
	this.activeGameState.makeMove(move);
}

ComputerPlayer.prototype.selectRandomMove = function(gameState) {
	const randNum = Math.floor(Math.random() * gameState.gameBoard.getAvailableSpaces().length);
	return gameState.gameBoard.getAvailableSpaces()[randNum];
}
