import React, { Component } from 'react';
import './App.css';
import { Label,Segment,Divider, Grid, Input, Menu, Icon, Form ,Container} from 'semantic-ui-react'
import AllGroups from './allGroups.js';
import Header from '../components/Header';
import GroupMembers from './groupMembers';
import axios from 'axios';
import Cookies from 'universal-cookie';

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


  changeGroup= selectedGroup => {this.setState({ selectedGroup:selectedGroup })
console.log(`ahooooooooooooo${this.state.selectedGroup}`);
};

  handelGroupAdd= () => {
    const cookies = new Cookies();       
    console.log(this.group);
    axios({
      method:'POST',
      url:"http://localhost:3000/groups/",
      headers:{"Content-Type":"application/json","Authorization":`Barear ${cookies.get("access_token")}`},
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
