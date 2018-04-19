import React, { Component } from 'react';
import { Label, Card, Segment, Divider, Grid,
  Header, Input, Menu, Icon, Form, Container } from 'semantic-ui-react'
import Cookies from 'universal-cookie';
import axios from 'axios';
import AppHeader from '../components/Header';
import AllGroups from './allGroups.js';
import GroupMembers from './groupMembers';
import './App.css';

class Groups extends Component {
  group = '';
  state = {
    group: '',
    selectedGroup: {}
  }

  render() {
    return (
      <div style={{ marginTop: '50px' }}>
        <AppHeader user={ this.props.user } />
        <Grid style={{ margin: '50px 50px'}}>
          <Grid.Column width={10}>
            <Card raised fluid>
              <Card.Content style={{ background: '#05396B' }}>
                <Header as='h1' style={{ color: '#FFDE00' }}>
                  <span><Icon size='small' name='users' /></span>
                  { this.state.selectedGroup.name }
                </Header>
              </Card.Content>
              {/*list friends in the group as well as adding new ones to the group*/}
              { this.state.selectedGroup.id && <GroupMembers group={ this.state.selectedGroup } /> }
            </Card>
          </Grid.Column>
          <Grid.Column width={6}>
            <Card raised fluid>
              <Card.Content style={{ background: '#05396B' }}>
                <Header as='h3' style={{ color: '#FFDE00' }}>
                  <span><Icon size='small' name='add user' /></span>Groups
                </Header>
              </Card.Content>
              <Card.Content>
                <Form onSubmit={ this.handelGroupAdd }>
                  <Segment basic>
                    <Form.Input icon='at'
                      placeholder='Email'
                      name='email' iconPosition='left'
                      onChange={ this.doGroupChange }
                      fluid
                      required />
                    <Form.Button icon='add' content='add' fluid color='grey' />
                  </Segment>
                </Form>
              </Card.Content>
              <AllGroups group={ this.state.group } onGroupChange={ this.changeGroup } />
            </Card>
          </Grid.Column>
        </Grid>
      </div>
    );
  }

  changeGroup = selectedGroup => { this.setState({ selectedGroup: selectedGroup }) }

  handelGroupAdd = () => {
    const cookies = new Cookies();
    console.log(this.group);
    axios({
      method:'POST',
      url:"http://localhost:3000/groups/",
      headers: { "Content-Type": "application/json",
        Authorization: cookies.get("access_token") },
      data: {
        "group": {
          "groupName": this.group
        }
      }
    }).then((res) => {
      this.setState({ group: this.group });
    });
  }

  doGroupChange = (e, { name, value }) => this.group = value;
}

export default Groups;
