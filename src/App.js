import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Board from './components/Board';
import CardList from './components/CardList';

function App() {
  return (
    <div className="App">
      <main>
        <header>Inspiration Board</header>
        <Board></Board>
        <CardList/>
      </main>

    </div>
  );
}



export default App;
