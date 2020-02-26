import React,{Component} from 'react';

class Withdraw extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentUser: props.currentUser,
            withdrawAmount: 0
        }
    }

    inputChange = (amount) => {
        this.setState({withdrawAmount: parseInt(amount)});
    }

    submitBalanceChange = () => {
        if(this.state.withdrawAmount <= this.state.currentUser.balance){
            this.props.changeBalance(this.state.currentUser.id, this.state.withdrawAmount, "-");
        }
    }

    render(){

        
        return (
            <div id="containerWithdraw" className="container mx-auto">
                <div>Hello {this.state.currentUser.name}. Let's withdraw some money from your account.</div>
                <input type="number" onChange={(event) => this.inputChange(event.target.value)} placeholder="Withdraw amount"></input>
                <button onClick={() => this.submitBalanceChange()}>Submit</button>
            </div>

            
        );
    }
    
}

export default Withdraw;