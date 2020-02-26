import React, {Component} from 'react';
import Login from './components/login';
import Deposit from './components/deposit';
import Register from './components/register';
import Withdraw from './components/withdraw';
import Requests from './components/requests';
import Navigation from './components/navigation';
import { Switch, Route, Redirect} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import './bankingStyles.css';

class Account {
  constructor(name_,id_,balance_,password_){
    this.id = id_;
    this.name = name_;
    this.balance = balance_;
    this.password = password_;
  }
}

class Request {
  constructor(id_,from_,to_,amount_){
    this.id = id_;
    this.from = from_;
    this.to = to_;
    this.amount = amount_;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
     allUsers: [new Account("mikko",1,20,"qwe"),new Account("hilleri",2,1000,"asd")],
     currentUser: {},
     allRequests: [new Request(1,1,2,20),new Request(2,1,2,30),new Request(3,2,1,40),new Request(4,1,2,50)]
    }
  }

  setCurrentUser = (id) => {
    const account = this.state.allUsers.find(account => account.id === id);

    this.setState({currentUser: account});
  }

  addNewUser = (name, deposit, password) => {
    const id = this.state.allUsers.length + 1;
    const newUser = new Account(name, id, deposit, password);
    const newUsersArray = this.state.allUsers.concat(newUser);
    this.setState({allUsers: newUsersArray});
  }

  login = (user) => {
    this.setState({loggedIn: true, currentUser: user});
  }

  logout = () => {
    this.setState({loggedIn: false, currentUser: {}});
  }

  changeBalance = (id,amount, operation) => {
    const accounts = this.state.allUsers;
    const account = this.state.allUsers.find(account => account.id === id);
    if(!(operation === "-" && account.balance < amount)){
      if (operation === "+"){
        account.balance = account.balance + amount;
      }
      else{
        account.balance = account.balance - amount;
      }
      this.setState({allUsers: accounts});

      return true;
    }
    return false;
}

  handleRequest = (id) => {
    const requests = this.state.allRequests;
    const request = requests.find(request => request.id === id);
    const haveBalance = this.changeBalance(request.from, request.amount, "-");
    this.changeBalance(request.to, request.amount, "+");

    if (haveBalance){
      this.removeRequest(id);
    }

}

  newRequest = (amount,fromId) => {
    if (fromId !== this.state.currentUser.id){
      const newId = this.state.allRequests.length + 1;
      const newRequest = new Request(newId, fromId, this.state.currentUser.id, amount);
      const requests = this.state.allRequests;
      requests.push(newRequest);
      this.setState({allRequests: requests});
    }
    
  }

  removeRequest = (id) => {
    const requests = this.state.allRequests;
    const requestIndex = requests.findIndex((request, index) => request.id === id);
    requests.splice(requestIndex,1);
    this.setState({allRequests: requests});
  }

  
  render(){
    let shownElements = {};
    let showNavigation = "";

    if (this.state.loggedIn){
      showNavigation = <Navigation logout={this.logout} currentUser={this.state.currentUser}/>
      shownElements = <Switch>
          <Route exact path='/'><Deposit changeBalance={this.changeBalance} currentUser={this.state.currentUser}/></Route>
          <Route path='/withdraw'><Withdraw changeBalance={this.changeBalance} currentUser={this.state.currentUser}/></Route>
          <Route path='/requests'><Requests newRequest={this.newRequest} handleRequest={this.handleRequest} allRequests={this.state.allRequests} currentUser={this.state.currentUser}/></Route>
        </Switch>
    }else{
      shownElements = <Switch>
        <Route exact path='/'><Login allUsers={this.state.allUsers} login={this.login}/></Route>
        <Route path='/register'><Register newUser={this.addNewUser}/></Route>
      </Switch>
      
    }
    
    return (
      <div className="container">
        {showNavigation}
        {shownElements}
      </div>
    );
  }
  
}

export default App;
