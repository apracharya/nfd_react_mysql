import React from 'react'
import '../../styles/cast.css';

const Cast = (props) => {

  return (
    <div className='cast-body'>     
      {/* <div className="container">
          <h1 className='cast-h1'>Casts of "{props.title}"</h1>
          <ul className='cast-ul'>
            {props?.casts?.map((cast, index) => {
              return <li className='cast-li' key={index}>{cast}</li>
            })}
          </ul>
      </div> */}
      <div>
        <h1 className='cast-h1'>Cast of "{props.title}"</h1>
        <ul className="cast-list">
        {props?.casts?.map((cast, index) => {
          return(
            <li key={index}>
              <h4>{cast}</h4>
              <p>Actor</p>
          </li>
          )
        })}
          
        </ul>
      </div>
    </div>
    
  )
}

export default Cast