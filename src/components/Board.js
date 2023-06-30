import './Board.css';
import React from 'react'
import PropTypes from 'prop-types';

const Board = ({ board, onBoardSelect, onDeleteBoard }) => {
  return (
    <div>
      <div className="board-title" onClick={() => onBoardSelect(board)}>
        {board.title}
      </div>
      <div>
      <button class="delete-board-button" onClick={() => onDeleteBoard(board)}>Delete Board</button>
      </div>
    </div>
  );
};

Board.propTypes = {
  board: PropTypes.object.isRequired,
  onBoardSelect: PropTypes.func.isRequired,
  onDeleteBoard: PropTypes.func.isRequired
};

export default Board
