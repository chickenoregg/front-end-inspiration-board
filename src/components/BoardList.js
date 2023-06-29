import React from 'react'
import PropTypes from 'prop-types';
import Board from './Board';

const BoardList = ({ boards, onBoardSelect }) => {
	const boardsElements = boards.map(board => {
		return (
			<li>
				<Board
					board={board}
					onBoardSelect={onBoardSelect}
				/>
			</li>
		);
	});

	return (
		<ol>{boardsElements}</ol>
	);
};

BoardList.propTypes = {
	boards: PropTypes.arrayOf(PropTypes.shape({
		board_id: PropTypes.number.isRequired,
		owner: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		cards: PropTypes.array.isRequired
	})),
	onBoardSelect: PropTypes.func.isRequired
};

export default BoardList;