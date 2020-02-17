import React from 'react'
import axios from 'axios'
import TS from './tunit'

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
    var qn=[]
    for (var i in lol){
      var f=0
          for (var j in lol[i].buyers){
            if(lol[i].buyers[j].bid==uid){
              f=1
              qn.push(lol[i].buyers[j].qn)
            }
          }
          if(f==1){
          
          lis.push(lol[i])
        }
    }
        
  
   

    console.log(lis)
        const List = lis.map((item,index) => <TS itm={item} uid={uid} uname={uname} qna={qn[index]}/>)   

		return(

      <div>
      
      {List}
      <div style={{height:"400px", width:"100%", clear:"both"}}>
     </div>
      </div>
		

    )

	}
}