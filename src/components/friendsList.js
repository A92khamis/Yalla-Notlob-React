import React, { Component } from 'react';
import Header from '../components/Header';
import './App.css';
import {Grid, Card, Image, Button, Container } from 'semantic-ui-react'

class FriendsList extends Component {
    friends=[];
    state = {
        friends: []
    }

    constructor(props){
        super(props);
        if(props.friend){
            this.friends.push(props.friend);
        }
    }

    render() {
        return (
            <div>
                <Header />
                <Container>
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
                </Container>
            </div>
                )
            }
        

            componentWillReceiveProps=( nextProps )=>{
                console.log("ahooooooooooooooooooooooooooo");
                console.log(nextProps); 
                if (nextProps && nextProps != this.props) {
                    this.friends.push(nextProps.friend);
                }               
                this.setState({friends:this.friends});
                
            }
        }
        
export default FriendsList;