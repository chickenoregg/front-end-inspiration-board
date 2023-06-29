import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from './Card'
import CardForm from './CardForm';
import PropTypes from 'prop-types';

const API = process.env.REACT_APP_BACKEND_URL;

const CardList = ({ board }) => {
  const [cardsData, setCardsData] = useState([]);

  const getCards = () => {
    axios
      .get(`${API}/boards/${board.board_id}/cards`)
      .then((response) => {
        setCardsData(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.log('Error:', error);
        alert('Unable to retrieve cards for this board.');
      });
  };

  useEffect(() => {
    getCards();
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

  const postCard = (newCard) => {
    axios
      .post(`${API}/boards/${board.board_id}/cards`, newCard)
      .then(() => {
        getCards();
      })
      .catch((error) => {
        console.log('Error:', error);
        alert('Unable to create a new card.');
      });
  };

  const deleteCard = (card) => {
    axios
      .delete(`${API}/cards/${card.card_id}`)
      .then(() => {
        getCards();
      })
      .catch((error) => {
        console.log('Error:', error);
        alert('Unable to delete the card.');
      });
  };

  return (
    <section className='cards__container'>
      <section>
        <h2>Cards in '{board.title}'</h2>
        <div className='card-items__container'>
          {cardsData.map((card) => (
            <Card
              key={card.card_id}
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