import { useState } from "react";

const initializeGame = () => {
	const board = new Array(3);
	for (let i = 0; i < 3; i++) {
		board[i] = new Array(3).fill();
	}
	return board;
};
const TicTacToe = () => {
	const [board, setBoard] = useState(initializeGame());
	const [isFirstPlayerClick, setIsFirstPlayerClick] = useState(true);
	const [matchOver, setMatchOver] = useState(false);

	const handleMouseDown = (row, col) => {
		if (matchOver) return;
		if (board[row][col]) return;
		setBoard((prevBoard) => {
			const newBoard = prevBoard.map((row) => [...row]);
			newBoard[row][col] = isFirstPlayerClick ? "X" : "O";
			return newBoard;
		});
		setIsFirstPlayerClick(!isFirstPlayerClick);
	};

	const checkWinner = () => {
		if (checkRow()) {
			setMatchOver(true);
			return;
		}
		if (checkCol()) {
			setMatchOver(true);
			return;
		}
		if (diagonalCheck()) {
			setMatchOver(true);
			return;
		}
	};

	const checkRow = () => {
		let j = 1;
		for (let i = 0; i < board.length; i++) {
			if (!board[i][j]) continue;
			if (board[i][j - 1] == board[i][j] && board[i][j] == board[i][j + 1]) {
				return true;
			}
		}
		return false;
	};

	const checkCol = () => {
		let i = 1;
		for (let j = 0; j < board[0].length; j++) {
			if (!board[i][j]) continue;
			if (board[i - 1][j] == board[i][j] && board[i][j] == board[i + 1][j]) {
				return true;
			}
		}
		return false;
	};

	const diagonalCheck = () => {
		let row = 0;
		let col = 0;
		if (
			board[row][col] &&
			board[row + 1][col + 1] &&
			board[row][col] == board[row + 1][col + 1] &&
			board[row + 1][col + 1] == board[row + 2][col + 2]
		) {
			return true;
		}

		col = 2;
		if (
			board[row][col] &&
			board[row + 1][col - 1] &&
			board[row][col] == board[row + 1][col - 1] &&
			board[row + 1][col - 1] == board[row + 2][col - 2]
		) {
			return true;
		}

		return false;
	};

	if (!matchOver) checkWinner();

	return (
		<div className='flex max-w-[300px] flex-wrap'>
			{board.map((row, rowIndex) => {
				return row.map((symbol, colIndex) => {
					return (
						<div
							onClick={() => handleMouseDown(rowIndex, colIndex)}
							className='w-[100px] h-[100px] border border-black font-bold text-3xl flex items-center justify-center'
							key={rowIndex + "f" + colIndex}>
							<div>{symbol}</div>
						</div>
					);
				});
			})}
			{matchOver && <div>Player {isFirstPlayerClick ? "O" : "X"} wins</div>}
		</div>
	);
};

export default TicTacToe;
