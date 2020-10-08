import React from 'react';
import {Link} from 'react-router-dom';

export const Home = () => {
    return(
        <div className="home">
            <div className={"line"}><Link to="/book">Book</Link></div>
            <div><Link to="/cancel">Cancel</Link></div>
        </div>

    )
}


