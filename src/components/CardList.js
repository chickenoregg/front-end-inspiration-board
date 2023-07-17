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

  const sortCards = (sortFeature) => {
    let sortedCards;

    if (sortFeature === "id") {
      sortedCards = [...cardsData].sort((a, b) => a.card_id - b.card_id);
    } else if (sortFeature === "message") {
      sortedCards = [...cardsData].sort((a, b) => a.message > b.message);
    } else if (sortFeature === "likes") {
      sortedCards = [...cardsData].sort((a, b) => b.likes_count - a.likes_count);
    }

    setCardsData(sortedCards);
  };

  return (
    <section className='cards__container'>
      <section>
        <h2>Cards in '{board.title}'</h2>
        <div className='sorting_buttons'>
          <button className='sort-by-button' onClick={() => sortCards("id")}>Sort by ID</button>
          <button className='sort-by-button' onClick={() => sortCards("message")}>Sort by Message</button>
          <button className='sort-by-button' onClick={() => sortCards("likes")}>Sort by Likes</button>
        </div>
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