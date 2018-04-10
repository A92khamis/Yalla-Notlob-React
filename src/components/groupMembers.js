import React, { Component } from 'react';
import './App.css';
import { Label,Button,Card,Image,Divider, Grid, Input, Menu, Icon, Form ,Container} from 'semantic-ui-react'
import Header from '../components/Header';


class GroupMembers extends Component {
  friend = '';
  friends=[];
  state = {
    friend: '',
    friends:[],
    group:''
  }
  
  render() {
    return (
      <div>
        <Container>
        <div className="App" >
          <Grid columns={2}>
            <Grid.Row centered columns={2}>
                <Form onSubmit={this.handleAdd}>
                  <Form.Group>
                    <Label size='large' style={{ marginBottom: '10px' }} to="">your friend email:</Label>
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
      </div>
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
