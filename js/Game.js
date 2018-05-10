function Game() {
	this.minMovesToWin = 5;
}


/* Game Actions
*************************/

Game.prototype.load = function() {
	this.board = new Board();		// default starting board
	this.winner = null;				// no winner to start
	// display UI
	this.displayStart();
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
	
	// clear board data 
	this.board = new Board();

	// display board 
	this.displayBoard();
}

Game.prototype.stop = function() {
	// display final screen 
	this.displayWin();
}

Game.prototype.next = function() {
	// set new current player 
	const player = this.currentPlayer;
	this.currentPlayer = this.offPlayer;
	this.offPlayer = player;

	// update UI 
	this.updateActivePlayerUI();
}

Game.prototype.checkForWin = function(player) {
	// no need to check if no chance of winner yet 
	if (this.board.numberOfOccupiedSpaces < this.minMovesToWin) return; 
	// check board for winner
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
	const gameBoard = this.board.getBoard();
	for (let i = 0; i < winningScenarios.length; i++) {
		const ws = winningScenarios[i];
		if (gameBoard[ws[0]] !== undefined &&
			gameBoard[ws[0]] === player.val &&
			gameBoard[ws[0]] === gameBoard[ws[1]] &&
			gameBoard[ws[0]] === gameBoard[ws[2]]) {
			// winning combo
			this.winner = player;
		}
	}
}

Game.prototype.isOver = function() {
	return this.winner || this.isDraw();
}

Game.prototype.isDraw = function() {
	return this.board.numberOfEmptySpaces === 0 && !this.winner;
}

Game.prototype.makeMove = function(move) {	
	// only allow move if space not already taken 
	if (this.board.isEmptySpace(move)) {
		this.board.placePiece(move, this.currentPlayer);
		this.checkForWin(this.currentPlayer);

		if (this.isOver()) {
			this.displayWin();
		}
	}
}


/* Helper Functions
*************************/

Game.prototype.getAvailableMoves = function() {
	this.board.blankSpaces();
}

Game.prototype.finalMove = function() {
	if (this.board.numberOfEmptySpaces === 0) return this.board.blankSpaces.pop();
}


/* Display UI Functions
*************************/

Game.prototype.overrideBody = function(html) {
	// override html in body, append to body 
	$('body div:first-child').replaceWith(html);
}

Game.prototype.activePlayerUI = function() {
	const playersHTML = 
	`<li class="players ${(this.currentPlayer === this.player1 ? 'active' : 'player1')}" ${(this.currentPlayer === this.player1 ? 'id="player1"' : '')}>
	  	<p>${this.player1.name}</p>
	  	<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg>
	  </li>
	  <li class="players ${(this.currentPlayer === this.player2 ? 'active' : 'player2')}" ${(this.currentPlayer === this.player2 ? 'id="player2"' : '')}>
	  	<p>${this.player2.name}</p>
	  	<svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg>
	  </li>`;

	  return playersHTML;
}

Game.prototype.displayPlayerNameInput = function() {
	const playerNameInput = `
	<div class="start-players">
    	<div>
	    	<label>Player 1:</label>
	    	<input type="text" id="player1NameInput" placeholder="Name..." />
    	</div>
    	<div>
    		<label>Player 2:</label>
    		<input type="text" id="player2NameInput" placeholder="Name..."/>
    		<button class="button" id="togglePlayer2Btn">Play Against the Computer</button>
    	</div>
    </div>
	`;
	return playerNameInput;
}

Game.prototype.updateActivePlayerUI = function() {
	$('.players').parent().html(this.activePlayerUI());
}

Game.prototype.displayStart = function() {
	const startHTML = 
	`<div class="screen screen-start" id="start">
	  <header>
	    <h1>Tic Tac Toe</h1>
	   	${this.displayPlayerNameInput()}
	    <a href="#" class="button">Start game</a>
	  </header>
	</div>`;

	this.overrideBody(startHTML);
}

Game.prototype.displayBoard = function() {

	// insert board html into page 
	const boardHTML = 
	`<div class="board" id="board">
	  <header>
	    <h1>Tic Tac Toe</h1>
	    <ul>
	      ${this.activePlayerUI()}
	    </ul>
	  </header>
	  <ul class="boxes">
	    <li class="box"></li>
	    <li class="box"></li>
	    <li class="box"></li>
	    <li class="box"></li>
	    <li class="box"></li>
	    <li class="box"></li>
	    <li class="box"></li>
	    <li class="box"></li> 
	    <li class="box"></li>
	  </ul>
	</div>`;

	this.overrideBody(boardHTML);
}

Game.prototype.displayWin = function() {

	const winnerHTML = 
	`<div class="screen screen-win ${(this.isDraw() ? 'screen-win-tie' : (this.currentPlayer === this.player1 ? 'screen-win-one' : 'screen-win-two'))}" id="finish">
	  <header>
	    <h1>Tic Tac Toe</h1>
	    <p class="message">${(this.isDraw() ? 'It\'s a Tie!' : this.currentPlayer.name + ' Wins!')}</p>
	    <a href="#" class="button">New game</a>
	  </header>
	</div>`;

	this.overrideBody(winnerHTML);
}



























