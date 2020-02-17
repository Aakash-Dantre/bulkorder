import React from 'react'

export default class Rate extends React.Component{
	constructor(props){
		super(props) 
}
    
    
	render(){
        // console.log(this.props)
		return(
  		<div>

    
         <p className="mb-1">User : {this.props.itm.bname}</p>
         <small>Review : {this.props.itm.review}</small>
         <br/>

          <span className="badge badge-success badge-pill" >Rating : {this.props.itm.rating}</span>

          <br/><br/>


      </div>
		);
  }
}