import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Icon, Menu, Image, Dropdown, Segment, Label, Container } from 'semantic-ui-react'
import logo from '../public/images/otolb.png';
import user from '../public/images/person.jpeg';
import Cookies from 'universal-cookie';


export default class Header extends Component {
  state = { activeItem: 'home' }

  // handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleLogOut = (e) => {
    const cookies = new Cookies();
    cookies.remove('access_token');
    window.location = '/';
  }

  render() {
    // const { activeItem } = this.state;
    return (
      <Menu fixed='top' style={{ background: '#05396B' }}>
        <Container>
          <Menu.Item as='a' href='/' header>
            <Image
              size='mini'
              src={ logo }
              style={{ marginRight: '1.5em' }}
            />
            <span style={{ fontSize: '30px', color: '#FFDE00' }}>Yalla Notlob</span>
          </Menu.Item>
          <Menu.Item as='a' style={{ color: 'white' }} href='/'>Home</Menu.Item>
          <Menu.Item as='a' style={{ color: 'white' }} href='/orders'>Orders</Menu.Item>
          <Menu.Item as='a' style={{ color: 'white' }} href='/myfriends'>Friends</Menu.Item>
          <Menu.Item as='a' style={{ color: 'white' }} href='/groups'>Groups</Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item as='a' name='Notification' onClick={this.handleItemClick}>
              <Icon name='bell' style={{ marginRight: 0, color: '#FFDE00' }} /><Label style={{ marginLeft: 5 }} className="notifyLabel">3</Label>
            </Menu.Item>
            <Menu.Item as='a' style={{ color: 'white' }} name='profile' onClick={ this.handleItemClick }>
              <Image src={user} avatar />
              <span style={{ marginLeft: 5 }}>{ this.props.user.name }</span>
            </Menu.Item>
            <Menu.Item as='a' style={{ color: 'white' }} name='Logout' onClick={ this.handleLogOut } />
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}