import React from 'react';
import { Form, Grid, Dropdown, Button, Icon, Label } from "semantic-ui-react";
import axios from 'axios';
import Header from './Header';

export default class AddOrder extends React.Component{

    constructor(props) {
        super(props);
      this.getMyFriends();
      this.getMyGroups();
      }
      friends = [];
      groups = [];

      state = {
        type: '',
        resturant:'',
        image:'',
        invitedFriends: []
      }

      // if user exist in url  
      //userId = this.props.match.params.id;


  

    submit = (e)=>{
        console.log(e.target.elements);
        e.preventDefault();
        
    }

    getMyFriends = ()=>{
        axios.get(`http://localhost:3000/users/${this.userId}/friends`).then((response)=>{
            console.log(response);
            this.state.friends = response.data.message;

        }).catch((error)=>{
            console.log("error", error);

       })

 }

    getMyGroups = ()=>{
        axios.get(`http://localhost:3000/users/${this.userId}/groups`).then((response)=>{
            console.log(response);
            this.state.groups = response.data.message;

        }).catch((error)=>{
            console.log("error", error);

        })

    }
    addOrder = (e)=>{ 
        this.setState( ()=>{
            axios.post(`http://localhost:3000/users/orders`,{
                'type': this.state.type,
                'ownerId': 2, // how we gonna get user id 
                'resturant': this.state.resturant,
                'image': this.state.image,
            },
            {headers: {
                'Content-Type': 'multipart/form-data'
            }}).then((response)=>{
                console.log("response",response);
            }).catch((error)=>{
                console.log("error", error);
            })
    
        });
    }
    
      
    inviteFriend = (e)=>{
            let invitedFriendsArr = this.state.invitedFriends.slice();
            this.friends.forEach(friend=>{
                if(e.target.value == friend.id){
                let invitedFriend = friend;
                invitedFriendsArr.push(invitedFriend);
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
    handleChangeType = (e)=>{
        this.setState({'type': e.target.value});
    }

    handleChangeResturant = (e)=> {
        this.setState({'resturant': e.target.value});
    }
  
    handleChangeImage = (e)=> {
        this.setState({'image': e.target.files[0]});
    }

    render = ()=>{
        return (
            <Grid divided='vertically'>
              <Header user={ this.props.user } />
                <h1><font color="#154360">Add Order</font></h1>
                <Grid.Row columns={2}>
                    <Grid.Column>
                    <Form onSubmit={this.addOrder}>

                    <Form.Field onChange={this.handleChangeType} value={this.state.type} id ='add_order'>
                     <h4><font color="#512E5F">Order For </font></h4>
                        <select name="meal" className="ui search dropdown" placeholder="Select Meal" style={{ background: 'gainsboro ' }}>
                            <option value="breakfast" >Breakfast</option>
                            <option value="Launch" >Lunch</option>    
                        </select>
                    </Form.Field>

                     <Form.Field>
                     <h4><font color="#512E5F">From</font></h4>
                        <input type="text" name="restaurant" placeholder="Restaurant Name" style={{ background: 'gainsboro ' }} onChange={this.handleChangeResturant} value={this.state.resturant} />
                     </Form.Field>

                     <Form.Field>
                     <h4><font color="#512E5F">Add Friend</font></h4>
                        <select name="invitedFriends" className="ui fluid dropdown" onChange={this.inviteFriend} style={{ background: 'gainsboro ' }}>
                            <option value="">Invite Friend</option>
                            {
                                this.friends.map(friend =>{
                                    return(
                                        <option key={friend.id} value={friend.id}>{friend.name}</option>
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
                                     this.groups.map(group =>{
                                        return(
                                             <option key={group.id} value={group.id}  onChange={this.handleChangeImage} value={this.state.image}>{group.gname}</option>
                                         )
                                    })
                                 }    
                         </select>
                    </Form.Field>

                    <Form.Field>
                        <h4><font color="#512E5F">Add Menu</font></h4>
                        <input type="file" name="menuImage" placeholder="Menu Image"/>
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