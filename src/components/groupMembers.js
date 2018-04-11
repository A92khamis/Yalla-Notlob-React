import React, { Component } from 'react';
import './App.css';
import { Label,Button,Card,Image,Divider, Grid, Input, Menu, Icon, Form ,Container} from 'semantic-ui-react'
import Header from '../components/Header';

import axios from 'axios';
import Cookies from 'universal-cookie';

class GroupMembers extends Component {
  friend = '';
  friends=[];
  state = {
    friend: '',
    friends:[],
    group:''
  }

  componentDidMount(){
    this.feachFriends();
  }

  feachFriends(group) {
    const cookies = new Cookies();       
        console.log(group);
        
    axios({
        method:'GET',
        url:`http://localhost:3000/groups/members?group_id=${group ||this.state.group}`,
        headers:{"Content-Type":"application/json",
        "Authorization":`Barear ${cookies.get("access_token")}`},
      }).then((res)=>{
          console.log(res);
          if(res.data.length >= 0){
        this.setState({
          group: group,
          friends: res.data});   
          }   
      });
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
                          {this.state.friends.map( friend => 
                              <Grid.Column width={4}>
                          <Card.Group >
                              <Card>
                                  <Card.Content>
                                      <Image floated='right' size='mini' src='logo' />
                                      <Card.Header>
                                          {friend.id}
                                      </Card.Header>
                                      <Card.Meta>
                                          Friends of Elliot
                                  </Card.Meta>
                                      <Card.Description>
                                      </Card.Description>
                                  </Card.Content>
                                  <Card.Content extra>
                                      <div className='ui one buttons'>
                                          <Button basic color='red' id={friend.user_id} onClick={this.doRemove} >Remove</Button>
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
    console.log(nextProps);
    this.feachFriends(nextProps.group);
}  

  handleAdd= () => {
    console.log(this.friend);
    

    const cookies = new Cookies();       
    console.log(this.state.group);
    axios({
      method:'POST',
      url:"http://localhost:3000/groups/add",
      headers:{"Content-Type":"application/json","Authorization":`Barear ${cookies.get("access_token")}`},
      data:{        
        "group":{
                
          "group_id":this.state.group,
          "email":this.friend
      }
          
      }
    }).then((res)=>{
     console.log(res);
      this.feachFriends(null); 
    });
  } ;
  doChange =  (e, { name, value }) => this.friend = value;


  doRemove = (e) => { 
    console.log(e.target.id);
    
    // axios({
    //   method:'DELETE',
    //   url:"http://localhost:3000/groups/add",
    //   headers:{"Content-Type":"application/json","Authorization":`Barear ${cookies.get("access_token")}`},
    //   data:{        
    //     "group":{
                
    //       "group_id":this.state.group,
    //       "user_id":3
    //   }
          
    //   }
    // }).then((res)=>{
    //  console.log(res);
    //   this.feachFriends(null); 
    // });
  }

}

export default GroupMembers;
