function ComputerPlayer(value, name) {
	Player.call(this, value, name);
	this.activeGameState = null;
}

ComputerPlayer.prototype = Object.create(Player.prototype);

ComputerPlayer.prototype.takeTurn = function(gameState) {
	// copy objects
	this.activeGameState = gameState; 

	// select best move option
	const move = this.selectSomewhatIntelligentMove();

	// style box 
	const box = this.activeGameState.gameDisplay.getBox(move);
	this.activeGameState.gameDisplay.styleBox(box, this.val);

	// trigger move on active game state 
	this.activeGameState.makeMove(move);
}

ComputerPlayer.prototype.getRandomNumber = function(max) {
	return Math.floor(Math.random() * max);
}

ComputerPlayer.prototype.selectRandomMove = function() {
	const randNum = this.getRandomNumber(this.activeGameState.gameBoard.getAvailableSpaces().length);
	return this.activeGameState.gameBoard.getAvailableSpaces()[randNum];
}

ComputerPlayer.prototype.selectSomewhatIntelligentMove = function() {
	let move = -1;

	// if other player is about to win, select space to prevent win 
	move = this.selectWinningMove(); 

	// otherwise select corner if possible
	if (move < 0) {
		move = this.selectCorner();
	}

	// no corner or winning move to select, select a random move 
	if (move < 0) {
		move = this.selectRandomMove();
	}

	return move;
}

ComputerPlayer.prototype.selectCorner = function() {
	const corners = [0, 2, 6, 8];
	const moves = this.activeGameState.gameBoard.getAvailableSpaces();
	for (let i = 0; i < moves.length; i++) {
		if (corners.indexOf(moves[i]) > -1) {
			return moves[i];
		}
	}
	return -1; 
}

// if any two values match, return the third 
ComputerPlayer.prototype.selectWinningMove = function() {
	const board = this.activeGameState.getGameBoard();
	// loop over all winning scenarios 
	for (let i = 0; i < this.activeGameState.winningScenarios.length; i++) {
		// get winning scenario to compare to 
		const ws = this.activeGameState.winningScenarios[i];

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
 
	return -1;
}




































