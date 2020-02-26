import React,{Component} from 'react';


class Deposit extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentUser: props.currentUser,
            depositAmount: 0
        }
    }

    inputChange = (amount) => {
        this.setState({depositAmount: parseInt(amount)});
    }

    submitBalanceChange = () => {
        if(this.state.depositAmount >= 10){
            this.props.changeBalance(this.state.currentUser.id, this.state.depositAmount, "+");
            console.log("deposited");
        }
        
    }

    render(){
        
        return (
            <div id="containerDeposit" className="container mx-auto">
                <div>Hello {this.state.currentUser.name}. Let's deposit some money into your account.</div>
                <input type="number" onChange={(event) => this.inputChange(event.target.value)} placeholder="Deposit amount"></input>
                <button onClick={() => this.submitBalanceChange()}>Submit</button>
                <small id="depositHelpBlock" className="form-text text-muted">Deposit amount must at least 10€</small>
            </div>
        );
    }
    
}

export default Deposit;