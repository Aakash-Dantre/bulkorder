import React from "react"
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Add from './add'
import List from './list'
import Search from './search'
import Track from './track'
import Rate from './rate'


export default class Dashboard extends React.Component{
	constructor(){
		super()
		var st=localStorage.getItem('mydata')
		console.log(st)

		if (st==null)
		{
			window.location.assign('/user/login');
		}

		this.state=JSON.parse(st)
        this.onClick=this.onClick.bind(this);
        


	}
	componentDidMount(){
		var mode = this.state.type
        if (mode=="user") {
        	document.getElementById("navvendor").hidden= true;
        }
        else  {
        	document.getElementById("navuser").style.display = "none";
        }
        document.getElementById("lolout").style.zIndex = "2";


	}
	onClick(){
		localStorage.clear()
		window.location.assign('/')
	}
	
	render(){

		return(
		<Router>	
			<div>

			<nav id="navvendor" className="navbar navbar-expand-lg navbar-light bg-light">
	          <div className="collapse navbar-collapse">
	            <ul className="navbar-nav mr-auto">
	              <li className="navbar-item">
	                <Link to="/dashboard/add" className="nav-link">Add-New</Link>
	              </li>	
	              <li className="navbar-item">
	                <Link to="/dashboard/list" className="nav-link">Lists</Link>
	              </li>
	              <li className="navbar-item">
	                <Link to="/dashboard/todispatch" className="nav-link">Ready</Link>
	              </li>
	              <li className="navbar-item">
	                <Link to="/dashboard/dispatched" className="nav-link">Dispatched</Link>
	              </li>
	              <li style={{position:"absolute",right:"3px"}}>
	              {this.state.username}
	              </li>
	            </ul>
	          </div>
	       </nav>
	       	<nav  id="navuser" className="navbar navbar-expand-lg navbar-light bg-light">
	          <div className="collapse navbar-collapse">
	            <ul className="navbar-nav mr-auto">
	              <li className="navbar-item">
	                <Link to="/dashboard/search" className="nav-link">Search</Link>
	              </li>
	              <li className="navbar-item">
	                <Link to="/dashboard/track" className="nav-link">Track</Link>
	              </li>
	              <li className="navbar-item">
	                <Link to="/dashboard/rate" className="nav-link">Rate</Link>
	              </li>
	              <li style={{position:"absolute",right:"3px"}}>
	              {this.state.username}
	              </li>
	            </ul>
	          </div>
	       </nav>
				<button id="lolout" className="btn btn-primary" onClick={this.onClick}>LOGOUT</button>
        
        <Route path="/dashboard/add" component={() => <Add id={this.state._id} name={this.state.username}/>}/>
        <Route path="/dashboard/list" component={() => <List id={this.state._id} type="all"/>}/>
        <Route path="/dashboard/todispatch" component={() => <List id={this.state._id} type="todis"/>}/>
        <Route path="/dashboard/dispatched" component={() => <List id={this.state._id} type="rate"/>}/>
		<Route path="/dashboard/search" component={() => <Search id={this.state._id} name={this.state.username}/>}/>
		<Route path="/dashboard/track" component={() => <Track id={this.state._id} name={this.state.username}/>}/>
		<Route path="/dashboard/rate" component={() => <Rate id={this.state._id} name={this.state.username}/>}/>

	</div>



        {/*
        <Route path="/dashboard/dispatched" component={() => <Dashboard />}/>
        <Route path="/dashboard/search" component={() => <Dashboard />}/>
        <Route path="/dashboard/track" component={() => <Dashboard />}/>
        <Route path="/dashboard/rate" component={() => <Dashboard />}/>*/}

		</Router>
		);
	}
}


