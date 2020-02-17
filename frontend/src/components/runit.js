import React from 'react'
import axios from 'axios'

export default class RS extends React.Component{
	constructor(props){
		super(props)
		this.state={
			rating:"",
			review:"",
			bid:this.props.uid,
			lid:this.props.itm._id,
			// rated:this.props.itm.rated
		}
 		this.onSubmit = this.onSubmit.bind(this);
        this.onChangeRev = this.onChangeRev.bind(this);
        this.onChangeRat = this.onChangeRat.bind(this);

	}
   onSubmit(e){
		e.preventDefault()
	 console.log("jadu")
		axios.post('http://localhost:4000/addrate',this.state)
         .then(res => {
             window.location.reload()
             console.log("sex")
         })
         .catch(function(error) {
             console.log(error);
         })
	}
		


	
	onChangeRev(event){

        this.setState({ review: event.target.value })

	}
	onChangeRat(event){

        this.setState({ rating: event.target.value })

	}
   
	render(){
		var uid=this.props.uid
		var hide="display"
		var hide1="none"
		var rev=""
		var rat;
		
		hide1="none"
		hide="display"
		var lol=this.props.itm.buyers
		for(var i in lol){
			if(lol[i].bid==uid){
				if(lol[i].rated==1){
					hide="none"
					hide1="display"
					rev=lol[i].review
					rat=lol[i].rating
				}
			}
		}
		
		
		return(
  		<div>
          
        
        <a  style={{margin:'5px'}} className="list-group-item list-group-item-action flex-column align-items-start">
   			 <div className="d-flex w-100 justify-content-between">
    		  <h5 className="mb-1">{this.props.itm.vname}</h5>
   			 </div>
   			 <p className="mb-1">{this.props.itm.listname}</p>

   			 <form style={{display:hide}} onSubmit={this.onSubmit}>
                    <div className="form-group">        
                        <input type="text" 
                               className="form-control" 
                               value={this.state.review}
                               onChange={this.onChangeRev}
                               />
                    </div>
                    <div className="form-group">        
                    <input type="Number" 
                    			min="1" max="5"
                               className="form-control" 
                               value={this.state.rating}
                               onChange={this.onChangeRat}
                               />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Review" className="btn btn-primary"/>
                    </div>
                    
              </form>
              

              <p style={{display:hide1}}>
              Review : {rev}
              <br/>
              Rating : {rat}
              </p>

        	
        </a>
        </div>
		);
  }
}