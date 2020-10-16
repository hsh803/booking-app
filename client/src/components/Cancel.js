import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

export const Cancel = () => {

const [email, setEmail] = useState("");
const [mybooking, setMybooking] = useState([]);
const [display, setDisplay] = useState({display: "none"});

// Fetch booking database from MySQL (server)
useEffect(() => {
    Axios.get("/book/show")
    .then(res => 
        setMybooking(res.data.map(element => 
            (element.email === email) ? 
            (
            <div key={element.id}>
                <p>- Name: {element.name}</p>
                <p>- Email: {element.email}</p>
                <p>- Date: {element.datetime}</p>
            <button onClick={() => deleteHandle(element.email, element.datetime)}>Delete</button>
            </div>
            ) : null
        ))
        )
        console.log(email)
        console.log(mybooking)
        console.log(mybooking.length)
})

useEffect(() => {
    if (email === "") {
        setDisplay({display: "none"})
    }
}, [email]
)

// Display booking data in front-end (react)
const displayHandle = () => {
    if(mybooking !== null) {
        setDisplay({display: "block"});
     }
    
    if(mybooking === "" || email === ""){
        setDisplay({display: "none"});
        alert("There is no booking.");
        setEmail("");
    }
}
console.log(display.display)


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
        <div className="list" style={display}>{mybooking}</div>
    </div>
)
}