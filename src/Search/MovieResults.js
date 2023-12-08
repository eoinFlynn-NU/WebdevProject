import { Link } from "react-router-dom"


function MovieResults ({results}) {
    return (
        <div>
            <ul className="list-group">
                {
                    results.map((r, index) => (
                        <li key={index} className="list-group-item">
                            <Link>{r.username}</Link>
                        </li>
                    ))
                }

            </ul>
        </div>
    )

}
export default MovieResults