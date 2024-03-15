import React from 'react'
import '../styles/cast.css';

const Cast = (props) => {
  return (
    <div>
      <div className='cast-header'>Casts</div> <br />
      <div>{props?.casts?.join(",   ")}</div>
    </div>
  )
}

export default Cast