import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Icon, Button, Image, Grid, Card, Modal, Header, Table, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import AppHeader from './Header';
import Cookies from 'universal-cookie';
var uuid = require('uuid-v4'); // generating ids for each item in grids may be useful in furthur uses is Allah !!!

export default class Orders extends Component {
    constructor(props) {
        super(props);
            this.getMyOrders();
        }
    
    state = {
        'orders' : []
    }

    componentDidMount(){
        this.getMyOrders();
    }

// get all orders for certain user    
    getMyOrders = ()=>{
        const cookies = new Cookies();       
        axios.get(`http://localhost:3000/orders`, {
            headers:{ 
                      'Content-Type': 'application/json',
                      'Authorization': `Barear ${cookies.get("access_token")}`               
            }
        }).then((response)=>{
            console.log(response.data);
            this.setState( {orders:response.data});
            console.log("orders",this.state.orders);


        }).catch((error)=>{
            console.log("error", error);

       })

 }


 
// change order status to finished
finishOrder = (orderId)=>{ 
    console.log(orderId);
    const cookies = new Cookies();  
   
    this.setState( ()=>{
        axios.post(`http://localhost:3000/orders/change_status`,{
                "order_id":orderId,
                "status":"f"
        },
        {headers: {
            'Content-Type':'application/json',
            'Authorization': `Barear ${cookies.get("access_token")}`                
        }}).then((response)=>{
            if (response.success) {
                this.setState({orders:response.data});
                console.log("response",response);
            }
        }).catch((error)=>{
            console.log("error", error);
        })
    });
}
// change order status to canceled 
cancelOrder = (orderId)=>{ 
        console.log(orderId);
        const cookies = new Cookies();  
       
        this.setState( ()=>{
            axios.post(`http://localhost:3000/orders/change_status`,{
                    "order_id":orderId,
                    "status":"c"
            },
            {headers: {
                'Content-Type':'application/json',
                'Authorization': `Barear ${cookies.get("access_token")}`                
            }}).then((response)=>{
                    console.log("in cancel response");
                    this.setState({orders:response.data});
                    console.log("response",response);
            }).catch((error)=>{
                console.log("error", error);
            })
        });
    }


    render() {
        const { active } = this.state;
        return (
     
            <div style={{ marginTop: '50px' }}>
              <AppHeader user={ this.props.user } />
              <Grid style={{ margin: '50px 50px' }}>
                <Grid.Column width={11}>
                  <Card raised fluid>
                    <Card.Content style={{ background: '#05396B' }}>
                      <Header as='h1' style={{ color: '#FFDE00' }}>
                        <span><Icon size='small' name='list' /></span>Orders
                      </Header>
                    </Card.Content>
                    <Card.Content extra>
                      <Table celled basic selectable>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell textAlign='center'>Order</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Resturant</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Invited</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Joined</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Status</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Actions</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {
                            this.state.orders[0] && this.state.orders[0].map((order , i)=>{
                              return (
                                <Table.Row>
                                  <Table.Cell textAlign='center' key={uuid()} >{order.meal_name} </Table.Cell>
                                  <Table.Cell textAlign='center' key={uuid()}>{order.restaurant_name}</Table.Cell>
                                  <Table.Cell textAlign='center' key={uuid()}>{this.state.orders[1].invited[i]}</Table.Cell>
                                  <Table.Cell textAlign='center' key={uuid()}>{this.state.orders[1].joined[i]}</Table.Cell>
                                  <Table.Cell textAlign='center' key={uuid()}>{order.status}</Table.Cell>

                                  <Table.Cell textAlign='center' key={uuid()}>
                                  <Button  toggle active={active} inverted color='teal'as={Link} to={`/orders/${order.id}`} >Show</Button>
                                  {order.status=='waiting' && <Button  toggle active={active} inverted color='blue'as={Link} to={`/orders`}  onClick={this.finishOrder.bind(this, order.id)} id={order.id} >Finish</Button>}
                                  {order.status=='waiting'&& <Button  toggle active={active} inverted color='red' as={Link} to={`/orders`} onClick={this.cancelOrder.bind(this, order.id)}>Cancel</Button>}
                                  </Table.Cell>
                                </Table.Row>
                              );
                            })
                          }
                        </Table.Body>
                      </Table>
                    </Card.Content>
                  </Card>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Card raised>
                    <Card.Content style={{ background: '#05396B' }}>
                      <Header as='h3' style={{ color: 'white' }}><span><Icon size='small' name='food' /></span>Add Order</Header>
                    </Card.Content>
                    <Card.Content extra>
                      <Button fluid icon='plus' content='Add Order' color='grey' as={Link} to={`/addorder`}  />
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid>
            </div>
        )

    }
}