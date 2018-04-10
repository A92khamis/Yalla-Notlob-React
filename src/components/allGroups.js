import React, { Component } from 'react';

import './App.css';
import uuid from 'uuid/v4';
import { Grid, Card, Image, Button, Container, Item } from 'semantic-ui-react'
import axios from 'axios';

class AllGroups extends Component {
    groups = [];
    selected = '';
    state = {
        groups: []
    }

    constructor(props) {
        super(props);
        if (props.group) {
            this.groups.push(props.group);
        }
    }

    componentDidMount(){
        this.feachGroups();
    }

    feachGroups() {
        
        axios({
            method:'GET',
            url:"http://localhost:3000/groups/",
            headers:{
            "Authorization":"Barear eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1MjMzODE3Nzh9.ls-rW2WOanWnahx5akD_6TsTaDxSCrYkrWmUQHS9ko8"},
          }).then((res)=>{
              console.log(res);
            this.setState({groups:res.data});      
          });
    }

    render() {
        return (
            <Container>
                <div className="friends" >
                    <Item.Group divided>
                        {this.state.groups.map(friend =>
                        
                            <Item>
                               {console.log(friend.groupName )}
                                
                                <Item.Content>
                                    <Item.Header>{ friend.groupName }</Item.Header>
                                    <Button icon='add user' floated='right' onClick= {this.doAdd} >
                                    </Button>
                                    <Button icon='close' key={uuid()} id={friend.id} floated='right' onClick={ this.doDelete } >
                                    </Button>
                                </Item.Content>
                            </Item>
                        )}
                          </Item.Group>

                </div>
            </Container>
        )
    }


    componentWillReceiveProps = (nextProps) => {
        console.log("ahooooooooooooooooooooooooooo");
        console.log(nextProps);
        this.feachGroups();
    }

    doDelete = (e) => {
        
        var urldel =  `http://localhost:3000/groups/${e.target.id}`;
        console.log(urldel);
        // var headers= {
        //     "Content-Type":"application/json",
        // "Authorization":"Barear eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1MjMzODE3Nzh9.ls-rW2WOanWnahx5akD_6TsTaDxSCrYkrWmUQHS9ko8"}
        // axios.delete(`${urldel}`, {withCredentials: true, headers: headers}).then((res)=>{
        //     this.feachGroups();     
            
        // });
    axios({
        method:'DELETE',
            url:  `http://localhost:3000/groups/${e.target.id}`,
            headers: { "Content-Type":"application/json",
            "Authorization":"Barear eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1MjMzODE3Nzh9.ls-rW2WOanWnahx5akD_6TsTaDxSCrYkrWmUQHS9ko8"    
            },
          }).then( res =>{
              console.log(res);
              
            this.feachGroups();     
          });

          ajax({
            type: "DELETE",
            url: finalUrl, /* THIS URL IS CALLING CORRECTLY ie. /items/8 */
            dataType: "json",
            success: function(response) {
                console.log("successfully deleted");
            },
            error: function () {
                console.log("error");
            }
        })
    }

    doAdd = (e) => {
        this.selected = e.target.id ;
        this.props.onGroupChange(this.selected);
    }

}

export default AllGroups;