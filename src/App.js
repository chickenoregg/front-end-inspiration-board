import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BoardList from './components/BoardList';
import CardList from './components/CardList';
import BoardForm from './components/BoardForm';
import CardForm from './components/CardForm';


const DEFAULT_BOARD_DATA = {
  board_id: null,
  owner: '',
  title: ''
}


function App() {
  const [boardsData, setBoardsData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(DEFAULT_BOARD_DATA);
  const API = 'https://byte-size-back-end-inspiration-board.onrender.com';

  // Retrieve boards using API call
  const getBoards = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/boards`, {})
      .then((response) => {
        setBoardsData(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert('Unable to retrieve boards.');
      });
  };

  useEffect(() => {
    getBoards();
  }, []);

  const selectBoard = (board) => {
    setSelectedBoard(board);
  }

  //add board to form function//
  const postBoard = (newBoard) => {
    axios
    .post(`${API}/boards`, newBoard)
    .then((result) => {
      getBoards();
    })
    .catch((err) => {
      console.log(err);
    });

  };

  //add card to form function//
  const postCard = (newCard) => {
    axios.post(`${API}/boards/${selectedBoard.board_id}/cards`, newCard)
    .then((result) => {
      getBoards();
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="App">
      <main>
        <header>Inspiration Board</header>
        <section>
          <h2>Boards</h2>
          <BoardList
            boards={boardsData}
            onBoardSelect={selectBoard}
          />
        </section>
        <section>
          <BoardForm addBoard={postBoard} />
        </section>
        <section>
          <h2>Selected Board</h2>
          <p>
            {selectedBoard.board_id ? `${selectedBoard.title} - ${selectedBoard.owner}` : 'Select a board from the board list!'}
          </p>
        </section>
        <section>
        {selectedBoard.board_id ? <CardList selectedBoardId={selectedBoard.board_id} /> : ''}
        </section>
        <section>
        {selectedBoard.board_id ? <CardForm addCard={postCard} /> : ''}
        </section>
      </main>
    </div>
  );
}



export default App;
