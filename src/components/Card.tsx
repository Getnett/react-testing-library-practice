import "./Card.moudle.css";
const filledHeart = require("../images/filled.png");
const outlinedHeart = require("../images/heart-outline.svg");
function Card({ name, phone, email, image, favoured }) {
  return (
    <div className="card">
      <div className="card-header">
        {favoured ? (
          <img className="heart" src={filledHeart} alt="Filled Heart" />
        ) : (
          <img className="heart" src={outlinedHeart} alt="Outlined Heart" />
        )}
        <img className="card-img" src={image.src} alt={image.alt} />
      </div>
      <h3>{name}</h3>
      <p>{phone}</p>
      <p>{email}</p>
    </div>
  );
}

export default Card;
