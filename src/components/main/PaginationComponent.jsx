// PaginationComponent.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/pagination.css'; // Import the CSS file for styling

const PaginationComponent = (props) => {

  const totalPages = props.totalPages;
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  
  return (
    <div>
      <div className="pagination-container">
      {
        pages.map((page, i) => (
          <NavLink key={i} to={`/page/${page}`}>
            <button className='page-button' onClick={window.scrollTo(0, 0)}>
              Page {page}
            </button>
          </NavLink>
        ))
      }
      </div>
      
      {/* <div className="pagination-container">
        <NavLink to='/page/1'>
          <button className='page-button'>
            Page 1
          </button>
        </NavLink>
        <NavLink to='/page/2'>
          <button className='page-button'>
            Page 2
          </button>
        </NavLink>
        <NavLink to='/page/3'>
          <button className='page-button'>
            Page 3
          </button>
        </NavLink>
      </div> */}
    </div>
  );
};

export default PaginationComponent;
