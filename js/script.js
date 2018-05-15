const game = (function($) {

	/* Game Setup
	*************************/

	const game = new Game();
	const gameDisplay = new GameDisplay(game);

	game.setGameDisplay(gameDisplay);

	// load screen 
	game.load();


	/* Event Handlers
	*************************/

	// handle user box selection 
	$('body').on('click', '.boxes li', handleBoxClick);

	// handle start btn 
	$('body').on('click', '#start a', handleStartGame);

	// handle new game btn
	$('body').on('click', '#finish a', handleNewGame);

	$('body').on({
		mouseenter: handlePlayerHoverIn,
		mouseleave: handlePlayerHoverOut
	}, '.boxes li');

	$('body').on('click', '#togglePlayer2Btn', handleTogglePlayer2Btn);


	/* Handler Functions
	*************************/

	function handleBoxClick(e) {

		const index = getIndexOfBox(e.target);

		// don't allow click if current player is computer, make sure space has not already been selected 
		console.log(!game.isCurrentPlayerComputerPlayer() && game.isValidSpace(index));
		if (!game.isCurrentPlayerComputerPlayer() && game.isValidSpace(index)) {
			// apply move to game state 
			game.makeMove(index, e.target);
		}
	}

	function handleStartGame() {
		// get player names 
		const player1Name = ($('#player1NameInput').val() !== "" ? $('#player1NameInput').val() : "Player 1");
		const player2Name = ($('#player2NameInput').val() !== "" ? $('#player2NameInput').val() : "Player 2");

		// start new game
		if (player2Name === 'Computer') {
			game.start(new Player('O', player1Name), new ComputerPlayer('X', player2Name));			
		} else {
			game.start(new Player('O', player1Name), new Player('X', player2Name));
		}

		// display board 
		game.gameDisplay.showNewBoard();
	}

	function handleNewGame() {
		// display start screen
		game.gameDisplay.showStart();
	}

	// player mouses onto box
	function handlePlayerHoverIn(e) {
		const box = e.target;

		// check if box is empty 
		if (!game.isCurrentPlayerComputerPlayer() && game.isEmptySpace(getIndexOfBox(box))) {
			
			game.gameDisplay.hoverInBoxStyle(box, game.currentPlayer.val);

		}
	}

	// player mouse leaves box
	function handlePlayerHoverOut(e) {
		const box = e.target;

		game.gameDisplay.hoverOutBoxStyle(box);
	}

	function getIndexOfBox(box) {
		// check element is box
		if (!$(box).hasClass('box')) return -1;

		// find index 
		const boxes = $('.boxes li');
		for (let i = 0; i < boxes.length; i++) {
			// identify which box was clicked
			if (boxes[i] === box) return i;
		}

		return -1;
	}

	function handleTogglePlayer2Btn(e) {
		// toggle visiblity of player 2 name input 
		// change btn text 
		const btn = $(e.target);
		const input = $(btn).prev();
		// if already set to play against computer
		if (input.attr('disabled')) {
			$(btn).text("Play Against the Computer");
			$(input).val("");
			$(input).attr('placeholder', "Name...");
			$(input).attr('disabled', false);
		} else {
			btn.text("Play Against a Friend");
			input.val("Computer");
			$(input).attr('disabled', true);
		}
	}

	return game;

}(jQuery));



























