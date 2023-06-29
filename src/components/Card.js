import React from "react";

const Card = ({ card }) => {
      return (
        <div>
          <h1>{card.message}</h1>
          <h2>{card.likes_count}</h2>
        </div>
      );
}

export default Card;