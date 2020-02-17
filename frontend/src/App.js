import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Dashboard from "./components/dash"

import User from './components/user-login'


function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">App</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/vendor" className="nav-link">Vendor Login</Link>
              </li>
              <li className="navbar-item">
                <Link to="/user" className="nav-link">User-Login</Link>
              </li>
            </ul>
          </div>
        </nav>

        <br/>

        <p>
        WELCOME TO BULKORDER APP
        </p>
       
        <Route path="/user" component={() => <User value="user"/>}/>
        <Route path="/vendor" component={() => <User value="vendor"/>}/>
        <Route path="/dashboard" component={() => <Dashboard />}/>

      </div>
    </Router>
  );
}

export default App;
