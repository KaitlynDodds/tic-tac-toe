const game = (function($) {

	/* Game Setup
	*************************/

	const game = new Game();

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

		// make sure box is not full
		if (game.isEmptyBox(index)) {
			// add class to box 
			if (game.currentPlayer.val === 'O') {
				$(e.target).addClass('box-filled-1');
			} else {
				$(e.target).addClass('box-filled-2');
			}

			// record move in game state
			game.move(index);		
		}

		// print board
		game.printBoard();
	}

	function handleStartGame() {
		// get player names 
		const player1Name = (document.getElementById('player1NameInput').value !== "" ? document.getElementById('player1NameInput').value : "Player 1");
		const player2Name = (document.getElementById('player2NameInput').value !== "" ? document.getElementById('player2NameInput').value : "Player 2");

		// start new game
		game.start(new Player('O', player1Name), new Player('X', player2Name));
	}

	function handleNewGame() {
		// display start screen 
		game.load();
	}

	// player mouses onto box
	function handlePlayerHoverIn(e) {
		const box = e.target;
		// check if box is empty 
		if (game.isEmptyBox(getIndexOfBox(box))) {
			if (game.currentPlayer.val === 'O') {
				$(box).css('backgroundImage', 'url(img/o.svg)');	
			} else {
				$(box).css('backgroundImage', 'url(img/x.svg)');
			}
		}
	}

	// player mouse leaves box
	function handlePlayerHoverOut(e) {
		// set background of box 
		if (game.isEmptyBox(getIndexOfBox(e.target))) {
			$(e.target).css('backgroundImage', 'none');
		}
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
		const btn = e.target;
		const input = btn.previousElementSibling;
		// if already set to play against computer
		if (input.disabled) {
			btn.textContent = "Play Against the Computer";
			input.value = "";
			input.placeholder = "Name...";
			input.disabled = false;
		} else {
			btn.textContent = "Play Against a Friend";
			input.value = "Computer";
			input.disabled = true;
		}
	}

	return game;

}(jQuery));



























