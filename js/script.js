const game = (function($) {

	/* Game Setup
	*************************/

	const game = new Game(new Player('X'), new Player('O'));

	game.load();


	/* Event Handlers
	*************************/

	// handle user box selection 
	$('body').on('click', '.boxes', handleBoxClick);


	/* Helper Functions
	*************************/

	function handleBoxClick(e) {
		// check that a box was clicked
		if (e.target.className === 'box') {
			
			const boxes = $('.boxes li');
			for (let i = 0; i < boxes.length; i++) {
				// identify which box was clicked
				if (boxes[i] === e.target) {
					// record move in game state
					if (i < 3) {
						game.move(i);
					} else if (i < 6) {
						game.move(i);
					} else {
						game.move(i);
					}
					break;
				}
			}

			// print board
			game.printBoard();
		}
	}

	return game;

}(jQuery));