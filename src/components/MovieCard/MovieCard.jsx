import { Link } from 'react-router-dom';
import LikeButton from '../LikeButton/LikeButton';
import './MovieCard.css';

function MovieCard({ movie }) {
  return (
    <article className="movie-card">
      <Link to={`/movie/${movie.imdbID}`} className="movie-card__poster-button">
        <div className="movie-card__poster">
          <img src={movie.Poster} alt={movie.Title} />
        </div>
        <span className="movie-card__type">{movie.Type}</span>
      </Link>

      <div className="movie-card__like">
        <LikeButton />
      </div>

      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.Title}</h3>
        <p className="movie-card__year">{movie.Year}</p>
      </div>
    </article>
  );
}

export default MovieCard;