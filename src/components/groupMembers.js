import React, { Component } from 'react';
import { Label, Button, Card, Image, Divider, Grid, Input,
  Segment, Menu, Icon, Form, Container, Header } from 'semantic-ui-react'
import axios from 'axios';
import Cookies from 'universal-cookie';
import './App.css';

class GroupMembers extends Component {
  friend = '';
  friends=[];
  state = {
    friend: '',
    friends:[],
    group:''
  }

  componentDidMount() {
    this.setState({
      group: this.props.group
    });
    this.fetchFriends();
  }

  // componentWillUpdate() {
  //   console.log('componentWillUpdate', this.props);
  // }

  fetchFriends() {
    const cookies = new Cookies();       
    // let id = group ? group.id : undefined;
    axios({
        method: 'GET',
        url: `http://localhost:3000/groups/members?group_id=${ this.props.group.id }`,
        headers: { "Content-Type": "application/json",
        "Authorization": cookies.get("access_token")},
      }).then((res) => {
          if (res.data.length >= 0) {
            if (this.props.group) {
              console.log(res.data);
              this.setState({
                group: this.props.group,
                friends: res.data
            });
            } else {
              this.setState({
                friends: res.data});
            }
          }
    });
  }
  
  render() {
    return (
      <Card.Content>
        {/*the form to add a friend to the selected group*/}
        <Form onSubmit={ this.handleAdd }>
          <Form.Group>
            <Form.Input icon='at'
              placeholder="Type your friend's Email"
              name='email'
              iconPosition='left'
              required
              onChange={ this.doChange } />
            <Form.Button icon='add' content='add to group' color='grey' />
          </Form.Group>
        </Form>
        { this.state.friends.length != 0 && <Segment.Group size='tiny'>
          { this.state.friends.map( friend => (
            <Segment attached compact>
              <Grid container>
                <Grid.Row centered='true'>
                  <Grid.Column width={3} textAlign='left'>
                    <Image size='tiny' src={ friend.image } />
                  </Grid.Column>
                  <Grid.Column width={4} textAlign='left'>
                    <Header as='h3'>
                      { friend.name }
                    </Header>
                  </Grid.Column>
                  <Grid.Column width={4} textAlign='left'>
                    <Header disabled as='h3'>
                      { friend.email }
                    </Header>
                  </Grid.Column>
                  <Grid.Column width={5} verticalAlign='true'>
                    <Button basic color='red'
                      id={ friend.id }
                      onClick={ this.doRemove }>Remove
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          )) }
        </Segment.Group> }
      </Card.Content>
    );
  }

  componentWillReceiveProps=( nextProps )=>{
    console.log('nextProps', nextProps);
    this.setState({
      group: nextProps.group
    });
    this.fetchFriends(nextProps.group);
  }

  handleAdd = () => {
    console.log(this.friend);
    const cookies = new Cookies();       
    console.log(this.state.group);
    axios({
      method: 'POST',
      url: "http://localhost:3000/groups/add",
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookies.get("access_token")
      },
      data: {
        "group_id": this.state.group.id,
        "email": this.friend
      }
    }).then((res) => {
      this.fetchFriends(); 
    });
  }

  doChange = (e, { name, value }) => this.friend = value

  doRemove = (e) => { 
    const cookies = new Cookies();       
    console.log('friend id', e.target.id);
    axios({
      method: 'post',
      url: "http://localhost:3000/groups/remove",
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookies.get("access_token")
      },
      data: {
        "group": {
          "group_id": this.state.group.id,
          "user_id": e.target.id
        }
      }
    }).then((res) => {
      this.fetchFriends(); 
    });
  }

}

export default GroupMembers;
