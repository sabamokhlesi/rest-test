import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import TransactionsPage from './containers/TransactionsPage'
import Header from './components/header/Header';

function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route path="/transactions">
            <TransactionsPage/>
        </Route>
        <Redirect to='/transactions/1'/>
      </Switch>
    </Router>
  );
}

export default App;