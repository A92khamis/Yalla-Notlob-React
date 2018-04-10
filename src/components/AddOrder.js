import React from 'react';
import { Form, Grid, Dropdown, Button, Icon, Label } from "semantic-ui-react";
import Header from '../components/Header';

export default class AddOrder extends React.Component{

    friends = [
            {
                name: 'esam',
                id: 1,
                image:'https://react.semantic-ui.com/assets/images/avatar/large/steve.jpg',
            },
            {
                name: 'Mina',
                id: 2,
                image:'../public/images/person.jpeg',

            },
            {
                name: 'rania',
                id: 3,
            }

    ]
    groups = [
        {
            gname:'foodhunters',
            id:'1',
            image:'../public/images/otolb.png',
            members:[{
                name: 'samy',
                id: 4,
                image:'../public/images/person.jpeg',

            },
            {
                name: 'somya',
                id: 5,
            }]
        },
        {
            gname:'koshryfans',
            id:'2',
            image:'../public/images/otolb.png',
        }, 
    ]

    state = {
        invitedFriends: []
    }

    submit = (e)=>{
        e.preventDefault();
        console.log(e.target.elements);
        
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

    notInvite = (e)=>{
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

    render = ()=>{
        return (
            <div style={{ marginTop: '100px' }}>
                <Header user={ this.props.user } />
                <Grid divided='vertically'>
                    <h1><font color="#154360">Add Order</font></h1>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                        <Form onSubmit={this.submit}>

                        <Form.Field>
                         <h4><font color="#512E5F">Order For </font></h4>
                            <select name="meal" className="ui search dropdown" placeholder="Select Meal" style={{ background: 'gainsboro ' }}>
                                <option value="1" >Breakfast</option>
                                <option value="2" >Lunch</option>    
                            </select>
                        </Form.Field>

                         <Form.Field>
                         <h4><font color="#512E5F">From</font></h4>
                            <input type="text" name="restaurant" placeholder="Restaurant Name" style={{ background: 'gainsboro ' }} />
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
                                                 <option key={group.id} value={group.id}>{group.gname}</option>
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
                                         <Label as='a' color='blue'  key={friend.id} image value={friend.id} onClick={this.notInvite}>
                                         <img src={friend.image} value={friend.id} onClick={this.notInvite} />
                                         {friend.name}
                                         <Button as='div' size="mini" value={friend.id} name="delete" onClick={this.notInvite} labelPosition='left'>
                                         <Icon name='window close' value={friend.id} onClick={this.notInvite}  />
                                         </Button>
                                       </Label>
                                    )
                                })
                            }
                        </div>
                       </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}