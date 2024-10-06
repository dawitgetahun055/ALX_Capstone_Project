import { useNavigate } from "react-router-dom";

const BookCard = ({ coverImage, title, author, navigate, id }) => {
  const handleClick = () => {
    navigate(`/book/${id}`); // Navigate to the book description page
  };

  return (
    <div onClick={handleClick} className="book-card flex flex-col gap-4">
      <img className="mx-auto" src={coverImage} alt="" />
      <h3>{title}</h3>
      <p>{author}</p>
    </div>
  );
};

export default BookCard;
