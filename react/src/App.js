import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './styles/App.css';
import Login from './pages/Login'
import UserInfo from './pages/UserInfo'

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-content">
          <Switch>
            <Route path="/user-info" component={UserInfo}/>
            <Route path="/" component={Login}/>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
