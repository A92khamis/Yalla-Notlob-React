import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Icon, Menu, Image, Dropdown, Segment, Label, Container } from 'semantic-ui-react'
import logo from '../public/images/otolb.png';
import user from '../public/images/person.jpeg';


export default class Header extends Component {
  state = { activeItem: 'home' }

  // handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    // const { activeItem } = this.state;
    return (
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='a' header>
            <Image
              size='mini'
              src={ logo }
              style={{ marginRight: '1.5em' }}
            />
            Yalla Notlob
          </Menu.Item>
          <Menu.Item as='a' href='/'>Home</Menu.Item>
          <Menu.Item as='a' href='#'>Orders</Menu.Item>
          <Menu.Item as='a' href='/myfriends'>Friends</Menu.Item>
          <Menu.Item as='a' href='/groups'>Groups</Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item as='a' name='Notification' onClick={this.handleItemClick}>
              <Icon name='bell' /><Label color='red' className="notifyLabel">3</Label>
            </Menu.Item>
            <Menu.Item as='a' name='profile' onClick={ this.handleItemClick }>
              <Image src={user} avatar />
              { console.log(this.props.user) }
              <span>{ this.props.user.name }</span>
            </Menu.Item>
            <Menu.Item as='a' name='Logout' onClick={ this.handleItemClick } />
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}