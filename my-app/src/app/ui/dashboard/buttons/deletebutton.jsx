"use client"
import React from 'react'

const Deletebutton = (props) => {
    const userId = props.id;
    console.log(userId);
    const addUser = async () => {
        let result = await fetch("https://attend.anujdwivedi.in/schedule/get-schedules"+userId,{
            method: "get"
        })
        result = await result.json();
        if(result.success){
            alert("User added");
        }
    }
  return (
    <div>
      <button className='btn btn-outline'>Delete</button>
    </div>
  )
}

export default Deletebutton
