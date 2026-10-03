import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';

function MovieList({ movies }) {
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li key={movie.imdbID}>
          <MovieCard movie={movie} />
        </li>
      ))}
    </ul>
  );
}

export default MovieList;