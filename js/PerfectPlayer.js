function PerfectPlayer(value, name) {
	Player.call(this, value, name);
	this.gameState = null;
	this.INITIAL_DEPTH = 0;
}

PerfectPlayer.prototype = Object.create(Player.prototype);


/* AI Functions
******************/

PerfectPlayer.prototype.takeTurn = function(game) {
	// no need to take turn 
	if (game.isOver()) return game;
	
	// set game state 
	this.gameState = game;
	// make move on current game state 
	game.makeMove(this.chooseMove(), this);
}

Player.prototype.chooseMove = function() {
	// no one has played yet, blank board
	if (this.gameState.isUnplayed()) return this.randomCornerChoice();
	// only one possible option left on board
	if (this.gameState.finalMove()) return this.gameState.finalMove();
	// all other scenarios
	return this.bestPossibleMove();
}

PerfectPlayer.prototype.bestPossibleMove = function() {
	this.minimax(this.gameState);
	return this.moveChoice;
}

PerfectPlayer.prototype.minimax = function(game) {
	// game over, return score for game state 
	if (game.isOver()) return this.score(game);

	let scores = [];
	let moves = [];

	// populate scores array 
	let childBoard = null;
	game.getAvailableMoves().forEach(move => {
		childBoard = $.extend(true, {}, game.makeMove(move));
		scores.push(this.minimax(childBoard));
		moves.push(move);
	});

	// perform min/max calc
	if (game.currentPlayer === this) {
		// calc max
		const maxScoreIndex = this.getMaxScoreIndex(scores); // find maximum score, return index in scores array
		this.moveChoice = moves[maxScoreIndex];
		return scores[maxScoreIndex];
	} else {
		// calc min
		const minScoreIndex = this.getMinScoreIndex(scores); // find min score, return index in scores array
		this.moveChoice = moves[minScoreIndex];
		return scores[minScoreIndex];
	}
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


/* Helper Functions
*************************/

PerfectPlayer.prototype.getMaxScoreIndex = function(scores) {
	let max = scores[0];
	scores.forEach(score => max = (score >  max ? score : max));
	return scores.indexOf(max);
}

PerfectPlayer.prototype.getMinScoreIndex = function(scores) {
	let min = scores[0];
	scores.forEach(score => min = (score <  min ? score : min));
	return scores.indexOf(min);
}


PerfectPlayer.prototype.randomCornerChoice = function() {
	// return a random corner 
	const corners = [0, 2, 6, 8];
	return corners[Math.floor(Math.random() * corners.length)];
}
