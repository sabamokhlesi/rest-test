import './table.scss';
import React, { useEffect, useRef, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import numeral from 'numeral'
import format from 'date-fns/format'
import Spinner from '../spinner/Spinner'

const Table = React.memo(function ({ updateTransactions , transactions  , updateNumberOfPages , totalAmount}) {
    let { pageNumber } = useParams();

    const [currentPageTransactions, setCurrentPageTransactions] = useState(transactions[pageNumber]);
    const [loading, setLoading] = useState(false)
    const firstLoad = useRef(true)
    const history = useHistory();
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
                <th>{numeral(totalAmount).format('$0,0.00')}</th>
              </tr>
            </thead>
            <tbody>
              {currentPageTransactions?.map( transaction => {
                return (<tr key={Math.random()} style={{color: transaction.Amount > 0? '#0A8B8C': 'black' }}>
                        <td data-column='Date'><span style={{opacity: '70%'}}>{format(new Date(transaction.Date), 'PP')}</span></td>
                        <td data-column='Company'>{transaction.Company}</td>
                        <td data-column='Account'><span style={{opacity: '70%'}}>{transaction.Ledger}</span></td>
                        <td data-column='Amount'>{numeral(Math.abs(transaction.Amount)).format('$0,0.00')}</td>
                      </tr>)
              })}
            </tbody>
          </table>}
      </div>
    )
})

export default Table;