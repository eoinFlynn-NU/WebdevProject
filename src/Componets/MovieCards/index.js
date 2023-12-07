import {useEffect, useState} from "react";
import {findMovieDetail, removeLikedMovie} from "../../Client/Detail/DetailClient";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

function MovieCards({key, movies, favoriteMovie, setYourFavoriteMovie}) {
    const user = useSelector((state) => state.userReducer.user);
    const [movie, setMovie] = useState([])
    useEffect(() => {
        findMovieDetail(movies.movie).then(
            movie => {
                setMovie(movie)
            }
        )
    }, []);
    const unlikedMovie = () => {
        if (user != null) {
            try {
                removeLikedMovie(user.username, movie.Title)
                setYourFavoriteMovie(
                    favoriteMovie.filter( (movie) => (
                        movie.Title === movies.movie))
                )
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <Link to={`/detail/${movies.movie}`}>
            <div className="card me-2 mb-2">
                <img className="card-img-top" src={movie.Poster} alt="Card image cap"/>
                <div className="card-body">
                    <div className="card-text">
                        <p className="mb-0">Title: {movie.Title}</p>
                        <p className="mb-0">Year: {movie.Year}</p>
                        <p>Rating: {movie.imdbRating}</p>
                    </div>
                    <button className="btn btn-danger" onClick={() => unlikedMovie(user.username, movie.Title)}>
                        Remove
                    </button>
                </div>
            </div>
        </Link>
    );
}

export default MovieCards;