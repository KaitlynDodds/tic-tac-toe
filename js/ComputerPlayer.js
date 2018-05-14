function ComputerPlayer(value, name) {
	Player.call(this, value, name);
	this.activeGameState = null;
}

ComputerPlayer.prototype = Object.create(Player.prototype);

ComputerPlayer.prototype.takeTurn = function(gameState) {
	// record state
	this.activeGameState = gameState; 

	// select best move option
	const move = this.selectSomewhatIntelligentMove();

	// get relevant ui box 
	const box = this.activeGameState.gameDisplay.getBox(move);

	// trigger move on active game state 
	this.activeGameState.makeMove(move, box);
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
	move = this.selectWinningMove(this.val); 

	if (move < 0) {
		move = this.selectWinningMove(this.activeGameState.offPlayer.val); 		
	}

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

// check if a = b, and c has no value 
ComputerPlayer.prototype.isValidWinningScenario = function(a, b, c, value) {
	return ((a !== undefined && a === value) && (a === b) && (c === undefined));
}

// if any two space values match, return the move that would result in a winning move  
ComputerPlayer.prototype.selectWinningMove = function(value) {
	const board = this.activeGameState.getGameBoard();

	// loop over all winning scenarios 
	for (let i = 0; i < this.activeGameState.winningScenarios.length; i++) {
		
		// get winning scenario to compare to 
		const ws = this.activeGameState.winningScenarios[i];

		// if first and second value match, return third if space not already occupied  
		if (this.isValidWinningScenario(board[ws[0]], board[ws[1]], board[ws[2]], value)) {
			return ws[2];
		}

		// if first and last value match, return second if space not already occupied 
		if (this.isValidWinningScenario(board[ws[0]], board[ws[2]], board[ws[1]], value)) {
			return ws[1];
		}

		// if second and third value match, return first if space not already occupied 
		if (this.isValidWinningScenario(board[ws[1]], board[ws[2]], board[ws[0]], value)) {
			return ws[0];
		}
	}
 
	return -1;
}




































