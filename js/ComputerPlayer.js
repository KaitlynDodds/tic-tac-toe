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
	const move = this.selectSomewhatIntelligentMove(tempGameState);

	// trigger move on active game state 
	this.activeGameState.makeMove(move);
}

ComputerPlayer.prototype.getRandomNumber = function(max) {
	return Math.floor(Math.random() * max);
}

ComputerPlayer.prototype.selectRandomMove = function(gameState) {
	const randNum = this.getRandomNumber(gameState.gameBoard.getAvailableSpaces().length);
	return gameState.gameBoard.getAvailableSpaces()[randNum];
}

ComputerPlayer.prototype.selectSomewhatIntelligentMove = function(gameState) {
	let move = -1;

	// if other player is about to win, select space to prevent win 
	move = this.selectWinningMove(gameState); 

	// select corner if possible
	if (move < 0) {
		move = this.selectCorner(gameState);
	}

	// no corner or winning move to select, select a random move 
	if (move < 0) {
		move = this.selectRandomMove(gameState);
	}

	return move;
}

ComputerPlayer.prototype.selectCorner = function(gameState) {
	const corners = [0, 2, 6, 8];
	const moves = gameState.gameBoard.getAvailableSpaces();
	for (let i = 0; i < moves.length; i++) {
		if (corners.indexOf(moves[i]) > -1) {
			return moves[i];
		}
	}
	return -1; 
}

ComputerPlayer.prototype.selectWinningMove = function(gameState) {
	const board = gameState.getGameBoard();
	// loop over all winning scenarios 
	for (let i = 0; i < gameState.winningScenarios.length; i++) {
		// get winning scenario to compare to 
		const ws = gameState.winningScenarios[i];
		
		// if any two values match, return the third 

		// if first and second value match, return third if space not already occupied  
		if ((board[ws[0]] !== undefined && board[ws[0]] === board[ws[1]]) 
			&& (board[ws[2]] === undefined)) 
		{
			return ws[2];
		}

		// if first and last value match, return second if space not already occupied 
		if ((board[ws[0]] !== undefined && board[ws[0]] === board[ws[2]]) 
			&& (board[ws[1]] === undefined)) 
		{
			return ws[1];
		}

		// if second and third value match, return first if space not already occupied 
		if ((board[ws[1]] !== undefined && board[ws[1]] === board[ws[2]]) 
			&& (board[ws[0]] === undefined)) 
		{
			return ws[0];
		}
	}

	// otherwise return rand move 
	return -1;
}




































