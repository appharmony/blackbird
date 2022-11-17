import React from 'react';
import { Link } from "react-router-dom"

const Cards = () => {
    return (
        <section>
            <h1>Cards Page</h1>
            <br />
            <p>You must have been assigned an Cards role.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Cards
