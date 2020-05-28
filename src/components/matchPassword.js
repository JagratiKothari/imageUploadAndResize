import React from 'react';
import { useState } from 'react';
import './App.css';

function MatchPassword() {

    const [str1, setStr1] = useState("");
    const [str2, setStr2] = useState("");
    const [error, setError] = useState(false);
    function checkValues(e) {
        let eventType = e.type;
        setTimeout(()=> {
            console.log(e.type);
            console.log(eventType);
        }, 0)
        if(str1 === str2) {
            setError(false);
        } else {
            setError(true);
        }
        debugger;
        console.log(error);
    }


    return (
        <div className="App">

            <label> Enter Password:</label>
            <input type="password" onChange={checkValues} value = {str1} />

            <label> Renter Password:</label>
            <input type="password" onChange={event => setStr2(event.target.value)} value = {str2} />

            <button onClick = {checkValues}>Submit</button>


        </div>
    );
}

export default MatchPassword;

