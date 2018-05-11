function PerfectPlayer() {
	this.name = "Computer";
	this.INITIAL_DEPTH = 0;
}

PerfectPlayer.prototype.score = function(game) {
	if (game.win(game.currentPlayer)) {
		return 10;
	} else if (game.win(game.offPlayer)) {
		return -10;
	} else {
		return 0;
	}
}

PerfectPlayer.prototype.minimax = function(game) {
	if (game.over()) return score(game);

	let scores = [];
	let moves = [];

	// populate scores array 
	game.getAvailableMoves.forEach(move => {
		const possibleGame = game.getNewState(move);
		scores.push(this.minimax(possibleGame));
		moves.push(move);
	});

	// perform min/max calc
	if (game.currentPlayer === this) {
		// max calc
		// find highest score
		// find move at max score index 
		// return score at max score index
	} else {
		// min calc
		// find lowest score 
		// select move at lowest score index
		// return score at lowest score index 
	}
}