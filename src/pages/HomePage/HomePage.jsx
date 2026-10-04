import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './HomePage.css';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [query, setQuery] = useState(queryParam);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadMovies = async (text) => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${encodeURIComponent(text)}`
      );
      const data = await res.json();

      if (data.Response === 'False') {
        setError(data.Error);
      } else {
        setMovies(data.Search);
      }
    } catch (err) {
      setError('Ошибка соединения');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (queryParam) {
      loadMovies(queryParam);
    }
  }, [queryParam]);

  const handleSubmit = () => {
    setSearchParams({ q: query });
  };

  return (
    <main className="home-page">
      <div className="container home-page__inner">
        <SearchBar query={query} onQueryChange={setQuery} onSubmit={handleSubmit} />

        <section className="home-page__section">
          <h2 className="home-page__section-title">Результат поиска</h2>
          {isLoading && <Loader />}
          {!isLoading && error && <ErrorMessage message={error} />}
          {!isLoading && !error && <MovieList movies={movies} />}
        </section>
      </div>
    </main>
  );
}

export default HomePage;