import React from 'react'



const Alert = () => {

  function alert(){
    alert("Hello world!");
  }

  return (
    <div>
      <input type="text" />
      <button onClick={onClick}></button>
    </div>
  )
}

export default Alert