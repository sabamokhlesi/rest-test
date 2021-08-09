import './pagination.scss';
import React from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

// we are using react memo here to prevent unnecessary renders
const Pagination = React.memo(
    function ({numberOfPages}) {
    const match = useRouteMatch();
    const history = useHistory();
    const currentPath = history.location.pathname;
    // We extract the current page number from the route to compare it with the pagination buttons
    const currentPageNumber = currentPath.substring(currentPath.lastIndexOf('/') + 1)

    const createBtn = (pageNumber) => {
      return (
        <Link
            to={`${match.url}/${pageNumber}`}
            key={pageNumber}>
              <span className="pagination-number"
                  style={{backgroundColor: +currentPageNumber === +pageNumber? '#b5d8d8': 'white'}}>
                    {pageNumber}
              </span>
        </Link>
      )
    };

    return (
        // In the next lines we are implementing the logic for showing last and next page and "..." based on the current page
        // Please note that we only show previous and next page icons if there is a previous or next page
        <div className='pagination'>
          {currentPageNumber > 1 && 
            <span className="pagination-arrow" onClick={()=> history.push(`/transactions/${+currentPageNumber-1}`)}>
              &#8249;
            </span>}
          {currentPageNumber > 2 && <span className="pagination-number">...</span>}
          {numberOfPages > 0 && currentPageNumber > 1 && createBtn(currentPageNumber-1)}
          {numberOfPages && createBtn(currentPageNumber)}
          {numberOfPages-currentPageNumber > 0 && createBtn(+currentPageNumber+1)}
          {numberOfPages-currentPageNumber > 1 && <span className="pagination-number">...</span>}
          {numberOfPages-currentPageNumber > 0 && 
            <span className="pagination-arrow" onClick={()=> history.push(`/transactions/${+currentPageNumber+1}`)}>
              &#8250;
            </span>}
        </div>
    )
})

export default Pagination