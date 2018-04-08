import React, { Component } from 'react';
import './App.css';
import { Label,Segment,Divider, Grid, Input, Menu, Icon, Form ,Container} from 'semantic-ui-react'
import AllGroups from './allGroups.js';
import GroupMembers from './groupMembers';
class Groups extends Component {
  group = '';
  selected = '';
  state = {
    group: '',
  }
  
  render() {
    return (
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

      <AllGroups group={this.state.group} />

      </Segment>
      </Grid.Column >
      <Grid.Column width={8}>
      <Segment >
      <Label color='red' ribbon> group friends</Label>
      <Divider horizontal ></Divider>  

      <GroupMembers group="0"/>

      </Segment >
      </Grid.Column >
      </Grid.Row>
      </Grid>
      </div>
      </Container>
    );
  }

  handelGroupAdd= () => {
    console.log(this.group);
    
    this.setState({group: this.group});
  } ;
  doGroupChange =  (e, { name, value }) => this.group = value;
}

export default Groups;
