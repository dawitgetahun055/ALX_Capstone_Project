import Navigation from "./components/Navigation";
import "./App.css";
import Listing from "./components/Listing";
import HeroSection from "./components/HeroSection";
import HeroText from "./components/HeroText";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import axios from "axios";
import BookDetails from "./components/BookDetails";
import { Route, Routes, useNavigate } from "react-router-dom";

const App = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For Navigation Between routes

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleClick = () => {
    setQuery("");
    fetchData();
  };

  const fetchData = async () => {
    if (query.trim()) {  // Trim method is used to remove any extra whitespaces (spaces, tabs & newlines) 
      setLoading(true);  // From the begining and the end of a string
      setError(false);
      try {
        const response = await axios.get(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(  // function used to encode special characters 
            query.trim()                                                // in a URL to insure they are correctly interpretted by the browser and the server.
          )}`
        );
        setData(response.data.docs);
        setLoading(false);
        // console.log("API Response Data: ", response.data.docs);
      } catch (error) {
        console.log("Error Fetching Data: ", error);
        setLoading(false);
        setError(error);
      }
    }
  };

  return (
    <div>
      <Navigation />
      <Routes> 
        <Route
          path="/"
          element={
            <>
              <HeroSection>
                <HeroText />
                <SearchBar
                  query={query}
                  setQuery={setQuery}
                  handleClick={handleClick}
                  handleChange={handleChange}
                  fetchData={fetchData}
                />
              </HeroSection>
              <Listing
                data={data}
                navigate={navigate}
                loading={loading}
                error={error}
              />
            </>
          }
        />
        <Route path="/book/:id" element={<BookDetails data={data} />} />
      </Routes>
    </div>
  );
};

export default App;

// Routing: Used to control which component is shown on the screen
// based on the url the user is visiting. Helps to create a single page applicataion(SPA) .
// where the page wont reload completely when you navigate between different parts of the website. 
// instead it shows a different content dynamically based on the current url.
// Routes: This is a container that holds all the possible routes (paths) of the application.
// Route: Each route defines a path and the component that should be rendered when that path is visited.