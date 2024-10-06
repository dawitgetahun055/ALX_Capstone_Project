import search from "/assets/Images/Search-icon.svg";

const SearchBar = ({ query, setQuery, handleClick, handleChange }) => {
  return (
    <div className="search-component flex">
      <input
        onChange={handleChange}
        type="text"
        placeholder="Titles, author or topics"
        value={query}
      />
      <img src={search} alt="Search icon" />
      <button onClick={handleClick} className="btn text-white">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
