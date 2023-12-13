
import {useEffect, useState} from "react";
import {findMovieDetail} from "../Client/Detail/DetailClient";
import "./home.css"
import {post} from "axios";

function ReviewList({reviews}) {
    const reviewMovieTitles = reviews.map(r => r.movie)
    const [posters, setPosters] = useState([]);

    useEffect(() => {
        async function fetchPosters() {
            const posters = await Promise.all(
                reviews.map(async (r) => {
                    const movieInfo = await findMovieDetail(r.movie);
                    return movieInfo.Poster;
                })
            );
            setPosters(posters);
        }
        fetchPosters();
    }, [reviews]);

    return (
        <div className="home-background">
            <ul className="list-group list-settings">
                {
                    reviews.map((r, index) => (
                        <li key={index} className="list-group-item som">
                            <div className="row ">
                                <div className="col-2 d-flex justify-content-center ">
                                <img src={posters[index]} className="review-poster" alt="user review poster"/>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <div className="col-2">
                                            <h5 className="text-white ">{r.movie}</h5>
                                        </div>
                                        <div className="col-2">
                                            <h5 className="text-white ">Rating: {r.rating}</h5>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <p className="text-white">{r.review}</p>
                                    </div>
                                    <div className="row">
                                        <i className="review-username text-white">{r.username}</i>
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