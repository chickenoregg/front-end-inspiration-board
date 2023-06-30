import React from "react";
import PropTypes from 'prop-types';

const Card = ({ card, increaseCardLikes, deleteCard }) => {
  return (
    <div className="card-item">
      <p className="card_message">{card.message}</p>
      <ul className="card-item__controls">
        <div className="like_count">
          <li className="like_count_heart">
            {card.likes_count}
            <span>♥︎</span>
          </li>
        </div>
        <div className="like_add">
          <li className="total_heart" onClick={() => increaseCardLikes(card)}>
            ♥︎
          </li>
        </div>
        <div className="delete">
          <li className="card-item__delete" onClick={() => deleteCard(card)}>
            🆇
          </li>
        </div>
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