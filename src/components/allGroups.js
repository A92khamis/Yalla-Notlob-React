import React, { Component } from 'react';
import Header from '../components/Header';
import './App.css';
import uuid from 'uuid/v4';
import { Grid, Card, Image, Button, Container, Item } from 'semantic-ui-react'

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

    render() {
        return (
            <div>
                <Container>
                    <div className="friends" >
                        <Item.Group divided>
                            {this.groups.map(friend =>
                                <Item>
                                    <Item.Content>
                                        <Item.Header>{ friend }</Item.Header>
                                        <Button icon='add user' floated='right' onClick= {this.doAdd} >
                                        </Button>
                                        <Button icon='close' key={uuid()} floated='right' onClick={ this.doDelete } >
                                        </Button>
                                    </Item.Content>
                                </Item>
                            )}
                              </Item.Group>

                    </div>
                </Container>
            </div>
        )
    }


    componentWillReceiveProps = (nextProps) => {
        console.log("ahooooooooooooooooooooooooooo");
        console.log(nextProps);
        if (nextProps) {
            this.groups.push(nextProps.group);
        }
        this.setState({ groups: this.groups });

    }

    doDelete = (e) => {
        this.groups.pop();
        this.setState({ groups:this.groups});
    }

    doAdd = (e) => {
        this.selected = e.target.key ;
    }

}

export default AllGroups;