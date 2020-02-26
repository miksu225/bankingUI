import React,{Component} from 'react';
import {Link, Redirect} from "react-router-dom";

class Navigation extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentUser: props.currentUser
        }
    }

    
    render(){

        
        return (
            <div className="container topRow">
                <div className="row">
                    <div className="col-md-auto">
                        <Link to="/"><button className="btn btn-primary btn-lg btn-block">Deposit</button></Link>
                    </div>
                    <div className="col-md-auto">
                        <Link to="/withdraw"><button className="btn btn-primary btn-lg btn-block" >Withdraw</button></Link>
                    </div>
                    <div className="col-md-auto">
                        <Link to="/requests"><button className="btn btn-primary btn-lg btn-block">Fund requests</button></Link>
                    </div>
                    <div id="currencyDiv" className="col-lg-2 offset-lg-3">
                        <p>Total currency: {this.state.currentUser.balance}</p>
                    </div>

                    <div className="col-md-auto">
                        <button onClick={() => this.props.logout()}>Log out</button>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default Navigation;