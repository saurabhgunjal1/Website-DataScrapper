import React, { useState } from "react";
import "./calculator.css";
export default function Calculator() {


    const [result, setResult] = useState("");
    const [input, setInput] = useState("");


    const handlebuttonclick = (value) => {
        if (value === "=") {
            calculateResult();
        } else if (value === "C") {
            clearInput();
        } else {
            setInput(input + value);
        }
    };


    const calculateResult = () => {
        if (input === "") {
            setResult("Error");
            return;
        }
        if (0 / 0) {
            setResult(NaN);
        }
        if (input / 0) {
            setResult(Infinity);
        }
        try {
            setResult(eval(input));
        } catch (error) {
            setResult("Error");
        }
    };


    const clearInput = () => {
        setInput("");
        setResult("");
    };


    return (
        <div>
            <div className="heading">
                <h1>React Calculator</h1>
            </div>
            <div className="input">
                <input type="text" value={input} readOnly />
            </div>
            <div className="result">
                <span>{result}</span>
            </div>
            <div className="btn">
                <div className="firstrow">
                    <button className="row1num" onClick={() => handlebuttonclick("7")}>
                        7
                    </button>
                    <button className="row1num" onClick={() => handlebuttonclick("8")}>
                        8
                    </button>
                    <button className="row1num" onClick={() => handlebuttonclick("9")}>
                        9
                    </button>
                    <button className="row1num" onClick={() => handlebuttonclick("+")}>
                        +
                    </button>
                </div>
                <div className="firstrow">
                    <button className="row1num" onClick={() => handlebuttonclick("4")}>
                        4
                    </button>
                    <button className="row1num" onClick={() => handlebuttonclick("5")}>
                        5
                    </button>
                    <button className="row1num" onClick={() => handlebuttonclick("6")}>
                        6
                    </button>
                    <button className="row1num" onClick={() => handlebuttonclick("-")}>
                        -
                    </button>
                </div>
                <div className="firstrow">
                    <button className="row1num" onClick={() => handlebuttonclick("1")}>
                        1
                    </button>
                    <button className="row1num" onClick={() => handlebuttonclick("2")}>
                        2
                    </button>
                    <button className="row1num" onClick={() => handlebuttonclick("3")}>
                        3
                    </button>
                    <button className="row1num" onClick={() => handlebuttonclick("*")}>
                        *
                    </button>
                </div>
                <div className="firstrow">
                    <button className="row1num" onClick={() => handlebuttonclick("C")}>
                        C
                    </button>
                    <button className="row1num" onClick={() => handlebuttonclick("0")}>
                        0
                    </button>
                    <button className="row1num" onClick={() => handlebuttonclick("=")}>
                        =
                    </button>
                    <button className="row1num" onClick={() => handlebuttonclick("/")}>
                        /
                    </button>
                </div>
            </div>
        </div>
    );
}
