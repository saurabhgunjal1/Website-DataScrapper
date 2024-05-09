import React, { useState } from 'react'

export default function Counter() {
    const  [value,setvalue] = useState(0);
    const  increment=()=>{
        setvalue(prevalue=>prevalue+1);
    }
    const  decrement=()=>{
        setvalue(prevalue=>prevalue-1);
    }

    return (
        <>
            <h1>Counter App</h1>
            <p>Count: {value} </p>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </>
    )
}
