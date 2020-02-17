import React from 'react'
import axios from 'axios'
export default class List extends React.Component{
	constructor(props){
		super(props) 
        this.onClick1 = this.onClick1.bind(this);
        this.onClick2 = this.onClick2.bind(this);

	}
    componentDidMount(){
        var mode = this.props.type

        if (mode=="all") {
            var elements = document.getElementsByClassName("btn btn-info")

             for (var i = 0; i < elements.length; i++){
            elements[i].style.display = "none";
            }
        }
        else{
            var elements = document.getElementsByClassName("btn btn-warning")

             for (var i = 0; i < elements.length; i++){
            elements[i].style.display = "none";
            }
        }
    }
    onClick1(e) {
        // e.preventDefault();

        var mode = this.props.type
        var t="dispatch"
        if(mode="all"){
            t="fds"
        }
        axios.post('http://localhost:4000/status', {id:this.props.itm._id,what:"dispatch"})
                 .then(res => {
                   if(res.data.success==true)
                   {
                      window.location.reload()
                      // document.getElementById("afterdis").innerHTML = "dispatched";
                    
                   }
                   else{
                      // document.getElementById("afterdis").innerHTML = "F";
                   }
                 });
    }
    onClick2(e) {
        // e.preventDefault();

     
        axios.post('http://localhost:4000/status', {id:this.props.itm._id,what:"dish"})
                 .then(res => {
                   if(res.data.success==true)
                   {
                      window.location.reload()
                      // document.getElementById("afterdis").innerHTML = "dispatched";
                    
                   }
                   else{
                      // document.getElementById("afterdis").innerHTML = "F";
                   }
                 });
    }
    
	render(){
        // console.log(this.props)
		return(
  		<div>

        <li className="list-group-item d-flex justify-content-between align-items-center">
        {this.props.itm.listname}
        <button type="button"  className="btn btn-info" style={{position:"absolute",right:"100px"}} onClick={this.onClick1}>dispatch</button>
        <button type="button"  className="btn btn-warning" style={{position:"absolute",right:"100px"}} onClick={this.onClick2}>Cancel</button>
        <span id="afterdis"></span>
        <span className="badge badge-primary badge-pill">{this.props.itm.buyed}/{this.props.itm.amount}</span>
        
        </li>

        </div>
		);
  }
}