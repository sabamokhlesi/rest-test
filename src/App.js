import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import TransactionsPage from './containers/TransactionsPage';
import Header from './components/header/Header';
import NotFoundPage from './components/notFoundPage/NotFoundPage';
import ServerErrorPage from './components/serverErrorPage/ServerErrorPage';

function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route path="/transactions">
            <TransactionsPage/>
        </Route>
        <Route path="/notFound">
            <NotFoundPage/>
        </Route>
        <Route path="/serverError">
            <ServerErrorPage/>
        </Route>
        <Redirect to='/transactions/1'/>
      </Switch>
    </Router>
  );
}

export default App;