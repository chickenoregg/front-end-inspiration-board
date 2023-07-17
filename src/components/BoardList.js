import React from 'react'
import PropTypes from 'prop-types';
import Board from './Board';

const BoardList = ({ boards, onBoardSelect, onDeleteBoard }) => {
	const handleDeleteBoard = (board) => {
		onDeleteBoard(board);
	};

	return boards.map((board) => {
		return (
      <li key={board.board_id} className="board_item">
        <Board
          board={board}
          onBoardSelect={onBoardSelect}
          onDeleteBoard={handleDeleteBoard}
        />
      </li>
		);
	});
};

BoardList.propTypes = {
	boards: PropTypes.arrayOf(PropTypes.shape({
		board_id: PropTypes.number.isRequired,
		owner: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired
	})),
	onBoardSelect: PropTypes.func.isRequired,
	onDeleteBoard: PropTypes.func.isRequired
};

export default BoardList;