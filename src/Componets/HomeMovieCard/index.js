import {useEffect, useState} from "react";
import {findMovieDetail, removeLikedMovie} from "../../Client/Detail/DetailClient";
import {Link} from "react-router-dom";

function HomeMovieCards({movies}) {
    const [movie, setMovie] = useState([])
    console.log(movie)
    useEffect(() => {
        findMovieDetail(movies.movie).then(
            movie => {
                setMovie(movie)
            }
        )
    }, []);

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
                </div>
            </div>
        </Link>
    );
}

export default HomeMovieCards;