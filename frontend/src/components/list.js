import React from 'react'
import axios from 'axios'
import Unit from './unitlist'
import Showrating from './showrating'

export default class List extends React.Component{
	constructor(props){
		super(props) 
		this.state={}

	}

	componentDidMount() {

        axios.post('http://localhost:4000/listv',{id:this.props.id})
             .then(res => {
                 this.setState(res.data)
             })
             .catch(function(error) {
                 console.log(error);
             })


    }
 
	render(){
		var lol=this.state
		var lis=[]
		// const List
		var List
		if(this.props.type=="all"){
			for (var i in lol){
				if(lol[i].state==0 && lol[i].amount!=lol[i].buyed){
					lis.push(lol[i])

				}
			}
	        List=lis.map(item => <Unit itm={item} type={this.props.type}/>)   
		}
		else if(this.props.type=="rate"){
			for (var i in lol){
				if(lol[i].state==1){
					console.log("ldkfslk")
					lis.push(lol[i])
				}
			}
	        List=lis.map(item => <Showrating itm={item}/>)   
		}
		else{
			for (var i in lol){
				if(lol[i].state==0 && lol[i].amount==lol[i].buyed){
					console.log("ldkfslk")
					lis.push(lol[i])
				}
			}
	        List=lis.map(item => <Unit itm={item} type={this.props.type}/>)   
		}
			
	   
		return(

  		<div>
  		{List}
        </div>
		);
  }
}