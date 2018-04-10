import React from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { AppRouter, SignRouter } from './router/AppRouter';
import Login from './components/Login';
import Register from './components/Register';
import Cookies from 'universal-cookie';
// import logo from '../public/images/otolb.png';

class App extends React.Component {

  constructor(props) {
    super(props);
    let user = this.authenticate();
    this.state = {
      user
    }
    // console.log('user', this.state.user);
  }

  authenticate() {
    let xhr = new XMLHttpRequest();
    const cookies = new Cookies();
    xhr.open('GET', 'http://localhost:3000/users/auth', false); // to put the route of registration
    xhr.setRequestHeader('Authorization', cookies.get('access_token'))
    xhr.send();
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      try {
        let responseObj = JSON.parse(xhr.responseText);
        let user = {
          name: responseObj.name,
          email: responseObj.email
        }
        return user;
      } catch (e) {}
    } else {
      let user = { name: '', email: '' };
      return user;
    }
  }

  render() {
    return (
      <div>
        { this.state.user.name ? <AppRouter user={ this.state.user } /> : <SignRouter /> }
      </div>
    );
  }
}

export default App;
