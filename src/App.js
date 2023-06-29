import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BoardList from './components/BoardList';
import CardList from './components/CardList';
import BoardForm from './components/BoardForm';

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
      .catch((err) => {
        console.log(err);
        alert('Unable to create a new board.');
      });
  };

  return (
    <div className="App">
      <main>
        <header>Inspiration Board</header>
        <section className='boards__container'>
          <section>
            <h2>Boards</h2>
            <ol className='boards__list'>
              <BoardList
                boards={boardsData}
                onBoardSelect={selectBoard}
              />
            </ol>
          </section>
          <section>
            <h2>Selected Board</h2>
            <p>
              {selectedBoard.board_id ? `${selectedBoard.title} - ${selectedBoard.owner}` : 'Select a board from the board list!'}
            </p>
          </section>
          <section>
            <h2>Make a New Board!</h2>
            <BoardForm addBoard={postBoard} />
          </section>
        </section>
        {selectedBoard.board_id ? <CardList board={selectedBoard} /> : ''}
      </main>
    </div>
  );
}

export default App;
