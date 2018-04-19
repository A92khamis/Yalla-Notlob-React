import React from 'react';
import { Form, Grid, Segment, Dropdown, Button, Icon, Label, Card, Header } from "semantic-ui-react";
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import Cookies from 'universal-cookie';
import AppHeader from './Header';

var uuid = require('uuid-v4');

export default class AddOrder extends React.Component{
    constructor(props) {
        super(props);
            this.handleChangeRes = this.handleChangeRes.bind(this);
            this.getMyFriends();
            this.getMyGroups();
        }
    
        order = {
            res_name: "",
            order_for: "Breakfast",
            menu: "",
        }


      state = {
        "friends" : [],
        "groups" :[],
         activeItem: '',
        'invitedFriends': [],
        
      }

    getMyFriends = ()=>{
        const cookies = new Cookies();       
        axios.get(`http://localhost:3000/friends`,
        {headers: {
            'Content-Type': 'application/json',
            'Authorization': `Barear ${cookies.get("access_token")}`                
        }}).then((response)=>{
            console.log('response',response);
            this.setState({friends:response.data})
            console.log('friends',this.friends);
        }).catch((error)=>{
            console.log("error", error);

       })
 }

    getMyGroups = ()=>{
        const cookies = new Cookies();       

        axios.get(`http://localhost:3000/groups/`,
        {headers: {
            'Content-Type':'application/json',
            'Authorization': `Barear ${cookies.get("access_token")}`                
        }}).then((response)=>{
            console.log(response);
            this.state.groups = response.data.message;

        }).catch((error)=>{
            console.log("error", error);

        })

    }   
      
    inviteFriend = (e)=>{
            let invitedFriendsArr = this.state.invitedFriends.slice();
            this.state.friends.forEach(friend=>{
                if(e.target.value == friend[0].id){
                let invitedFriend = friend[0].id;
                invitedFriendsArr.push({'user_id':invitedFriend,'name':friend[0].name});
                }
            })
            this.setState({invitedFriends:invitedFriendsArr},()=>{
            console.log(this.state.invitedFriends)
            })
    }


    inviteGroup = (e)=> {
        let invitedFriendsArr = this.state.invitedFriends.slice();
            this.groups.forEach(group=>{
                if(e.target.value == group.id){       
                for (let index = 0; index < group.members.length; index++) {
                let invitedFriend = group.members[index];
                invitedFriendsArr.push(invitedFriend);
                }
            }
            })
            this.setState({invitedFriends:invitedFriendsArr},()=>{
                console.log(this.state.invitedFriends);
                })
    }

    uninvite = (e)=>{
        console.log("in it")
        let invitedFriendsArr = [];
        this.state.invitedFriends.forEach(friend=>{
            if(e.target.value != undefined){
                console.log("meet condition");
                console.log(friend.id);
                console.log(e.target.value);
                invitedFriendsArr.push(friend);
            }
        })
        this.setState({invitedFriends:invitedFriendsArr},()=>{
            console.log(this.state.invitedFriends)
            })
    }


    addOrder = (e)=>{
        const cookies = new Cookies();       

        this.setState( ()=>{ 
        axios.post(`http://localhost:3000/orders`,{
        "order":{
           "meal_name":this.order.order_for,
           "image":this.order.menu,
           "restaurant_name":this.order.res_name
        },
        "users": this.state.invitedFriends
       },
         {headers: {
            'Content-Type':'application/json',
            'Authorization': `Barear ${cookies.get("access_token")}`                
        }}).then((response)=>{
            <Redirect to="/orders"/>


        }).catch((error)=>{
            console.log("error", error);
        })
    })}
    

    getFiles = (file)=>{
        this.order.menu = file.base64;
        console.log("menumenu",this.order.menu)

    }

    chooseMeal = (e, {value})=>{
        this.order.order_for = value
        console.log("mealmeal",this.order.order_for)

    }

    handleChangeRes(event) {
        this.order.res_name = event.target.value
        console.log("resres",this.order.res_name)
    }

    render = ()=>{
        return (
            <div style={{ marginTop: '50px' }}>
                <AppHeader user={ this.props.user } />
                <Grid style={{ margin: '50px 50px'}}>
                    <Grid.Column width={9}>
                        <Card raised fluid>
                            <Card.Content style={{ background: '#05396B' }}>
                                <Header as='h1' style={{ color: '#FFDE00' }}>
                                    <span><Icon size='small' name='add' /></span>Add Order
                                </Header>
                            </Card.Content>
                            <Card.Content>
                                <Segment basic>
                                    <Form onSubmit={ this.addOrder } id='myForm'>
                                        <Form.Field onChange={this.handleChangeType} value={this.state.type} id ='add_order'>
                                            <label>Order For</label>
                                            <Dropdown selection
                                                options={[
                                                    { key: uuid(), text: 'Breakfast', value: 'Breakfast' },
                                                    { key: uuid(), text: 'Lunch', value: 'Lunch' }
                                                ]}
                                                placeholder='Meal Type' onChange={this.chooseMeal}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>From</label>
                                            <input required type="text"
                                                name="restaurant"
                                                placeholder="Restaurant Name"
                                                onChange={this.handleChangeRes}
                                                value={this.state.resturant_name}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Add Friend</label>
                                            <Dropdown selection
                                                name="invitedFriends"
                                                placeholder='Invite Friend'
                                                onChange={this.inviteFriend}
                                                options={
                                                    this.state.friends.map(friend =>{
                                                        return (
                                                            { key: friend[0].id, text: friend[0].name, value: friend[0].id }
                                                        )
                                                }) }
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Add Group</label>
                                            <Dropdown selection
                                                name="invitedGroups"
                                                placeholder='Invite Group'
                                                onChange={this.inviteGroup}
                                                // options={
                                                    // this.state.friends.map(friend =>{
                                                    //     return (
                                                    //         { key: friend[0].id, text: friend[0].name, value: friend[0].id }
                                                    //     )
                                                    // }) 
                                                // }
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Add Menu</label>
                                            <FileBase64
                                                multiple={ false }
                                                onDone={ this.getFiles }
                                            />
                                        </Form.Field>
                                        <Button type='submit' basic color="blue"
                                            size="large" floated="right"
                                        >Publish</Button>
                                     </Form>
                                </Segment>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column width={7}>
                        <Card raised fluid>
                            <Card.Content style={{ background: '#05396B' }}>
                                <Header as='h3' style={{ color: '#FFDE00' }}>
                                    <span><Icon size='small' name='users' /></span>Friends List
                                </Header>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}