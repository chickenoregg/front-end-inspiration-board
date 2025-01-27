import { useState } from "react";
import PropTypes from "prop-types";

const INITIAL_CARD_DATA = {
  message: "",
};

const CardForm = ({ addCard }) => {
  const [cardData, setCardData] = useState(INITIAL_CARD_DATA);

  const handleChange = (event) => {
    const newCardData = {
      ...cardData,
      [event.target.name]: event.target.value
    };
    console.log(event.target);
    setCardData(newCardData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addCard(cardData);
    setCardData(INITIAL_CARD_DATA);
  };

  return (
    <section className="new-card-form__container">
      <h2>Make a New Card!</h2>
      <form onSubmit={handleSubmit} className="new-card-form__form">
        <label htmlFor="message">Message</label>
        <input
          required
          type="text"
          id="message"
          name="message"
          value={cardData.message}
          onChange={handleChange}
        />
        <p>Preview: {cardData.message}</p>
        <input className="submit_card" type="submit" value="submit" />
      </form>
    </section>
  );
};

CardForm.propTypes = {
  addCard: PropTypes.func.isRequired,
};

export default CardForm;