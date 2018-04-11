import React, { Component } from 'react';
import './App.css';
import {Grid, Card, Header, Item, Segment, Image, Button, Container } from 'semantic-ui-react'
import axios from 'axios';
import Cookies from 'universal-cookie';

class FriendsList extends Component {
    friends=[];
    state = {
        friends: [],
        load:""
    }

    constructor(props){
        console.log(" const ahooooooooooooooooooooooooooooooooo");
        
        super(props);
        if(props.friend){
            this.friends.push(props.friend);
        }
    }

    componentDidMount() {
        console.log("ahooooooooooooooooooooooooooooooooo");
        this.feachFriends();
        
    }

 
     feachFriends() {
      const cookies = new Cookies();   

            axios({
                method:'GET',
                url:"http://localhost:3000/friends/",
                headers:{"Content-Type":"application/json",
                "Authorization":`Barear ${cookies.get("access_token")}`},
              }).then((res)=>{
                  console.log(res);
                this.setState({friends:res.data});      
              });
    }

  render() {
    return (
      <Segment.Group>
      {
        this.state.friends && this.state.friends.map((friend) => (
          <Segment attached compact>
            <Grid container>
              <Grid.Row centered='true'>
                <Grid.Column width={3} textAlign='left'>
                  <Image size='tiny' src={ friend[0].image } />
                </Grid.Column>
                <Grid.Column width={4} textAlign='left'>
                  <Header as='h3'>
                    { friend[0].name }
                  </Header>
                </Grid.Column>
                <Grid.Column width={4} textAlign='left'>
                  <Header disabled as='h3'>
                    { friend[0].email }
                  </Header>
                </Grid.Column>
                <Grid.Column width={5} verticalAlign='true'>
                  <Button basic color='red'
                    id={ friend[0].id }
                    onClick={ this.deleteFriend }>Unfriend
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        ))
      }
      </Segment.Group>
    );
  }
            componentWillReceiveProps(nextProps){
                this.feachFriends(); 
            }

            deleteFriend = (e) => {
                console.log(e.target.id);
                const cookies = new Cookies(); 
                axios({
                    method:'POST',
                    url:`http://localhost:3000/friends/delete/`,
                    headers:{"Content-Type":"application/json",
                    "Authorization":`Barear ${cookies.get("access_token")}`},
                    data:{
                        id:`${e.target.id}`
                    }
                }).then((res)=>{
                    this.feachFriends();     
                  });
            }
        }
        
export default FriendsList;