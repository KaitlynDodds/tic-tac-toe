function Game(player1, player2) {
	this.currentPlayer = player1;  // default starting player
	this.offPlayer = player2;
	this.board = Array(9);  // default starting board
	this.isPlaying = false;  // need to start game	
}

Game.prototype.start = function() {
	
	// clear board data 
	this.board = Array(9);

	// start new game 
	this.isPlaying = true;
}

Game.prototype.stop = function() {
	console.log('The winner is: ', this.currentPlayer.val);
	this.isPlaying = false;
}

Game.prototype.next = function() {
	const player = this.currentPlayer;
	this.currentPlayer = this.offPlayer;
	this.offPlayer = player;
}

Game.prototype.move = function(move) {
	if (this.isPlaying) {
		// check that move is valid 
		if (!this.board[move]) {
			// add move to board 
			this.board[move] = this.currentPlayer.val;
			// check for winner
			if (this.isWinner()) {
				this.stop();
			} else {
				// update currentPlayer 
				this.next();
			}
		}
	}
}

Game.prototype.isWinner = function() {
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
	for (let i = 0; i < winningScenarios.length; i++) {
		const ws = winningScenarios[i];
		if (this.board[ws[0]] !== undefined &&
			this.board[ws[0]] === this.board[ws[1]] &&
			this.board[ws[0]] === this.board[ws[2]]) {
			// winning combo
			return true;
		}
	}
	// no winner yet 
	return false;
}

Game.prototype.printBoard = function() {
	let print = "";
	for (let i = 0; i < this.board.length; i++) {
		print += (this.board[i] ? `[${this.board[i]}]` : `[-]`);
		if (i === 2 || i === 5 || i === 8) {
			print += '\n';
		}
	}
	console.log(print);	
}

