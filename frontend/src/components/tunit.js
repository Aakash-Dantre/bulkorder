import React from 'react'
import axios from 'axios'

export default class List extends React.Component{
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
		var ps=this.state.qn-this.props.qna
		
		const Rq={qn:ps.toString(),bid:this.state.bid,bname:this.props.uname,lid:this.props.itm._id}
		
		 axios.post('http://localhost:4000/edit',Rq)
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
		var hide="display"
		if(this.props.itm.state==0){
			if(left==0){
				Text="Ready"
			}
			else{
				Text="Waiting"
			}
		}
		else{
			hide="none"
			if(this.props.itm.state==1){
				Text="Dispatched"
			}
			else{
				Text="Canceled"
			}
		}

		return(
  		<div>
          
        
        <a  style={{margin:'5px'}} className="list-group-item list-group-item-action flex-column align-items-start">
   			 <div className="d-flex w-100 justify-content-between">
    		  <h5 className="mb-1">{this.props.itm.vname}</h5>
   		   <small>rating</small>
   			 </div>
   			 <p className="mb-1">{this.props.itm.listname}</p>
   			 <small>{this.props.itm.description}</small>

   			 <form style={{display:hide}} onSubmit={this.onSubmit}>
                    <div className="form-group">        
                        <input type="number" 
                       			 min="0" max={left+this.props.qna}
                               className="form-control" 
                               value={this.state.qn}
                               onChange={this.onChangeQ}
                               />
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" value="EDIT" className="btn btn-primary"/>
                    </div>
                    
              </form>

        	<span className="badge badge-success badge-pill" >Price : {pisa}</span>

        	<span className="badge badge-primary badge-pill">Bought : {this.props.qna}</span>

        	<span className="badge badge-warning badge-pill">{this.props.itm.buyed} / {this.props.itm.amount}</span>
        	<span className="badge badge-info badge-pill">{Text}</span>

        </a>
        </div>
		);
  }
}