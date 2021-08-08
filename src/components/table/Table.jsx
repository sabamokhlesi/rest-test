import './table.scss';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';

const Table = React.memo(function ({ updateTransactions , transactions  , updateNumberOfPages , totalAmount}) {
    let { pageNumber } = useParams();

    const [currentPageTransactions, setCurrentPageTransactions] = useState(transactions[pageNumber]);
    const [loading, setLoading] = useState(false)
    const firstLoad = useRef(true)
    useEffect(() => {
        if (!transactions[pageNumber]) {
          setLoading(true)
          fetch(`https://resttest.bench.co/transactions/${pageNumber}.json`)
          .then(res => {
            setLoading(false)
            if(res.status < 400){
                  return res.json()
            } else {
                  throw res
            }
          })
          .then((data) => {
              if (firstLoad.current) {
                  let numberOfPages = Math.ceil(data.totalCount/10)
                  firstLoad.current = false;
                  updateNumberOfPages(numberOfPages)
              }
              updateTransactions(data , pageNumber)               
          })
          .catch(err => {
            setLoading(false)
            if (err.status && 400 <= err.status && err.status < 500 ) {
                  // history.push('/404')
                  console.log('404 not found')
            } else {
                  console.log('internal server error')
            }
          })
        } else {
            setCurrentPageTransactions(() => transactions[pageNumber])
        }
    }, [pageNumber , 
        updateTransactions,
        updateNumberOfPages, 
        transactions])

    return (
      <div className='transactions-table'>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Company</th>
              <th>Account</th>
              <th>{totalAmount}</th>
            </tr>
          </thead>
          <tbody>
            {currentPageTransactions?.map( transaction => {
              return (<tr key={Math.random()} style={{color: transaction.Amount > 0? '#0A8B8C': 'black' }}>
                      <td data-column='Date'><span style={{opacity: '70%'}}>{transaction.Date}</span></td>
                      <td data-column='Company'>{transaction.Company}</td>
                      <td data-column='Account'><span style={{opacity: '70%'}}>{transaction.Ledger}</span></td>
                      <td data-column='Amount'>{transaction.Amount}</td>
                    </tr>)
            })}
          </tbody>
        </table>
      </div>
    )
})

export default Table;