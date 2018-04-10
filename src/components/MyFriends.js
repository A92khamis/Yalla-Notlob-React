import React, { Component } from 'react';
import './App.css';
import { Label,Divider, Grid, Input, Menu, Icon, Form ,Container} from 'semantic-ui-react'
import FriendsList from './friendsList.js';
import axios from 'axios';
class MyFriends extends Component {
  friend = '';
  state = {
    friend: '',
  }
  componentDidMount() {

  }
  render() {
    return (
      <Container>
      <div className="App" >
        <Grid columns={10}>
          <Menu compact>
            <Menu.Item id="label">
              <Icon name='users' /> friends
              </Menu.Item>
          </Menu> 
          <Grid.Row centered columns={2}>
          <Grid.Column centered >
              <label  id="label" to="">
                your friend email:
                </label>
              <Form onSubmit={this.handleAdd}>
                <Form.Group>
                  <Form.Input icon='users' required placeholder='Email' name='email' iconPosition='left' onChange={this.doChange} />
                  <Form.Button content='add' primary />
                </Form.Group>
              </Form>
              </Grid.Column >
          </Grid.Row>
        </Grid>
      </div>
          {!this.props.group && <Divider horizontal >friends list</Divider>}   
      <Grid.Row >
      <FriendsList friend={this.state.friend} />
      </Grid.Row>
      </Container>
    );
  }

  handleAdd= () => {
    console.log(this.friend);

    axios({
      method:'POST',
      url:"http://localhost:3000/friends/",
      headers:{"Content-Type":"application/json","Authorization":"Barear eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1MjMzNzQyOTN9.ZPkkm9epaaTcBQPtJPiX6V2ydA9-pdbGd26-T86jWcA"},
      data:{
        
          "friend":{
          "friend_id": this.friend
            }
          
      }
    }).then((res)=>{
    this.setState({friend: res});        
      
    });
  } ;
  doChange =  (e, { name, value }) => this.friend = value;
}

export default MyFriends;
