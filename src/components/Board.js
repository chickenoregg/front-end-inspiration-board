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
  board: PropTypes.object.isRequired,
  onBoardSelect: PropTypes.func.isRequired
};

export default Board
