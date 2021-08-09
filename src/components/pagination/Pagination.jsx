import './pagination.scss';
import React from 'react'
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

const Pagination = React.memo(
    function ({numberOfPages}) {
    const match = useRouteMatch();
    const history = useHistory();
    const currentPath = history.location.pathname;
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
        <div className='pagination'>
          {currentPageNumber > 1 && <span className="pagination-arrow" onClick={()=> history.push(`/transactions/${+currentPageNumber-1}`)}>&#8249;</span>}
          {currentPageNumber > 2 && <span className="pagination-number">...</span>}
          {numberOfPages > 0 && currentPageNumber > 1 && createBtn(currentPageNumber-1)}
          {numberOfPages && createBtn(currentPageNumber)}
          {numberOfPages-currentPageNumber > 0 && createBtn(+currentPageNumber+1)}
          {numberOfPages-currentPageNumber > 1 && <span className="pagination-number">...</span>}
          {numberOfPages-currentPageNumber > 0 && <span className="pagination-arrow" onClick={()=> history.push(`/transactions/${+currentPageNumber+1}`)}>&#8250;</span>}
        </div>
    )
})

export default Pagination