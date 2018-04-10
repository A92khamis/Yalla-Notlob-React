import React, { Component } from 'react';
import Header from '../components/Header';
import './App.css';
import {Grid, Card, Image, Button, Container } from 'semantic-ui-react'
import axios from 'axios';

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
                <div className="friends" >
                    <Grid>
                        {this.state.friends && this.state.friends.map( friend => 
                            <Grid.Column width={4}>
                        <Card.Group >
                            <Card>
                                <Card.Content>
                                    <Image floated='right' size='mini' src='logo' />
                                    <Card.Header>
                                        {console.log(friend[0])}
                                        
                                        {friend[0].name}
                                    </Card.Header>
                                    <Card.Meta>
                                        {friend[0].email}
                                </Card.Meta>
                                    <Card.Description>
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <div className='ui one buttons'>
                                        <Button basic color='red' id={friend[0].id} onClick={this.deleteFriend} >Unfriend</Button>
                                    </div>
                                </Card.Content>
                            </Card>
                        </Card.Group>
                        </Grid.Column>
                        )}
                        </Grid>
                </div>
            </Container>
                )
            }
        
            componentWillReceiveProps(nextProps){
                this.feachFriends(); 
            }

            deleteFriend = (e) => {
                console.log(e.target.id);
                axios({
                    method:'POST',
                    url:`http://localhost:3000/friends/delete/`,
                    headers:{"Content-Type":"application/json",
                    "Authorization":"Barear eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1MjMzNzQyOTN9.ZPkkm9epaaTcBQPtJPiX6V2ydA9-pdbGd26-T86jWcA"},
                    data:{
                        id:`${e.target.id}`
                    }
                }).then((res)=>{
                    this.feachFriends();     
                  });
            }
        }
        
export default FriendsList;