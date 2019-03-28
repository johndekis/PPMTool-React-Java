import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode'

import Landing from './components/layout/Landing'
import Register from './components/userManagement/Register';
import Login from './components/userManagement/Login';

import Dashboard from './components/Dashboard';
import Header from './components/layout/Header';
import AddProject from './components/project/AddProject';
import UpdateProject from './components/project/UpdateProject';
import ProjectBoard from './components/projectBoard/ProjectBoard';
import AddProjectTask from './components/projectBoard/projectTasks/AddProjectTask';
import UpdateProjectTask from './components/projectBoard/projectTasks/UpdateProjectTask';

import store from './store';

import SecureRoute from './securityUtils/SecureRoute'
import setJWTToken from './securityUtils/setJWTToken'
import { logout } from './actions/securityActions'
import { SET_CURRENT_USER } from './actions/types';


import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

const jwtToken = localStorage.jwtToken;

if(jwtToken){
  setJWTToken(jwtToken)
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  })

  const currentTime = Date.now() / 1000;
   if(decoded_jwtToken.exp < currentTime) {
      store.dispatch(logout())  
       window.location.href = "/";
   }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
          <Header />
          { 
            // public routes 
          }
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />  
          {
            // private routes
          }  
            <Switch>
              <SecureRoute exact path="/dashboard" component={Dashboard} />
              <SecureRoute exact path="/addProject" component={AddProject} />
              <SecureRoute exact path="/updateProject/:id" component={UpdateProject} />
              <SecureRoute exact path="/projectBoard/:id" component={ProjectBoard} />
              <SecureRoute exact path="/addProjectTask/:id" component={AddProjectTask} />
              <SecureRoute exact path="/updateProjectTask/:backlog_id/:pt_id" component={UpdateProjectTask} />
            </Switch>
          </div>
        </Router>
      </Provider>
      );
  }
}

export default App;