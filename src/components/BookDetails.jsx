import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import bookData from "./books.json";

const BookDescription = ({ data }) => {
  const { id } = useParams();
  const [bookItem, setBookItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDescription = async (url) => {
      try {
        const { data: apiData } = await axios.get(url);
        // console.log("Fetched Data: ", apiData.description);
        return apiData.description || "No description avavilable.";
      } catch (error) {
        console.log("Error fetching the data: ", error.message);
        setError("Error fetching the data: ", error.message);
        return "No description available";
      }
    };

    const found_apiBooks = data.find(
      (item) => item.key.split("/").pop() === id
    );

    const found_bookData = bookData.find((item) => item.id === Number(id));

    const extractDescription = (description) => {
      // If description is a string, return it directly
      if (typeof description === "string") {
        return description;
      }

      // If description is an object, return the value property if it exists
      if (typeof description === "object" && description !== null) {
        return description.value || "No description available";
      }

      // Fallback if description is not a string or a valid object
      // return "No description available";
    };

    const findBook = async () => {
      if (found_apiBooks) {
        const descriptionUrl = `https://openlibrary.org${found_apiBooks.key}.json`;
        const apiData = await fetchDescription(descriptionUrl);

        // Use the extractDescription function to get the description
        const description = apiData
          ? extractDescription(apiData)
          : "No description available.";

        setBookItem({
          title: found_apiBooks.title,
          author: found_apiBooks.author_name
            ? found_apiBooks.author_name.join(", ")
            : "Unknown Author",
          found_apiBooks,
          coverImage: `https://covers.openlibrary.org/b/id/${found_apiBooks.cover_i}-L.jpg`,
          description,
          publishDate: found_apiBooks.publish_date?.[0] || "-",
          publisher: found_apiBooks.publisher?.[0] || "-",
          pages: found_apiBooks.number_of_pages_median,
          isbn: found_apiBooks.isbn[0],
          subject: found_apiBooks.subject?.[0] || "-",
        });
      } else if (found_bookData) {
        setBookItem({
          title: found_bookData.title,
          author: found_bookData.author,
          coverImage: found_bookData.coverImage,
          description: found_bookData.description,
          publishDate: found_bookData.publishDate,
          publisher: found_bookData.publisher,
          pages: found_bookData.pages,
          isbn: found_bookData.isbn,
          subject: found_bookData.subject
        });
      } else {
        setError("No book found."); // Handle the case where no book matches the ID
      }

      setLoading(false);
    };
    findBook();
    console.log(found_bookData);
  }, [id, data]);

  // Handle the loading state
  if (loading) {
    return <p>Loading...</p>; // Show the loading message while fetching
  }

  // Handle Errors
  if (error) {
    return <p>{error}</p>; // Show error message if any
  }

  console.log(bookItem);

  return (
    <section className="description-section flex flex-col">
      <div className="description-container flex">
        <img src={bookItem.coverImage} alt="" />
        <div className="description">
          <h2>{bookItem.title}</h2>
          <p>{bookItem.description}</p>
        </div>
      </div>
      <div className="publication-info flex">
        <div className="publication-date flex flex-col">
          <h3>Publication Date</h3>
          <p>{bookItem.publishDate}</p>
        </div>
        <div className="publisher flex flex-col">
          <h3>Publisher</h3>
          <p>{bookItem.publisher}</p>
        </div>
        {bookItem.pages && (
          <div className="pages flex flex-col">
            <h3>Pages</h3>
            <p>{bookItem.pages}</p>
          </div>
        )}
        <div className="ISBN flex flex-col">
          <h3>ISBN</h3>
          <p>{bookItem.isbn}</p>
        </div>
        <div className="subject flex flex-col">
          <h3>subject</h3>
          <p>{bookItem.subject}</p>
        </div>
      </div>
    </section>
  );
};

export default BookDescription;
