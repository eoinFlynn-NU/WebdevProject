import { Link } from "react-router-dom"
import "./search.css"


function MovieResults ({results}) {
    return (
        <div>
            <ul className="list-group">
                {
                    results.map((r, index) => (
                        <Link to={`/detail/${r.Title}`} className="searchTitle">
                            <li key={index} className="list-group-item">
                                <div className="row">
                                    <div className="col">
                                        <h3>{r.Title}</h3>
                                    </div>
                                    <div className="col">
                                        <h3 className="searchYear">{r.Year}</h3>
                                    </div>
                                </div>
                            </li>
                        </Link>
                    ))
                }

            </ul>
        </div>
    )

}
export default MovieResults