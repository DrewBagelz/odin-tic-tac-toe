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

	//TODO: Make sure space is empty before placing marker
	// In UI version this can be done by allowing the click event to only fire once
	const placeMarker = (row, column, marker) => {
		if (board.getBoard()[row][column] === "") {
			board.getBoard()[row][column] = marker;
			players.switchPlayerTurn();
		} else {
			console.log("That space is already taken. Please choose another.");
		}
	};

	// const checkWinner = () => {
	// 	let arr = board.getBoard;
	// 	// row check
	// 	for (let i = 0; i < board.rows; i++) {
	// 		if (
	// 			arr[i][0] === arr[i][1] &&
	// 			arr[i][1] === arr[i][2] &&
	// 			arr[i][0] !== ""
	// 		) {
	// 			return true;
	// 		}
	// 	}
	// 	// column check
	// 	for (let j = 0; j < board.columns; j++) {
	// 		if (
	// 			arr[0][j] === arr[1][j] &&
	// 			arr[1][j] === arr[2][j] &&
	// 			arr[0][j] !== ""
	// 		) {
	// 			return true;
	// 		}
	// 	}
	// 	// diagonal checks
	// 	if (
	// 		arr[0][0].getValue() === arr[1][1].getValue() &&
	// 		arr[1][1].getValue() === arr[2][2].getValue() &&
	// 		arr[0][0].getValue() !== ""
	// 	) {
	// 		return true;
	// 	}

	// 	if (
	// 		arr[0][2].getValue() === arr[1][1].getValue() &&
	// 		arr[1][1].getValue() === arr[2][0].getValue() &&
	// 		arr[0][2].getValue() !== ""
	// 	) {
	// 		return true;
	// 	}
	// 	return false;
	// };

	const playRound = (row, column) => {
		console.log(
			`${players.getActivePlayer().name} places an ${
				players.getActivePlayer().marker
			} in cell board[${row}][${column}]`
		);
		placeMarker(row, column, players.getActivePlayer().marker);
		// checkWinner();
		// if (checkWinner()) {
		// 	console.log(
		// 		`Congratulations ${players.getActivePlayer().name}! You won this round!`
		// 	);
		// 	board.printBoard;
		// } else {
		printNewRound();
		// }
	};

	return {
		playRound,
	};
}

const game = GameController();
