import Header from '../components/Header';
import React, { Component } from 'react';
import './App.css';
import { Label,Divider, Grid, Input, Menu, Icon, Form ,Container} from 'semantic-ui-react'
import FriendsList from './friendsList.js';

class MyFriends extends Component {
  friend = '';
  state = {
    friend: '',
  }
  
  render() {
    return (
      <div>
        <Header user={ this.props.user } />
        <Container style={{ marginTop: '100px' }}>
        <div className="App" >
          <Grid columns={10}>
            {!this.props.group && <Menu compact>
              <Menu.Item id="label">
                <Icon name='users' /> friends
                </Menu.Item>
            </Menu> }
            <Grid.Row centered columns={2}>
                <label  id="label" to="">
                  your friend email:
                  </label>
                <Form onSubmit={this.handleAdd}>
                  <Form.Group>
                    <Form.Input icon='users' required placeholder='Email' name='email' iconPosition='left' onChange={this.doChange} />
                    <Form.Button content='add' primary />
                  </Form.Group>
                </Form>
            </Grid.Row>
          </Grid>
        </div>
            {!this.props.group && <Divider inverted>friendslist</Divider>}   
        <Grid.Row >
        {this.state.friend && <FriendsList friend={this.state.friend} />}
        </Grid.Row>
        </Container>
      </div>
    );
  }

  handleAdd= () => {
    console.log(this.friend);
    
    this.setState({friend: this.friend});
  }

  doChange =  (e, { name, value }) => this.friend = value;
}

export default MyFriends;
