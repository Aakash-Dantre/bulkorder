import React from 'react'
import axios from 'axios'
import RS from './runit'

export default class Track extends React.Component{
	constructor(props){
		super(props)
    this.state={}
  }

  componentDidMount() {
        axios.get('http://localhost:4000/getlist')
             .then(response => {
                 this.setState(response.data);
             })
             .catch(function(error) {
                 console.log(error);
             })

  }
	render(){
    var uid=this.props.id
    var uname=this.props.name
    var lol=this.state
    var lis=[]
    for (var i in lol){
      if(lol[i].state==1){ 
        var f=0
            for (var j in lol[i].buyers){
              if(lol[i].buyers[j].bid==uid){
                f=1
              }
            }
            if(f==1){
            
            lis.push(lol[i])
          }
        }
    }
        
  
   

    console.log(lis)
        const List = lis.map((item) => <RS itm={item} uid={uid}/>)   

		return(

      <div>
      
      {List}
      <div style={{height:"400px", width:"100%", clear:"both"}}>
     </div>
      </div>
		

    )

	}
}