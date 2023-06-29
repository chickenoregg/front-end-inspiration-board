import { useState } from "react";
import PropTypes from "prop-types";

const INITIAL_BOARD_DATA = {
  title: "",
  owner: "",
};

const BoardForm = ({ addBoard }) => {
  const [boardData, setBoardData] = useState(INITIAL_BOARD_DATA);

  const handleChange = (event) => {
    const newBoardData = {
      ...boardData,
      [event.target.name]: event.target.value
    };
    console.log(event.target);
    setBoardData(newBoardData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addBoard(boardData);
    setBoardData(INITIAL_BOARD_DATA);
  };

  return (
    <form onSubmit={handleSubmit} className='new-board-form__form'>
      <label htmlFor="title">Title</label>
      <input
        required
        type="text"
        id="title"
        name="title"
        value={boardData.title}
        onChange={handleChange}
      />
      <label htmlFor="owner">Owner Name</label>
      <input
        required
        type="text"
        id="owner"
        name="owner"
        value={boardData.owner}
        onChange={handleChange}
      />
      <input className="submit_board" type="submit" value="submit"/>
      <p>Preview: {boardData.title} - {boardData.owner}</p>
    </form>
  );
};

BoardForm.propTypes = {
  addBoard: PropTypes.func.isRequired
};

export default BoardForm;