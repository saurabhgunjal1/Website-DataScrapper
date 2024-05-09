
import React, { useState } from 'react'

export default function Displayname() {
    const [firstname, setfirstname] = useState();
    const [lastname, setlastname] = useState();
    const [fullname, setFullname] = useState('');
    const handleInputChange =(event)=>{
        setfirstname(event.target.value);
    }
    const handleInputChangelastname =(event)=>{

        setlastname(event.target.value);
    }
    const handlesubmit =(event)=>{
        event.preventDefault();
        try{
        let fullname = firstname.concat(" ",lastname);
        setFullname(fullname)
        console.log(fullname)

       
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <>
        <form onSubmit={handlesubmit}>
            <h1>Full Name Display</h1>
            <label >First Name:</label>
            <input type="text" value={firstname} onChange={handleInputChange} required/>
            <br />
            <label >Last Name:</label>
            <input type="text" value={lastname} onChange={handleInputChangelastname} required/>
            <br />

            <button type='Submit' >Submit</button>
            </form>
            {fullname && (
                <p>Full Name: {fullname}</p>
            )}
        </>
    )
}
