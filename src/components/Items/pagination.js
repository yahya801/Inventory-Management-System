import React from 'react';
import styles from './itemstop.module.css'

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  const pageactive = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const active = (number) =>{
    
    console.log(pageNumbers.length)
    for(let i = 0; i< pageNumbers.length;i++){
      if(i == number) {
        pageactive.push(true)
      }
      else{
        pageactive.push(false)
      }
    }
    pageactive[0] = true
    console.log(pageactive)
    paginate(number)
  }

  return (
    <nav>
    
      <ul className="pagination">
     
        {pageNumbers.map(number => (
       
          <li key={number} className="page_item">
           
            <a onClick={() => active(number)}  className="page-link">
              {number}
            </a>
           
          </li>
        ))}
       
      </ul>
    </nav>
  );
};

export default Pagination;