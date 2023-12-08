



function UserResults ({results}) {
    return (
        <div>
            <ul className="list-group">
                {
                    results.map((r, index) => (
                        <li key={index} className="list-group-item">
                            <div className="row">
                                <div className="col">

                                </div>
                                <div className="col">
                                    
                                </div>
                                <div className="col">

                                </div>
                            </div>
                        </li>
                    ))
                }

            </ul>
        </div>
    )
}
export default UserResults