import React,{Component} from 'react';
import {Link, Redirect} from "react-router-dom";

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            fullName: "",
            password: "",
            repeatPassword: "",
            depositAmount: 0,
            reDirect: null
        }
    }

    inputChange = (event) => {
        const target = event.target;
        const inputName = target.name;
        const value = target.value;

       this.setState({[inputName]: value});
    }

    checkPassword = (pass,pass2) =>{
        const isValid = pass.length > 8 && pass === pass2 ? true : false;
        return isValid;
    }


    register = (event) =>{
        event.preventDefault();
        if (this.checkPassword(this.state.password, this.state.repeatPassword)){
            this.props.newUser(this.state.fullName, parseInt(this.state.depositAmount), this.state.password);
            this.setState({reDirect: "/"});
        }
    }

    render() {

        if(this.state.reDirect){
            return <Redirect to={this.state.reDirect} />
        }
        return (
            
            <div id="containerRegister" className="container mx-auto" >
                <form onSubmit={this.register}>
                    <div className="form-group">
                        <input name="fullName" type="text" placeholder="Full name!" onChange={this.inputChange}></input>
                    </div>
                    <div className="form-group">
                        <input name="password" type="password" placeholder="Password" onChange={this.inputChange}></input>
                        <small id="passwordHelpBlock" className="form-text text-muted">Password must be at least 8 chararacters long.</small>
                        <input name="repeatPassword" type="password" placeholder="Repeat password" onChange={this.inputChange}></input> 
                    </div>
                    <div className="form-group">
                        <input name="depositAmount" type="number" placeholder="Initial cash deposit" onChange={this.inputChange}></input>
                    </div>
                    <div className="form-group">
                        <Link to="/"><button type="button" className="btn btn-secondary">Cancel</button></Link>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                    
                </form>
            </div>
        );
    }
    
}

export default Register;