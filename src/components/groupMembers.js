import React, { Component } from 'react';
import './App.css';
import { Label,Button,Card,Image,Divider, Grid, Input, Menu, Icon, Form ,Container} from 'semantic-ui-react'

import axios from 'axios';

class GroupMembers extends Component {
  friend = '';
  friends=[];
  state = {
    friend: '',
    friends:[],
    group:''
  }
  feachFriends() {
        
    axios({
        method:'GET',
        url:"http://localhost:3000/friends/",
        headers:{"Content-Type":"application/json",
        "Authorization":"Barear eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1MjMzNzQyOTN9.ZPkkm9epaaTcBQPtJPiX6V2ydA9-pdbGd26-T86jWcA"},
      }).then((res)=>{
          console.log(res);
        this.setState({friends:res.data});      
      });
}
  
  render() {
    return (
      <Container>
      <div className="App" >
        <Grid columns={2}>
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
      <Grid.Row >
                <div className="friends" >
                    <Grid>
                        {this.friends.map( friend => 
                            <Grid.Column width={4}>
                        <Card.Group >
                            <Card>
                                <Card.Content>
                                    <Image floated='right' size='mini' src='logo' />
                                    <Card.Header>
                                        {friend}
                                    </Card.Header>
                                    <Card.Meta>
                                        Friends of Elliot
                                </Card.Meta>
                                    <Card.Description>
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <div className='ui one buttons'>
                                        <Button basic color='red'>Unfriend</Button>
                                    </div>
                                </Card.Content>
                            </Card>
                        </Card.Group>
                        </Grid.Column>
                        )}
                        </Grid>
                </div>
                
      </Grid.Row>
      </Container>
    );

  }


  componentWillReceiveProps=( nextProps )=>{
    
}  

  handleAdd= () => {
    console.log(this.friend);
    this.friends.push(this.friend);
    this.setState({friend: this.friend , friends: this.friends});
  } ;
  doChange =  (e, { name, value }) => this.friend = value;
}

export default GroupMembers;
