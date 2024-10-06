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
    if (query.trim()) {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(
            query.trim()
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
