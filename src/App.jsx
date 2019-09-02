import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { getItem, setItem, removeItem } from './utils/localStorage';

import Header from './sections/Header';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

class App extends Component {
  state = { isLoggedIn: false };

  componentDidMount() {
    const username = getItem('username');
    const isLoggedIn = username.length !== 0;

    this.setState({ isLoggedIn });
  }

  onLogout = e => {
    e.preventDefault();

    console.log('app/onLogout =-----> ' )

    if (removeItem('username')) {
      this.setState({ isLoggedIn: false });
    }
  }

  doLogin = (username) => {
    if (setItem('username', username)) {
      this.setState({ isLoggedIn: true });
    }
  };

  render() {
    const { isLoggedIn } = this.state;

    console.log('app/onLogout =----isLoggedIn-> ', isLoggedIn )

    return (
      <div className="app">
        <BrowserRouter history={createBrowserHistory()}>
          <Header isLoggedIn={isLoggedIn} onLogout={this.onLogout} />
          <section className="content">
            <Switch>
              <Route exact path="/login"><Login isLoggedIn={isLoggedIn} doLogin={this.doLogin} /></Route>
              <Route><Dashboard isLoggedIn={isLoggedIn} /></Route>
            </Switch>
          </section>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
