import React, { useCallback, useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Pagination from '../components/pagination/Pagination'
import Table from '../components/table/Table'

function TransactionsPage() {
    const match = useRouteMatch();

    const [transactions, setTransactions] = useState({})
    const [numberOfPages, setNumberOfPages] = useState(0)

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

    return (
        <div>
            <Switch>
                <Route path={`${match.path}/:pageNumber`}>
                    <Table 
                        updateTransactions={updateTransactions} 
                        transactions={transactions} 
                        updateNumberOfPages={updateNumberOfPages}
                    />
                </Route>
            </Switch>
            {numberOfPages && <Pagination numberOfPages={numberOfPages}/>}
        </div>
    )
}

export default TransactionsPage