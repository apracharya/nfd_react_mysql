// PaginationComponent.js
import React from 'react';
import '../../styles/pagination.css'; // Import the CSS file for styling
import { NavLink } from 'react-router-dom';

const PaginationComponent = () => {
  return (
    <div>
      <div className="pagination-container">
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
      </div>
    </div>
  );
};

export default PaginationComponent;
