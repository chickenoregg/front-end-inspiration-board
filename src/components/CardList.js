import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Card from './Card'
import CardForm from './CardForm';
import PropTypes from 'prop-types';

const API = process.env.REACT_APP_BACKEND_URL;

const CardList = ({ board }) => {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/boards/${board.board_id}/cards`)
      .then((response) => {
        setCardsData(response.data);
      })
      .catch((error) => {
        console.log('Error:', error);
        alert('Unable to retrieve cards for this board.');
      });
  }, [board]);

  const increaseCardLikes = (newCard) => {
    axios
      .put(`${API}/cards/${newCard.card_id}/like`)
      .then(() => {
        const newCardsData = cardsData.map((card) => {
          if (card.card_id !== newCard.card_id) {
            return card;
          };
          return {...newCard, likes_count: newCard.likes_count + 1};
        });
        setCardsData(newCardsData);
      })
      .catch((error) => {
        console.log('Error:', error);
        alert('Unable to +1 the card.');
      });
  };

  const postCard = (message) => {
    axios
      .post(`${API}/boards/${board.board_id}/cards`, {message})
      .then((response) => {
        const cards = [...cardsData];
        cards.push(response.data.card);
        setCardsData(cards);
      })
      .catch((error) => {
        console.log('Error:', error);
        alert('Unable to create a new card.');
      });
  };

  const deleteCard = (card) => {
    axios
      .delete(`${API}/cards/${card.board_id}`)
      .then((response) => {
        const newCardsData = cardsData.filter((existingCard) => {
          return existingCard.card_id !== card.card_id;
        });
        setCardsData(newCardsData);
      })
      .catch((error) => {
        console.log('Error:', error);
        alert('Unable to delete the card.');
      });
  };

  return (
    <section className='cards__container'>
      <section>
        <h2>CardList</h2>
        <div className='card-items__container'>
          {cardsData.map((card) => (
            <Card
              key={card.id}
              card={card}
              increaseCardLikes={increaseCardLikes}
              deleteCard={deleteCard}
            />
          ))}
        </div>
      </section>
      <CardForm addCard={postCard}/>
    </section>
  );
};

CardList.propTypes = {
  board: PropTypes.object.isRequired
};

export default CardList;