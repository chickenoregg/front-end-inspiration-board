import React from "react";
import PropTypes from 'prop-types';

const Card = ({ card, increaseCardLikes, deleteCard }) => {
  return (
    <div className='card-item'>
      <p>{card.message}</p>
      <ul className='card-item__controls'>
        <li>{card.likes_count} 👍</li>
        <li onClick={() => increaseCardLikes(card)}>+1 👍</li>
        <li className='card-item__delete' onClick={() => deleteCard(card)}>Delete</li>
      </ul>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired,
  increaseCardLikes: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired
};

export default Card;