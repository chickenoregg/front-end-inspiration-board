import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Card from './Card'

const CardList = ({ selectedBoardId }) => {

  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    if (selectedBoardId) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/boards/${selectedBoardId}/cards`)
        .then((response) => {
          setCardsData(response.data);
        })
        .catch((error) => {
          console.log("Error:", error);
          alert('Unable to retrieve cards for this board.');
        });
    }
  }, [selectedBoardId]);

  return (
    <div>
      <h2>CardList</h2>
      {cardsData.map((card) => (
        <Card
          key={card.id}
          card={card}
        />
      ))}
    </div>
  );
};

export default CardList;