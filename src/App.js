import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BoardList from './components/BoardList';
import CardList from './components/CardList';
import BoardForm from './components/BoardForm';
import image from './images/giphy.gif'

const API = process.env.REACT_APP_BACKEND_URL;

const INITIAL_BOARD_DATA = {
  board_id: null,
  owner: '',
  title: ''
};

function App() {
  const [boardsData, setBoardsData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(INITIAL_BOARD_DATA);

  const getBoards = () => {
    axios
      .get(`${API}/boards`, {})
      .then((response) => {
        setBoardsData(response.data);
      })
      .catch((error) => {
        console.log('Error:', error);
        alert('Unable to retrieve boards.');
      });
  };

  useEffect(() => {
    getBoards();
  }, []);

  const selectBoard = (board) => {
    setSelectedBoard(board);
  }

  // Add board to form function
  const postBoard = (newBoard) => {
    axios
      .post(`${API}/boards`, newBoard)
      .then(() => {
        getBoards();
      })
      .catch((error) => {
        console.log(error);
        alert('Unable to create a new board.');
      });
  };

  return (
    <div className="App">
      <main>
        <header>
          <h1>Inspiration Board</h1>
        </header>
        <section className="boards__container">
          <section>
            <h2>Boards</h2>
            <ul className="boards__list">
              <BoardList boards={boardsData} onBoardSelect={selectBoard} />
            </ul>
          </section>
          <section>
            <h2>Selected Board</h2>
            <p className='selected_board'>
              {selectedBoard.board_id
                ? `${selectedBoard.title} - ${selectedBoard.owner}`
                : "Select a board from the board list!"}
            </p>
            <p>
              <img src={image} alt="gif people"/>
            </p>
          </section>
          <section className="new-board-form__container">
            <h2>Make a New Board!</h2>
            <BoardForm addBoard={postBoard} />
          </section>
        </section>
        {selectedBoard.board_id ? <CardList board={selectedBoard} /> : ""}
      </main>
    </div>
  );
}

export default App;
