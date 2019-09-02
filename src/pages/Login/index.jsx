import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';

import { isEmailValid } from '../../utils/form';

class Login extends PureComponent {
  state = { formErrors: [] };

  componentDidMount() { }

  onSubmit = e => {
    e.preventDefault();

    try {
      const username = e.currentTarget.username.value;
      const password = e.currentTarget.password.value;
      const formErrors = [];

      if (!isEmailValid(username)) {
        formErrors.push({ id: 'username', msg: 'Invalid mail id.' });
      }

      if (password.length <= 6) {
        formErrors.push({ id: 'password', msg: 'Password should contain at least 6 chars.' });
      }

      this.setState({ formErrors }, () => {
        if (formErrors.length === 0) this.props.doLogin(username);
      });
    } catch (err) {
      // Log err
      console.log('e =-----> ', err);
    }
  }

  renderErrorElm = () => {
    const { formErrors } = this.state;

    if (formErrors.length === 0) return null;

    return (
      <div className="error-container">
        {formErrors.map(err => (<div className="error-item" key={err.id}>{err.msg}</div>))}
      </div>
    );
  }

  render() {
    if (this.props.isLoggedIn) return (<Redirect to="/" />);

    return (
      <form className="login-form" onSubmit={this.onSubmit}>
        <div>Login</div>
        <br />
        <section className="mt--s">
          <label>Username</label><br />
          <input className="p--xs" name="username" type="text" placeholder="Please enter your username." />
        </section>
        <section className="mt--s">
          <label>Password</label><br />
          <input className="p--xs" name="password" type="password" placeholder="Please enter your password." />
        </section>
        <br />
        <button type="submit">Log In</button>

        {this.renderErrorElm()}
      </form>
    );
  }
}

export default Login;
