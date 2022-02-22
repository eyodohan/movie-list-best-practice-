import _ from "lodash";
import React from "react";

const Pagination = ({ currentPage, pageSize, moviesCount, onPageChange }) => {
  const pagesCount = Math.ceil(moviesCount / pageSize + 1);
  const pages = _.range(1, pagesCount);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={page === currentPage ? "page-item active" : "page-item"}
            key={page}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
