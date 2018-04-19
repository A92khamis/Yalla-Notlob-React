import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Card, Image, Button, Container,
  Segment, Item, Header } from 'semantic-ui-react'
import Cookies from 'universal-cookie';
import axios from 'axios';
import uuid from 'uuid/v4';
import './App.css';

class AllGroups extends Component {
    groups = [];
    selected = {};
    state = {
      groups: []
    };

    constructor(props) {
      super(props);
      if (props.group) {
        this.groups.push(props.group);
      }
    }

    componentDidMount(){
      this.fetch();
    }

    fetch() {
    const cookies = new Cookies();       
      axios({
          method:'GET',
          url:"http://localhost:3000/groups/",
          headers: {
          "Authorization": cookies.get("access_token")},
        }).then((res) => {
          console.log(res);
          this.setState({groups: res.data});      
        });
    }

    render() {
        return (
          <Card.Content>
            { this.state.groups.length != 0 && <Segment.Group size='tiny'>
              { this.state.groups.map((group) => (
                <Segment attached compact>
                  <Grid container>
                    <Grid.Row centered='true'>
                      <Grid.Column width={4} textAlign='left'>
                        <Header as='h3'>
                          { group.groupName }
                        </Header>
                      </Grid.Column>
                      <Grid.Column width={5} verticalAlign='true'>
                        <Button basic color='red'
                          icon='delete'
                          key={ uuid() }
                          id={ group.id }
                          onClick={ this.doDelete }>
                        </Button>
                      </Grid.Column>
                      <Grid.Column width={5} verticalAlign='true'>
                        <Button basic color='green'
                          icon='hand point up'
                          key={ uuid() }
                          id={ group.id }
                          onClick={ this.doAdd }>
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

    componentWillReceiveProps = (nextProps) => {
      console.log("ahooooooooooooooooooooooooooo");
      console.log(nextProps);
      this.fetch();
    }

    doDelete = (e) => {
      const cookies = new Cookies();       

      var urldel = `http://localhost:3000/groups/${e.target.id}`;
      console.log(urldel);
      var data = null;
      var xhr = new XMLHttpRequest();
      // xhr.withCredentials = true;

      xhr.open("DELETE", urldel);
      xhr.setRequestHeader("Authorization", cookies.get("access_token"));
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(data);
      var that = this;
      xhr.addEventListener("readystatechange", function () {
      if (xhr.readyState === 4) {
        that.fetch();
      }
      });
    }

    doAdd = (e) => {
      this.selected.id = e.target.id;
      for (var group of this.state.groups) {
        if (group.id == this.selected.id) {
          this.selected.name = group.groupName;
          break;
        }
      }
      this.props.onGroupChange(this.selected);
    }

}

export default AllGroups;