import React from 'react';
import { Link } from 'react-router-dom';

export const Confirm = ({info}) => {
    return(
        <div className="confirm">
            <h3>{info.name}, your booking is confirmed!</h3>
            <div>Confirmation email sent to your email adress, {info.email}.</div>
            <button type="buttom"><Link to="/">Go to Home</Link></button>
        </div>
    )
}