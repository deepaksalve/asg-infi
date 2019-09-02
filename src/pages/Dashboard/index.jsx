import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';

class Dashboard extends PureComponent {
  componentDidMount() { }

  onSubmit = () => {}

  render() {
    console.log('Dashboard =-----> ', this.props.isLoggedIn);

    if (this.props.isLoggedIn) {
      return (
        <div>Dashboard</div>
      );
    }

    return (<Redirect to="/login" />);
  }
}

export default Dashboard;
