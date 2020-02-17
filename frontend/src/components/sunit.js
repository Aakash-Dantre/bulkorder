import React from 'react'
import axios from 'axios'

export default class US extends React.Component{
	constructor(props){
		super(props)

		this.state={
			qn:"",
			bid:this.props.uid,
			bname:this.props.uname

		}
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeQ = this.onChangeQ.bind(this);
	}
	onSubmit(e){
		e.preventDefault()
		const Rq={...this.state,lid:this.props.itm._id}
		// console.log(Rq)
		 axios.post('http://localhost:4000/buy',Rq)
             .then(res => {
                 window.location.reload()
             })
             .catch(function(error) {
                 console.log(error);
             })

	}
		


	
	onChangeQ(event){

        this.setState({ qn: event.target.value })

	}
	render(){

		var left=this.props.itm.amount-this.props.itm.buyed
		var pisa =  this.props.itm.price/this.props.itm.amount
		return(
			<div>

			<a  style={{margin:'5px'}} className="list-group-item list-group-item-action flex-column align-items-start">
   			 <div className="d-flex w-100 justify-content-between">
    		  <h5 className="mb-1">{this.props.itm.vname}</h5>
   		   <small>rating</small>
   			 </div>
   			 <p className="mb-1">{this.props.itm.listname}</p>
   			 <small>{this.props.itm.description}</small>

   			 <form onSubmit={this.onSubmit}>
                    <div className="form-group">        
                        <label>Wanna Buy:</label>
                        <input type="number" 
                       			 min="1" max={left}
                               className="form-control" 
                               value={this.state.qn}
                               onChange={this.onChangeQ}
                               required
                               />
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" value="BUY" className="btn btn-primary"/>
                    </div>
                    
              </form>
        	<span className="badge badge-primary badge-pill">Price:{pisa}</span>

        	<span className="badge badge-primary badge-pill">{this.props.itm.buyed} / {this.props.itm.amount}</span>

 			 </a>

			</div>

		)

	}
}