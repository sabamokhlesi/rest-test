import './table.scss';

function Table(props) {
  return (
    <div className='transactions-table'>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Company</th>
            <th>Account</th>
            <th>{props.totalTransactionsAmount}</th>
          </tr>
        </thead>
        <tbody>
          {props.transactions.map( transaction => {
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
  );
}

export default Table;