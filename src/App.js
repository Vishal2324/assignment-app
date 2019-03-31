import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Header from './container/header';
import Login from './container/login';
import Signup from './container/signup';
import UserList from './container/userList';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/" exact component={UserList} />
            <Route path="/login" component={Login} />
            <Route path="/signup/" component={Signup} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
