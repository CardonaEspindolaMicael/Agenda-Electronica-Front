import React, { useState } from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul class="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className='page-link' onClick={() => {
            setCurrentPage(prevPage => prevPage - 1);
            paginate(currentPage - 1);
          }}>
            Previous
          </button>
        </li>

        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <button className='page-link' onClick={() => {
              setCurrentPage(number);
              paginate(number);
            }}>
              {number}
            </button>
          </li>
        ))}

        <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
          <button className='page-link' onClick={() => {
            setCurrentPage(prevPage => prevPage + 1);
            paginate(currentPage + 1);
          }}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};
export default Pagination;
