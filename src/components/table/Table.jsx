import './table.scss';
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import numeral from 'numeral';
import format from 'date-fns/format';
import Spinner from '../spinner/Spinner';

const Table = React.memo(function ({ updateTransactions , transactions  , updateNumberOfPages }) {
    const { pageNumber } = useParams();
    const [currentPageTransactions, setCurrentPageTransactions] = useState(transactions[pageNumber]);
    const [loading, setLoading] = useState(false);
    const firstLoad = useRef(true);
    const history = useHistory();

    const calculateSum = (transactions) => {
      let sum = 0;
      transactions.forEach((trx) => {
        sum+=parseFloat(trx.Amount);
      })
      return sum;
    }
    

    useEffect(() => {
        if (!transactions[pageNumber]) {
          setLoading(true)
          fetch(`https://resttest.bench.co/transactions/${pageNumber}.json`)
          .then(res => {
            setLoading(false)
            // We only parse the response if it is success response
            // and if we get error response we throw the error
            // to handle it in catch block
            if(res.status < 400){
                  return res.json()
            } else {
                  throw res
            }
          })
          .then((data) => {
            // we are using useRef here to avoid counting total number of pages after every request
              if (firstLoad.current) {
                  let numberOfPages = Math.ceil(data.totalCount/10)
                  firstLoad.current = false;
                  updateNumberOfPages(numberOfPages)
              }
              // caching results to avoid unnecessary network requests
              updateTransactions(data , pageNumber)               
          })
          .catch(err => {
            setLoading(false)
            if (err.status && 400 <= err.status && err.status < 500 ) {
                  history.push('/notFound')
            } else {
                  history.push('/serverError')
            }
          })
        } else {
            setCurrentPageTransactions(() => transactions[pageNumber])
        }
    }, [pageNumber, 
        updateTransactions,
        updateNumberOfPages, 
        transactions,
        history])

    return (
      <div className='transactions-table'>
        {loading? <Spinner/>
          :<table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Company</th>
                <th>Account</th>
                <th>{currentPageTransactions && numeral(calculateSum(currentPageTransactions)).format('$0,0.00')}</th>
              </tr>
            </thead>
            <tbody>
              {currentPageTransactions?.map( transaction => {
                return (<tr key={Math.random()} style={{color: transaction.Amount > 0? '#0A8B8C': 'black' }}>
                        <td data-column='Date'><span style={{opacity: '60%'}}>{format(new Date(transaction.Date), 'PP')}</span></td>
                        <td data-column='Company'>{transaction.Company}</td>
                        <td data-column='Account'><span style={{opacity: '60%'}}>{transaction.Ledger}</span></td>
                        <td data-column='Amount'>{numeral(Math.abs(transaction.Amount)).format('$0,0.00')}</td>
                      </tr>)
              })}
            </tbody>
          </table>}
      </div>
    )
})

export default Table;