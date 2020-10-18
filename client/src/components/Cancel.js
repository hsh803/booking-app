import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

export const Cancel = () => {

const [email, setEmail] = useState("");
const [mybooking, setMybooking] = useState("");
const [display, setDisplay] = useState({display: "none"});

// Fetch booking database from MySQL (server)
useEffect(() => {
    Axios.get("/book/show")
    .then(res => res.data.map(element =>
        (element.email === email) ?
        setMybooking(element) : ""
        )
        )
        console.log(email)
        console.log(mybooking)
})

// Control displaying booking list depending on email input value
useEffect(() => {
    if (email === "") {
        setDisplay({display: "none"})
    }
}, [email]
)

// Display booking data in front-end (react)
const displayHandle = () => {
    if(mybooking.email === email) {
        setDisplay({display: "block"});
     }
    
    if(mybooking.email !== email){
        setDisplay({display: "none"});
        alert("There is no booking.");
        setMybooking("")
        setEmail("");
    }
}
console.log(display.display)

// Setting booking list to variable
const booking = 
    <div key={mybooking.id}>
        <p>- Name: {mybooking.name}</p>
        <p>- Email: {mybooking.email}</p>
        <p>- Date: {mybooking.datetime}</p>
        <button onClick={() => deleteHandle(mybooking.email, mybooking.datetime)}>Delete</button>
    </div>
    
// Delete booking from MySQL database (server)
const deleteHandle = (email, date) => {
    console.log(email + date);
    Axios.post("/book/cancel", {
        email: email,
        date: date
    }).then((res) => {console.log(res)
    }).catch((err) => {console.log(err)
    })
    alert("Your booking is canceled.");
    setEmail("");
}

return(
    <div className="cancel">
        <div>Type in the email adress you gave by your booking.</div>
            <div className="cancel-input-btn">
            <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
            <button type="button" onClick={() => displayHandle()}>OK</button>
            <button type="buttom"><Link to="/">Go to Home</Link></button>
            </div>
        <div className="list" style={display}>{booking}</div>
    </div>
)
}