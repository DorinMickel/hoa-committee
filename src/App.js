import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import committeeMembersAccounts from './data/committeeMembersAccounts.json'
import MemberDashboard from './pages/MemberDashboard';
import MemberNavbar from './components/MemberNavbar';


class App extends React.Component {
  constructor(props){
    super(props);

    let membersData=[];
    if(localStorage.localMembers){
      membersData = JSON.parse(localStorage.localMembers)
    }
    else {
      membersData = committeeMembersAccounts
    }

    this.state = {
      allMembers: membersData,
      activeMember: null
    }
  }
  addMember = (newMember) => {
    const localMemberString = JSON.stringify(this.state.allMembers.concat(newMember))
    localStorage.localMembers = localMemberString
    this.setState({
      allMembers: this.state.allMembers.concat(newMember),
      activeMember: newMember
    })
  }
  
  render(){
    
    
    return (
      <HashRouter>
        <Route exact path="/">
          <Homepage></Homepage>
        </Route>
        <Route exact path="/signup">
          <Signup 
          addMember={this.addMember}
          />
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path={["/member-dashboard"]}>
          <MemberNavbar/>
        </Route>
        <Route exact path="/member-dashboard">
          <MemberDashboard
          activeMember={this.state.activeMember}
          />
        </Route>
      </HashRouter>
    );
  }
}

export default App;
