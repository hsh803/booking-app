import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Confirm } from './Confirm';


export const Book = () => {

const [dateValue, setDateValue] = useState([]);
const [formValue, setFormValue] = useState({id: "", name: "", email: "", date: ""});
const [step, setStep] = useState(1);

// Email adress format validation
const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
const isValid = pattern.test(formValue.email);

// Fetch data from MySQL database via back-end server
useEffect(() => {
    fetch("/date") // add "proxy": "http://localhost:8000" in package.json
    .then(response => response.json())
    .then(data => 
        setDateValue(data.map(element =>
            <div key={element.id}>
                <input type="radio" name="date" onChange={(e) => setFormValue({...formValue, date: e.target.value, id: element.id})} value={element.datetime} />{element.datetime}
            </div>
            ))
    )})

// Send values from front-end to back-end
const formSubmit = (e) => {
    if (formValue.name === "" || formValue.email === ""){
        e.preventDefault();
        alert("Your name, email adress must be filled.");
    } else if (isValid === false) {
        e.preventDefault();
        alert("Your email adress is not valid.");
    }  else if (formValue.date === "") {
        e.preventDefault();
        alert("The date must be selected.");
    } else {

    Axios.all([
        Axios.post("/date/delete", {
            id: formValue.id
        }),
        Axios.post("/book/add", {
            id: formValue.id, name: formValue.name, email: formValue.email, date: formValue.date
        })
    ])
    .then(Axios.spread((res1, res2) => {console.log(res1 + res2)  
    }))
    .catch(error => {console.log(error)
    })
    setStep(2)
    }
}
console.log(dateValue)
console.log(formValue)

switch(step){
    case 1:      
        return(
            <div className="book">
                <form onSubmit={formSubmit}>
                    <div>Name</div>
                    <input type="text" onChange={(e) => setFormValue({...formValue, name: e.target.value})} value={formValue.name} />
                    <div>E-mail</div>
                    <input type="text" onChange={(e) => setFormValue({...formValue, email: e.target.value})} value={formValue.email} />
                    <div>Date</div>
                    {dateValue}
                    <button type="submit">Book</button>
                </form>
            </div>
            )
    case 2:
        return(
            <Confirm info={formValue} />
            )
    default: (console.log("This is build by switch statement"))
}
}


