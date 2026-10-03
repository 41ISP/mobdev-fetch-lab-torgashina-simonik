import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './MovieDetailsPage.css';

function MovieDetailsPage() {
    const { imdbID } = useParams();
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadMovie = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const res = await fetch(
                    `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${imdbID}&plot=full`
                );
                const data = await res.json();

                if (data.Response === 'False') {
                    setError(data.Error);
                } else {
                    setMovie(data);
                }
            } catch (err) {
                setError('Ошибка соединения');
            }

            setIsLoading(false);
        };

        loadMovie();
    }, [imdbID]);

    return (
        <main className="movie-details-page">
            <div className="container">
                {isLoading && <Loader />}
                {error && <ErrorMessage message={error} />}
                {!isLoading && !error && movie && <MovieDetails movie={movie} />}
            </div>
        </main>
    );
}

export default MovieDetailsPage;