function Gameboard() {
	const rows = 3;
	const columns = 3;
	const board = [];

	// nested-loop to create 2D array
	for (let i = 0; i < rows; i++) {
		board[i] = [];
		for (let j = 0; j < columns; j++) {
			board[i].push("");
		}
	}

	// retrieves current state of board
	const getBoard = () => board;

	// print board to console
	// DELETE after building UI
	const printBoard = () => {
		console.table(board);
	};

	return { getBoard, printBoard };
}

function Player(playerOneName = "Player One", playerTwoName = "Player Two") {
	const players = [
		{
			name: playerOneName,
			marker: "X",
		},
		{
			name: playerTwoName,
			marker: "O",
		},
	];

	let activePlayer = players[0];

	// following if statement could be refactored to:
	// activePlayer = activePlayer === players[0] ? players[1] : players[0];
	const switchPlayerTurn = () => {
		if (activePlayer === players[0]) {
			activePlayer = players[1];
		} else {
			activePlayer = players[0];
		}
	};
	const getActivePlayer = () => activePlayer;

	return {
		switchPlayerTurn,
		getActivePlayer,
	};
}

function GameController() {
	const board = Gameboard();
	const players = Player();

	// DELETE after building UI?
	const printNewRound = () => {
		board.printBoard();
		console.log(`${players.getActivePlayer().name}'s turn...`);
	};

	printNewRound();

	const placeMarker = (row, column, marker) => {
		board.getBoard()[row][column] = marker;
	};

	const checkWinner = () => {
		// row check
		for (let i = 0; i < board.rows; i++) {
			if (
				board.getBoard()[i][0] === board.getBoard()[i][1] &&
				board.getBoard()[i][1] === board.getBoard()[i][2] &&
				board.getBoard()[i][0] !== ""
			) {
				return true;
			}
		}
		// column check
		for (let j = 0; j < board.columns; j++) {
			if (
				board.getBoard()[0][j] === board.getBoard()[1][j] &&
				board.getBoard()[1][j] === board.getBoard()[2][j] &&
				board.getBoard()[0][j] !== ""
			) {
				return true;
			}
		}
		// diagonal checks
		if (
			board.getBoard()[0][0] === board.getBoard()[1][1] &&
			board.getBoard()[1][1] === board.getBoard()[2][2] &&
			board.getBoard()[0][0] !== ""
		) {
			return true;
		}

		if (
			board.getBoard()[0][2] === board.getBoard()[1][1] &&
			board.getBoard()[1][1] === board.getBoard()[2][0] &&
			board.getBoard()[0][2] !== ""
		) {
			return true;
		}
	};

	const playRound = (row, column) => {
		if (board.getBoard()[row][column] !== "") {
			console.log("That space is already taken. Please choose another.");
			printNewRound();
		} else {
			console.log(
				`${players.getActivePlayer().name} places an ${
					players.getActivePlayer().marker
				} in cell board[${row}][${column}]`
			);
			placeMarker(row, column, players.getActivePlayer().marker);
			checkWinner();
			if (checkWinner()) {
				console.log(
					`Congratulations ${
						players.getActivePlayer().name
					}! You won this round!`
				);
				board.printBoard();
			} else {
				players.switchPlayerTurn();
				printNewRound();
			}
		}
	};

	return {
		playRound,
	};
}

const game = GameController();
