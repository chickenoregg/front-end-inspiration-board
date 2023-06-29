import React from 'react'
import PropTypes from 'prop-types';
import Board from './Board';

const BoardList = ({ boards, onBoardSelect }) => {
	return boards.map((board) => {
		return (
      <li key={board.board_id}>
        <Board
					board={board}
					className="board_item"
          onBoardSelect={onBoardSelect}
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
	onBoardSelect: PropTypes.func.isRequired
};

export default BoardList;