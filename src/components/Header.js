import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Icon, Menu, Image, Dropdown,Segment,Label } from 'semantic-ui-react'
import logo from '../public/images/otolb.png';
import user from '../public/images/person.jpeg';


export default class Header extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
   
        <Menu pointing secondary>
        <Menu.Item color='green'>Yalla Notlob <Image src={logo} avatar /></Menu.Item>
          <Menu.Item as={Link} to='/' name='Home' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item as={Link} to='/friends' name='Friends' active={activeItem === 'messages'} onClick={this.handleItemClick} />
          <Menu.Item as={Link} to='/groups' name='Groups' active={activeItem === 'friends'} onClick={this.handleItemClick} />
          <Menu.Item as={Link} to='/orders' name='Orders' active={activeItem === 'orders'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
          <Menu.Item name='Notification' active={activeItem === 'notify'} onClick={this.handleItemClick}>
          <Icon name='bell' /><Label color='red' className="notifyLabel">3</Label>
          </Menu.Item>
          <Menu.Item name='profile' active={activeItem === 'profile'} onClick={this.handleItemClick} >
          <Image src={user} avatar /><span>Username</span></Menu.Item>
          <Menu.Item as={Link} to='/login' name='Login' active={activeItem === 'login'} onClick={this.handleItemClick} />
          </Menu.Menu>

        </Menu>
    )
  }
}