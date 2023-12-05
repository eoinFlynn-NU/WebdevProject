import "./home.css"
import {useEffect, useState} from "react";
import {findMovieDetail} from "../Client/Detail/DetailClient";


function ReviewList({reviews}) {
    const reviewMovieTitles = reviews.map(r => r.movie)

    const fetchMovies = async () => {
        try {
          const movies = await Promise.all(reviewMovieTitles.map(title => findMovieDetail(title)));
          const posters = movies.map(movie => movie.Poster)
          return posters
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      };
      const [posters, setPosters] = useState([]);

      useEffect(() => {
        const storedPosters = localStorage.getItem('posters');
    
        if (storedPosters) {
          setPosters(JSON.parse(storedPosters));
        } else {
          fetchMovies().then(posters => {
            setPosters(posters);
            localStorage.setItem('posters', JSON.stringify(posters));
          });
        }
      }, []);


    return (
        <div className="home-background">
            <ul className="list-group">
                {
                    reviews.map((r, index) => (
                        <li key={index} className="list-group-item">
                            <div className="row">
                                <div className="col-2 d-flex justify-content-center">
                                    {console.log(posters[index])}
                                <img src={posters[index]} className="review-poster" alt="user review poster"/>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <div className="col-2">
                                            <h5>{r.movie}</h5>
                                        </div>
                                        <div className="col-2">
                                            <h5>Rating: {r.rating}</h5>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <p>{r.review}</p>
                                    </div>
                                    <div className="row">
                                        <i className="review-username">{r.username}</i>
                                    </div>
                                    </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
export default ReviewList