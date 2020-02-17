import React from 'react'
import Rate from './ratings'

export default class List extends React.Component{
	constructor(props){
		super(props) 
}
    
    
	render(){
        // console.log(this.props)
        var lol=this.props.itm.buyers

        const Ratings=
          lol.map(item => <Rate itm={item}/>)   

		return(
  		<div>

        
        <a  style={{margin:'5px'}} className="list-group-item list-group-item-action flex-column align-items-start">
         <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{this.props.itm.listname}</h5>
         </div>

         {Ratings}
           

        </a>

      </div>
		);
  }
}