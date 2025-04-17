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

	const resetBoard = () => {
		for (let i = 0; i < rows; i++) {
			board[i] = [];
			for (let j = 0; j < columns; j++) {
				board[i].push("");
			}
		}
	};

	return { getBoard, printBoard, resetBoard };
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

	const setActivePlayer = (i) => (activePlayer = players[i]);

	return {
		switchPlayerTurn,
		getActivePlayer,
		setActivePlayer,
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

	// Couldn't figure out how to correctly use the includes method with the 2D array so I had to flatten it for now
	const checkTie = () => {
		const flatBoard = board.getBoard().flat();
		if (!flatBoard.includes("")) {
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
			checkTie();
			if (checkWinner()) {
				console.log(
					`Congratulations ${
						players.getActivePlayer().name
					}! You won this round!`
				);
				board.printBoard();
			} else if (checkTie() && !checkWinner()) {
				console.log("Board is full. This game ends in a draw.");
				board.printBoard();
			} else {
				players.switchPlayerTurn();
				printNewRound();
			}
		}
	};

	const resetRound = () => {
		board.resetBoard();
		players.setActivePlayer(0);
		printNewRound();
	};

	return {
		playRound,
		resetRound,
	};
}

const game = GameController();
