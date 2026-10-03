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
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    if (query.trim()) {
      setSearchParams({ q: query });
    }
  };

  useEffect(() => {
    if (!queryParam) return;

    const loadMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${queryParam}`
        );
        const data = await res.json();

        if (data.Response === 'False') {
          setError(data.Error);
          setMovies(null);
        } else {
          setMovies(data.Search);
        }
      } catch (err) {
        setError('Ошибка соединения');
        setMovies(null);
      }

      setIsLoading(false);
    };

    loadMovies();
  }, [queryParam]);

  return (
    <main className="home-page">
      <div className="container home-page__inner">
        <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

        <section className="home-page__section">
          <h2 className="home-page__section-title">Результат поиска</h2>

          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && movies && <MovieList movies={movies} />}
        </section>
      </div>
    </main>
  );
}

export default HomePage;