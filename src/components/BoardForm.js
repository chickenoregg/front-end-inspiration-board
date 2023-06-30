import { useState, Fragment } from "react";
import PropTypes from "prop-types";

const INITIAL_BOARD_DATA = {
  title: "",
  owner: "",
};

const BoardForm = ({ addBoard }) => {
const [boardData, setBoardData] = useState(INITIAL_BOARD_DATA);
const [isVisible, setIsVisible] = useState(true);

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


  const toggleVisibleForm = (visible) => {
    setIsVisible(visible)
  };

  return (
        <form onSubmit={handleSubmit} className='new-board-form__form'>

        { isVisible ? (
            <Fragment>
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

                <button onClick={() => toggleVisibleForm(false)} className="toggle-create-board">Hide Form</button>
            </Fragment>) : 
                <button onClick={() => toggleVisibleForm(true)} className="toggle-create-board">Show Form</button>
        }
        </form>    
  );
}

BoardForm.propTypes = {
  addBoard: PropTypes.func.isRequired
};

export default BoardForm;