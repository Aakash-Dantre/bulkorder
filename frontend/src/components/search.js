import React from 'react'
import axios from 'axios'
import US from './sunit'

export default class Search extends React.Component{
	constructor(props){
		super(props)
    this.state={
      t:0,
      search:""
    }
    this.displayRadioValue=this.displayRadioValue.bind(this);
    this.onChangeSearch=this.onChangeSearch.bind(this);

   }

  componentDidMount() {
        axios.get('http://localhost:4000/getlist')
             .then(response => {
                  var x=this.state.t
                  var y=this.state.search
                  var fol={ x,y}
                  var lol=response.data
                  lol=lol.concat(fol)

                 this.setState(lol);
             })
             .catch(function(error) {
                 console.log(error);
             })

  }
  displayRadioValue(){
    var ele = document.getElementsByName('sort'); 
              
            for(var i = 0; i < ele.length; i++) { 
                if(ele[i].checked)
                {
                  this.setState({t:ele[i].value})
                } 
            }
           console.log(this.state.t) 
  }
  onChangeSearch(event){
        this.setState({ search: event.target.value });

  }


	render(){
    var uid=this.props.id
    var uname=this.props.name
    var lol=this.state
    var lis=[]
    // var t=this.state.sort;
    // remove element from searhch
   

    if(this.state.t==0){         // left
      for (var i in lol){
        if(this.state.search==""||this.state.search==lol[i].listname){
            var f=0
            if(lol[i].amount!=lol[i].buyed){
             
            if(lol[i].state==0){
              for (var j in lol[i].buyers){
                if(lol[i].buyers[j].bid==uid){
                  f=1
                }
              }
              if(f==0){
              var s=lol[i].amount - lol[i].buyed
              var l=[s,lol[i]]
              lis.push(l)
            }
            }
            
          }
        }
    }
    }
    if(this.state.t==1){  //price
      for (var i in lol){
        if(this.state.search==""||this.state.search==lol[i].listname){

        if(lol[i].amount!=lol[i].buyed)
        {
        // console.log(lol[i])
        var f =0
        if(lol[i].state==0){
        
          for (var j in lol[i].buyers){
            if(lol[i].buyers[j].bid==uid){
              f=1
            }
          }
          if(f==0){
            // console.log(lol[i])
            var s=lol[i].price/lol[i].amount
           var l=[s,lol[i]]
            lis.push(l)
          }

        }
      }
    }
    }
    }
    if(this.state.t==2){  //rating
      if(lol[i].amount!=lol[i].buyed)
        {
      for (var i in lol){
        var f=0
        if(lol[i].state==0){
        for (var j in lol[i].buyers){
            if(lol[i].buyers[j].bid==uid){
              f=1
            }
          }
          if(f==0){
          var l=[s,lol[i]]
          lis.push(l)
        }
         } 
      }
    }
    }

    lis = lis.sort(function(a,b) {
    return a[0] - b[0];
});
  var li=[]
  for (var i=0;i<lis.length;i++){
    li.push(lis[i][1])
  }
    // console.log(li)
        const List = li.map(item => <US itm={item} uid={uid} uname={uname}/>)   

		return(

      <div>
    
   <input type="radio" id="male" name="sort" value="0"/>
  <label for="male">least left</label><br/>
  <input type="radio" id="female" name="sort" value="1"/>
  <label for="female">Least price</label><br/>
  <input type="radio" id="other" name="sort" value="1"/>
  <label for="other">rating</label>
      <button type="button" onClick={this.displayRadioValue}> 
        Sort
    </button> 
   <label>Search: </label>
  <input type="text" 
         value={this.state.search}
         onChange={this.onChangeSearch}
         /> 
           
      {List}

       <div style={{height:"400px", width:"100%", clear:"both"}}>
     </div>
      </div>


		

    )

	}
}