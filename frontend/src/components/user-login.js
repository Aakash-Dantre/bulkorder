import React from "react"
import LoginTemplate from "./login"

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function User(props){
    var pathl="/"+props.value+"/login"
    var pathr="/"+props.value+"/register"
    return(
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to={pathl} className="nav-link">Login</Link>
              </li>
              <li className="navbar-item">
                <Link to={pathr} className="nav-link">Register</Link>
              </li>
            </ul>
          </div>
        </nav>

        <br/>

       
        <Route path={pathl} component={() => <LoginTemplate user={props.value} mode="login"/>}/>
        <Route path={pathr} component={() => <LoginTemplate user={props.value} mode="register"/>}/>


      </div>
    </Router>
        );
}
export default User