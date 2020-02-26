import React,{Component} from 'react';
import {Link, Redirect} from "react-router-dom";


class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId: 0,
            password: "",
            allUsers: props.allUsers,
            reDirect: "",
            loggedIn: false
        }
    }
    checkLogin = (id, password) => {
        const user = this.state.allUsers.find(account => 
            account.id === id && account.password === password
        );

        if(user){
            return user;
        }else{
            return null;
        }
      }

    login = (event) =>{
        const user = this.checkLogin(this.state.userId, this.state.password);
        
        if (user != null){
            this.props.login(user);
        }else{

        }
        event.preventDefault();
    }

    inputChange = (event) => {
        const target = event.target;
        const inputName = target.name;
        const value = inputName === "userId" ? parseInt(target.value): target.value;

       this.setState({[inputName]: value});
    }

    render(){
        return (
            <div id="containerLogin" className="container mx-auto" >
                <form onSubmit={this.login}>
                    <div className="form-group">
                        <input name="userId" onChange={this.inputChange} type="number" placeholder="User ID"></input>
                    </div>
                    <div className="form-group">
                        <input name="password" onChange={this.inputChange} type="password" placeholder="Password"></input>
                    </div>
                    <div className="form-group">
                        <Link to="/register"><button type="button" className="btn btn-primary">Register</button></Link>
                        <button type="submit" className="btn btn-primary">Enter</button>
                    </div>
                    
                </form>
            </div>
        );
    }
    
}

export default Login;