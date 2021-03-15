import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './styles/App.css';
import Login from './pages/Login'
import UserInfo from './pages/UserInfo'
import Logout from './pages/Logout'

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-content">
          <Switch>
            <Route path="/user-info" component={UserInfo}/>
            <Route path="/login" component={Login}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/">
                <Redirect to="/login" />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
