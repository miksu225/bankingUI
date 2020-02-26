import React,{Component} from 'react';

class Requests extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentUser: props.currentUser,
            allRequests: props.allRequests,
            pleadAmount: 0,
            fromId: 0,
            reDirect: null
        }
    }

    inputChange = (amount,name) => {
        this.setState({[name]: parseInt(amount)});
    }

    getRequestElement = (request) => {
        let requestElement = "";
        const arrowLeft = "<---";
        const arrowRight = "--->";
        if(request.from === this.state.currentUser.id){
            requestElement =
            <div key={request.id} className="request">
                <label>{this.state.currentUser.name}</label> <label className="arrow">{arrowRight}</label>
                <label>{request.amount}</label> <label className="arrow">{arrowRight}</label>
                <label>To ID {request.to}</label>
                <button onClick={() => this.props.handleRequest(request.id)}>Accept</button>
            </div>
        }
        else if (request.to === this.state.currentUser.id){
            requestElement =
            <div key={request.id} className="request">
                <label>{this.state.currentUser.name}</label> <label className="arrow">{arrowLeft}</label>
                <label>{request.amount}</label> <label className="arrow">{arrowLeft}</label>
                <label>From ID {request.from}</label>
                <button  disabled> Request pending</button>
            </div>
        }

        return requestElement;
    }

    render(){

        const shownRequests = this.state.allRequests.map(this.getRequestElement);
        
        return (
            <div id="containerRequests" className="container mx-auto">
                <div>Hello {this.state.currentUser.name}. Let's plead for some funds!</div>
                <input name="pleadAmount" type="number" onChange={(event) => this.inputChange(event.target.value,event.target.name)} placeholder="Plead amount"></input>
                <input name="fromId" type="number" onChange={(event) => this.inputChange(event.target.value,event.target.name)} placeholder="Fund id"></input>
                <button onClick={() => this.props.newRequest(this.state.pleadAmount,this.state.fromId)}>Submit</button>

                <div>Here's all your pending requests!</div>
                {shownRequests}
            </div>
        );
    }
    
}

export default Requests;