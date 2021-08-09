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
              <button
                  style={{backgroundColor: +currentPageNumber === +pageNumber? 'pink': 'white'}}>
                    {pageNumber}
              </button>
        </Link>
      )
    };

    // const generatePaginationBtns = (numberOfPages) => {
    //     let btnsArray = []
    //     for (let i = 1; i <= numberOfPages; i++) {
    //         const btn = createBtn(i);   
    //         btnsArray.push(btn);             
    //     }
    //     return btnsArray
    // }

    return (
        <div className='pagination'>
          {currentPageNumber > 1 && <button onClick={()=> history.push(`/transactions/${+currentPageNumber-1}`)}>Previous</button>}
          {currentPageNumber > 2 && <span>...</span>}
          {numberOfPages > 0 && currentPageNumber > 1 && createBtn(currentPageNumber-1)}
          {numberOfPages && createBtn(currentPageNumber)}
          {numberOfPages-currentPageNumber > 0 && createBtn(+currentPageNumber+1)}
          {numberOfPages-currentPageNumber > 1 && <span>...</span>}
          {numberOfPages-currentPageNumber > 0 && <button onClick={()=> history.push(`/transactions/${+currentPageNumber+1}`)}>Next</button>}
        </div>
    )
})

export default Pagination