import { useEffect } from "react";
import { useState } from "react";
import bookData from "./books.json";
import BookCard from "./BookCard";

const Listing = ({ data, navigate, loading, error }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      // Map the API data to the required structure
      const apiBooks = data
        .filter((book) => book.cover_i)
        .map((book) => ({
          id: book.key.split("/").pop(), // Extract the id from the key
          title: book.title,
          coverImage: `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`,
          author: book.author_name
            ? book.author_name.length > 2
              ? `${book.author_name.slice(0, 2).join(", ")} + ${
                  book.author_name.length - 2
                } more`
              : book.author_name.join(", ")
            : "Unknown Author",
        }));
      setBooks(apiBooks); // Update the fetched API data
    } else {
      setBooks(bookData); //Reset to static data if no valid API data
    }
  }, [data]);

  return (
    <section className="list-section">
      <h2>Book Highlights</h2>
      <hr />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="list-container grid grid-cols-5  grid-rows-3">
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              coverImage={book.coverImage}
              title={book.title}
              author={book.author}
              navigate={navigate}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Listing;
