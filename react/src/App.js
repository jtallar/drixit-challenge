import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css';
import ListOfGifs from './pages/ListOfGifs'
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-content">
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/gifs/dsadas">Gifs</Link>
                </li>
              </ul>
            </nav>
          </div>

          <Switch>
            <Route path="/gifs/:keyword" component={ListOfGifs}/>
            <Route path="/gifs" component={ListOfGifs}/>
            <Route path="/about" component={About}/>
            <Route path="/" component={Home}/>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
