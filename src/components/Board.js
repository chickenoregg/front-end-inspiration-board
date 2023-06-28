import React from 'react'
import PropTypes from 'prop-types';

const Board = ({ board, onBoardSelect }) => {
  return (
    <div onClick={() => onBoardSelect(board)}>
      {board.title}
    </div>
  );
};

Board.propTypes = {
  board: PropTypes.object(
    PropTypes.shape({
      board_id: PropTypes.number.isRequired,
      owner: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired,
  onBoardSelect: PropTypes.func.isRequired
};

export default Board
