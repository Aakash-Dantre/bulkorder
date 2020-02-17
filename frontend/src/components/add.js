import React from 'react'
import axios from 'axios'
export default class Add extends React.Component{
	constructor(props){
		super(props)
		this.onChangeListname= this.onChangeListname.bind(this);
        this.onChangeDes = this.onChangeDes.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeAmount=this.onChangeAmount.bind(this);
        this.onChangePrice=this.onChangePrice.bind(this);
        this.onChangeImage=this.onChangeImage.bind(this);

        this.state={
        	vid:this.props.id,
          vname:this.props.name,
        	listname:"",
        	description:"",
        	amount:"",
        	price:"",
        	file:""
        }
	}
 	onChangeListname(event) {
        this.setState({ listname: event.target.value });
    }

    onChangeDes(event) {
        this.setState({ description: event.target.value });
    }
    onChangeAmount(event) {
        this.setState({ amount: event.target.value });
    }
    onChangePrice(event) {
        this.setState({ price: event.target.value });
    }
    onChangeImage(event){
    	this.setState({file: event.target.files[0]});
    }
    async onSubmit(e) {
        e.preventDefault();
        var flag=1
        if (this.state.file==""){
        	flag=0
        }  
        var  lid
        const List= this.state
        delete List.files
        await axios.post('http://localhost:4000/add', List)
                 .then(res => {
                   if(res.data.success==true){
                   		lid = res.data.listid
                      document.getElementById("AfterSubmit").innerHTML = "LIST ADDED";
                    
                   }
                   else{
                      document.getElementById("AfterSubmit").innerHTML = "LOGIN FIRST";
                   }
                 });

        console.log(lid)

        if(flag==1){
	        const formData= new FormData();
	        formData.append('file',this.state.file,lid)
	        console.log(formData)

	        axios.post('http://localhost:4000/image', formData)
                 .then(res => {
                   console.log(res)
                 });	
	     }          




    }
	render(){


		return(

  			<div>
             <form onSubmit={this.onSubmit}>
                    <div className="form-group">        
                        <label>Name of List </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.listname}
                               onChange={this.onChangeListname}
                               required
                               />
                    </div>
                    <div className="form-group">
                        <label>Des: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.description}
                               onChange={this.onChangeDes}
                               required

                               />  
                    </div>
                    <div className="form-group">
                        <label>Amount: </label>
                        <input type="number" 
                                min="1"
                               className="form-control" 
                               value={this.state.amount}
                               onChange={this.onChangeAmount}
                               required

                               />  
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input type="number" 
                                min="1"
                               className="form-control" 
                               value={this.state.price}
                               onChange={this.onChangePrice}
                               required
                               />  
                    </div>
          {/*          <div className="form-group">
                        <label>Image: </label>
                        <input type="file" 
                        		accept="image/*"
                               className="form-control" 
                               onChange={this.onChangeImage}

                               />  
                    </div>
                    */}
                    <div className="form-group">
                        <input type="submit" value="Submit List" className="btn btn-primary"/>
                    </div>
                    <div id ="AfterSubmit">

                    </div>
                </form>
                <div style={{height:'200px'}}></div>
            </div>

		)

	}
}