import React from "react"
import axios from "axios"

export default class  LoginTemplate extends React.Component {

	constructor(props){
		super(props)

		 this.state = {
            username: '',
            email: '',
            password:''
        }
   		this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);

	}

    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }
	onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            email: this.state.email,
           	password: this.state.password
        }
        if(this.props.mode=="register")
	        if (this.props.user=="user")
	        {
		        axios.post('http://localhost:4000/adduser', newUser)
		             .then(res => console.log(res.data));
		    }
		    else
		    {
	   			axios.post('http://localhost:4000/addvendor', newUser)
		             .then(res => console.log(res.data));
		    }    
		else{
			if (this.props.user=="user")
	        {
		        axios.post('http://localhost:4000/checkuser', newUser)
		             .then(res => console.log(res.data));
		    }
		    else
		    {
	   			axios.post('http://localhost:4000/checkvendor', newUser)
		             .then(res => console.log(res.data));
		    }    
		}
        this.setState({
            username: '',
            email: '',
            password: ''
        });
    }
	render(){
		var hide=""
		if(this.props.mode=="login")hide="none"

 		return(
  			<div>
                <form onSubmit={this.onSubmit}>
                    <div style={{display:hide}} className="form-group">        {/*hidding for login*/}
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}

                               />  
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />  
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
		);
	}
}



