const game = (function($) {

	const playerX = new Player('X');
	const playerO = new Player('O');
	
	const game = new Game(playerX, playerO);

	game.start();

	// handle user box selection 
	$('.boxes').on('click', (e) => {

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
	});

	return game;

}(jQuery));