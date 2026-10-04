import './SearchBar.css';

function SearchBar({ query, onQueryChange, onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <span className="search-bar__eyebrow">Найти фильм или сериал</span>
      <div className="search-bar__row">
        <input
          type="text"
          className="search-bar__input"
          placeholder="Например: Joker, Interstellar, Dune…"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
        <button type="submit" className="search-bar__button">Искать</button>
      </div>
    </form>
  );
}

export default SearchBar;