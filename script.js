function Gameboard() {
	const rows = 3;
	const columns = 3;
	const board = [];

	for (let i = 0; i < rows; i++) {
		board[i] = [];
		for (let j = 0; j < columns; j++) {
			board[i].push(Cell());
		}
	}

	const getBoard = () => board;

	//TODO: Make sure space is empty before placing marker
	const placeMarker = (row, column, player) => {
		board[row][column].addMarker(player);
	};

	// DELETE after building UI
	const printBoard = () => {
		const boardWithCellValues = board.map((row) =>
			row.map((cell) => cell.getValue())
		);
		console.log(boardWithCellValues);
	};

	return { getBoard, placeMarker, printBoard };
}

function Cell() {
	let value = "";

	const addMarker = (player) => {
		value = player;
	};

	const getValue = () => value;

	return {
		addMarker,
		getValue,
	};
}

function GameController(
	playerOneName = "Player One",
	playerTwoName = "Player Two"
) {
	const board = Gameboard();

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
		if ((activePlayer = players[0])) {
			activePlayer = players[1];
		} else if ((activePlayer = players[1])) {
			activePlayer = players[0];
		}
	};
	const getActivePlayer = () => activePlayer;

	// DELETE after building UI?
	const printNewRound = () => {
		board.printBoard();
		console.log(`${getActivePlayer().name}'s turn...`);
	};

	const playRound = (row, column) => {
		console.log(
			`${getActivePlayer().name} places an ${
				getActivePlayer().marker
			} in cell board[${row}][${column}]`
		);
		board.placeMarker(row, column, getActivePlayer().marker);

		//TODO: Check for win conditions

		switchPlayerTurn();
		printNewRound();
	};

	printNewRound();

	return {
		playRound,
		getActivePlayer,
	};
}

const game = GameController();
