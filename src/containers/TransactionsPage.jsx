import React, { useCallback, useState, useEffect } from 'react'
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'
import Pagination from '../components/pagination/Pagination'
import Table from '../components/table/Table'

function TransactionsPage() {
    const match = useRouteMatch();

    const [transactions, setTransactions] = useState({})
    const [numberOfPages, setNumberOfPages] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)

    const history = useHistory();
    const currentPath = history.location.pathname

    const updateTransactions = useCallback(
        (data , pageNumber) => {
            setTransactions((curState) => {
                const newState = {...curState}
                newState[pageNumber] = data.transactions;
                return newState;
            })
        },
        [],
    )

    const updateNumberOfPages = useCallback(
        (n) => {
            setNumberOfPages(n)
        },
        [],
    )
    
    useEffect(() => {
       const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);
       if (transactions[currentPage]) {
            setTotalAmount((currState) => {
                  let newTotalAmount = currState
                  transactions[currentPage].forEach((trx) => {                        
                        newTotalAmount+=parseFloat(trx.Amount)      
                  })
                  return newTotalAmount;
                })        
      }
          
    }, [transactions, currentPath])

    return (
        <div>
            <Switch>
                <Route path={`${match.path}/:pageNumber`}>
                    <Table 
                        updateTransactions={updateTransactions} 
                        transactions={transactions} 
                        updateNumberOfPages={updateNumberOfPages}
                        totalAmount={totalAmount.toFixed(2)}
                    />
                </Route>
            </Switch>
            {numberOfPages && <Pagination numberOfPages={numberOfPages}/>}
        </div>
    )
}

export default TransactionsPage