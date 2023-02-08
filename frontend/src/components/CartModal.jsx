import React from "react";
import { useState, useEffect } from "react";

export default function Modal({setAddress}) {
    const [userInput, setUserInput] = useState(null);

    return (
        <div id="modal-container">
            <div id="modal">
                <div id="address">
                    <h3>Enter Your Address Below</h3>
                    <div>
                        <input className="address-field" value={userInput || ''} onChange={(e) => setUserInput(e.target.value)} />
                        <button onClick={() => setAddress(userInput)}>Submit</button>
                    </div>
                </div>
                <p>or click below for in store pickup</p>
                <button onClick={() => setAddress(null) }>Pick up</button>
            </div>
        </div>
    )
};