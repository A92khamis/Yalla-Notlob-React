import React, { Component } from 'react';
import './App.css';
import { Label,Segment,Divider, Grid, Input, Menu, Icon, Form ,Container} from 'semantic-ui-react'
import AllGroups from './allGroups.js';
import Header from '../components/Header';
import GroupMembers from './groupMembers';
import axios from 'axios';

class Groups extends Component {
  state = {
    group: '',
    selectedGroup:''
  }
 
  





  render() {
    return (
      <div style={{ marginTop: '50px' }}>
        { console.log(this.props.user) }
        <Header user={ this.props.user } />
      <Container>
      <div className="App" >
        <Grid columns={2}>
          <Menu compact>
            <Menu.Item id="label">
              <Icon name='users' /> Groups
              </Menu.Item>
          </Menu>
          <Grid.Row centered columns={2}>
            <Grid.Column centered >
              <label verticalAlign='middle' id="label" to="">
                group:
                </label>
              <Form onSubmit={this.handelGroupAdd}>
                <Form.Group>
                  <Form.Input icon='users' required placeholder='Email' name='email' iconPosition='left' onChange={this.doGroupChange} />
                  <Form.Button content='add' primary />
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
        
      <Divider horizontal >groups list</Divider>   
      <Grid.Row centered columns={3}>
      <Grid.Column width={7}>
      <Segment >
      <Label color='red' ribbon> groups</Label>
      <Divider horizontal ></Divider> 

      <AllGroups group={this.state.group} onGroupChange={this.changeGroup} />

      </Segment>
      </Grid.Column >
      <Grid.Column width={8}>
      <Segment >
      <Label color='red' ribbon> group friends</Label>
      <Divider horizontal ></Divider>  

      <GroupMembers group={this.state.selectedGroup}/>

                  </Segment >
                </Grid.Column >
              </Grid.Row>
            </Grid>
          </div>
        </Container>
      </div>
    );
  }


  changeGroup= selectedGroup => this.setState({ selectedGroup });

  handelGroupAdd= () => {
    console.log(this.group);
    axios({
      method:'POST',
      url:"http://localhost:3000/groups/",
      headers:{"Content-Type":"application/json","Authorization":"Barear eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1MjMzODE3Nzh9.ls-rW2WOanWnahx5akD_6TsTaDxSCrYkrWmUQHS9ko8"},
      data:{        
          "group":{
              "groupName":this.group
          }
          
      }
    }).then((res)=>{
      this.setState({group: this.group});     
    });
    
   
  } ;
  doGroupChange =  (e, { name, value }) => this.group = value;
}

export default Groups;
