
            import React from 'react';
            import { Form, Grid, Dropdown, Button, Icon, Label } from "semantic-ui-react";
            import axios from 'axios';
            import {Redirect} from 'react-router-dom';
            import FileBase64 from 'react-file-base64';
            import Cookies from 'universal-cookie';

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
                        'Content-Type':'application/json',
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
                        <Grid divided='vertically'>
                            <h1><font color="#154360">Add Order</font></h1>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                <Form onSubmit={this.addOrder} id='myForm'>
            
                                <Form.Field onChange={this.handleChangeType} value={this.state.type} id ='add_order'>
                                 <h4><font color="#512E5F">Order For </font></h4>
                                 <Dropdown
                                 selection
                                  options={[
                                     { key: uuid(), text: 'Breakfast', value: 'Breakfast' },
                                     { key: uuid(), text: 'Lunch', value: 'Lunch' }
                                     ]}
                                 placeholder='Meal Type' onChange={this.chooseMeal}
                               />
                                </Form.Field>
            
                                 <Form.Field>
                                 <h4><font color="#512E5F">From</font></h4>
                                 <input required type="text" name="restaurant" placeholder="Restaurant Name" onChange={this.handleChangeRes} value={this.state.resturant_name} />
                                 </Form.Field>
            
                                 <Form.Field>
                                 <h4><font color="#512E5F">Add Friend</font></h4>
                                    <select name="invitedFriends" className="ui fluid dropdown" onChange={this.inviteFriend} style={{ background: 'gainsboro ' }}>
                                        <option value="">Invite Friend</option>
                                        {
                                            this.state.friends.map(friend =>{
                                                return(
                                                    <option key={friend[0].id} value={friend[0].id}>{friend[0].name}</option>
                                                )
                                            })
                                        }    
                                    </select>
                                </Form.Field>
            
                               
                                <Form.Field>
                                <h4><font color="#512E5F">Add Group</font></h4>
                                    <select name="invitedGroups" className="ui fluid dropdown" onChange={this.inviteGroup} style={{ background: 'gainsboro ' }}>
                                         <option value="">Invite Group</option>
                                            {
                                                //  this.state.groups.map(group =>{
                                                //     return(
                                                //          <option key={group.id} value={group.id}  onChange={this.handleChangeImage} value={this.state.image}>{group.gname}</option>
                                                //      )
                                                // })
                                             }    
                                     </select>
                                </Form.Field>
            
                                <Form.Field>
                                    <h4><font color="#512E5F">Add Menu</font></h4>
                                    <FileBase64 multiple={ false } onDone={ this.getFiles }/>
                                </Form.Field>
                                <Button type='submit' basic color="blue" size="large" floated="right">Publish</Button>
                            </Form>
                                   
                                </Grid.Column>
                                    
            
                               <Grid.Column>
                                <h2><font color="#154360">Invited Friends</font></h2>
                                <div>
                                    {
                                        this.state.invitedFriends.map(friend =>{
                                            return(
                                                 <Label as='a' color='blue'  key={friend.id} image value={friend.id} onClick={this.uninvite}>
                                                 <img src={friend.image} value={friend.id} onClick={this.uninvite} />
                                                 {friend.name}
                                                 <Button as='div' size="mini" value={friend.id} name="delete" onClick={this.uninvite} labelPosition='left'>
                                                 <Icon name='window close' value={friend.id} onClick={this.uninvite}  />
                                                 </Button>
                                               </Label>
                                            )
                                        })
                                    }
                                </div>
                               </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    )
                }
            }