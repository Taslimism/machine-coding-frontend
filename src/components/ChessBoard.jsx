import { useState } from "react";

const initializeChessBoard = () => {
	const board = new Array(8).fill(0);
	for (let i = 0; i < 8; i++) {
		board[i] = new Array(8).fill(false);
	}
	return board;
};

const repaintBoard = (board, row, col) => {
	const directions = [
		[1, 1],
		[1, -1],
		[-1, 1],
		[-1, -1],
	]; // SE, SW, NE, NW
	for (let [dx, dy] of directions) {
		let x = row + dx;
		let y = col + dy;
		while (x >= 0 && x < board.length && y >= 0 && y < board[0].length) {
			board[x][y] = true;
			x += dx;
			y += dy;
		}
	}
};

const ChessBoard = () => {
	const [mouseDownOnIndex, setMouseDownOnIndex] = useState({
		row: -1,
		col: -1,
	});
	const [board, setBoard] = useState(initializeChessBoard());

	const isDark = (row, col) => {
		return (row + col) % 2 == 0;
	};

	const handleMouseDown = (row, col) => {
		setMouseDownOnIndex({ row, col });
		const newBoard = board.map((row) => [...row]);

		repaintBoard(newBoard, row, col);

		console.log(newBoard);

		setBoard(newBoard);
	};

	const handleMouseUp = () => {
		setMouseDownOnIndex({
			row: -1,
			col: -1,
		});
		setBoard(initializeChessBoard());
	};

	return (
		<div className='border-black flex border-2 flex-wrap max-w-[804px]'>
			{board.map((row, rowIndex) => {
				return row.map((col, colIndex) => {
					return (
						<div
							onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
							onMouseUp={handleMouseUp}
							key={rowIndex + "dkjhf" + colIndex}
							className={`
								${isDark(rowIndex, colIndex) ? "bg-black" : "bg-white"}
									${col ? "bg-blue-700" : ""}
								${
									rowIndex == mouseDownOnIndex.row &&
									colIndex === mouseDownOnIndex.col
										? "bg-cyan-400"
										: ""
								}
							
								h-[100px] w-[100px]
							`}></div>
					);
				});
			})}
		</div>
	);
};

export default ChessBoard;
