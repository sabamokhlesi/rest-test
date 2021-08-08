import './pagination.scss';
import React from 'react'
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';

const Pagination = React.memo(
    function ({numberOfPages}) {
    const match = useRouteMatch();
    const history = useHistory();
    const currentPath = history.location.pathname
    const generatePaginationBtns = (numberOfPages) => {
        let btnsArray = []
        console.log(currentPath.substring(currentPath.lastIndexOf('/') + 1))
        for (let i = 1; i <= numberOfPages; i++) {
            const btn = <Link to={`${match.url}/${i}`} key={i}><button style={{backgroundColor: currentPath.substring(currentPath.lastIndexOf('/') + 1) == i? 'pink': 'white'}}>{i}</button></Link>;   
            btnsArray.push(btn);             
        }

        return btnsArray
    }
    return (
        <div>
            {generatePaginationBtns(numberOfPages).map((btn) => btn)}
        </div>
    )
})

export default Pagination