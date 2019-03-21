import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Dashboard from './components/Dashboard';
import Header from './components/layout/Header';
import AddProject from './components/project/AddProject';
import store from './store'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
          <Header />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/addProject" component={AddProject} />
          </div>
        </Router>
      </Provider>
      );
  }
}

export default App;