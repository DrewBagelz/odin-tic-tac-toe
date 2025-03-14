function Gameboard() {
	const rows = 3;
	const columns = 3;
	const board = [];

	for (let i = 0; i < rows; i++) {
		board[i] = [];
		for (let j = 0; j < columns; j++) {
			board[i].push(cell());
		}
	}

	const getBoard = () => board;

	const placeMarker = (row, column, player) => {
		if (getValue === "") {
			board[row][column].addMarker(player);
		} else {
			return;
		}
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
	let value = "empty";
	const addMarker = (player) => {
		value = player;
	};
	const getValue = () => value;
	return {
		addMarker,
		getValue,
	};
}
