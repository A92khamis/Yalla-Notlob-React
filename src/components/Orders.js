import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Icon, Button, Image, Grid, Modal, Header, Table, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import AppHeader from './Header';
var uuid = require('uuid-v4'); // generating ids for each item in grids may be useful in furthur uses is Allah !!!

export default class Orders extends Component {
    
    
    state = {
        'orders' : [],
        'status':'waiting'
    }
// get all orders for certain user    
    getMyOrders = ()=>{
        axios.get(`http://localhost:3000/users/${this.userId}/orders`, {
            headers:{
                      'Content-Type': 'application/json'
            }
        }).then((response)=>{
            console.log(response);
            this.state.orders = response.data.message;

        }).catch((error)=>{
            console.log("error", error);

       })

 }
// change order status to finished
finishOrder = (e)=>{ 
    this.setState( ()=>{
        axios.put(`http://localhost:3000/users/orders/modify`,{
            'status':'f',
            'orderId':this.orderId
        },
        {headers: {
            'Content-Type': 'multipart/form-data'
        }}).then((response)=>{
            if (response.success) {
                this.setState({orders:response.message})
            }
        }).catch((error)=>{
            console.log("error", error);
        })
    });
}
// change order status to canceled 
cancelOrder = (e)=>{ 
    this.setState( ()=>{
        axios.put(`http://localhost:3000/users/orders/modify`,{
            'status':'c',
            'orderId':this.orderId
        },
        {headers: {
            'Content-Type': 'multipart/form-data'
        }}).then((response)=>{
            if (response.success) {
                this.setState({orders:response.message})
            }
        }).catch((error)=>{
            console.log("error", error);
        })
    });
}


    render() {
        const { active } = this.state;
        return (
            <Grid style={{ marginTop: '50px' }} >
            <AppHeader user={ this.props.user } />
            <h1>Orders</h1>
                        <h2><Button icon='plus'  content='Add Order'inverted color='black'as={Link} to={`/addorder`}  /></h2>
                <Table celled inverted selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell textAlign='center'>Order</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Resturants</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Invited</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Joined</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Status</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                      <Table.Body>
                        {
                            this.state.orders && this.state.orders.map((order)=>{
                                return(
                                    <Table.Row>
                                        <Table.Cell textAlign='center' key={uuid()} >{order.type} </Table.Cell>
                                        <Table.Cell textAlign='center' key={uuid()}>{order.resturant}</Table.Cell>
                                        <Table.Cell textAlign='center' key={uuid()}>{order.invited}</Table.Cell>
                                        <Table.Cell textAlign='center' key={uuid()}>{order.joined}</Table.Cell>
                                        <Table.Cell textAlign='center' key={uuid()}>{order.status}</Table.Cell>
                                        <Table.Cell textAlign='center' key={uuid()}>
                                        <Button  toggle active={active} inverted color='teal'as={Link} to={`/orders/${order.id}`} >Show</Button>
                                        <Button  toggle active={active} inverted color='blue'as={Link} to={`/orders`} onClick={this.finsihOrder.bind(this, order.id)}  >Finish</Button>
                                        <Button  toggle active={active} inverted color='red' as={Link} to={`/orders/${order.id}`} onClick={this.cancelOrder.bind(this, order.id)}>Cancel</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })
                        }
                        </Table.Body>
                </Table>
            </Grid>
        )

    }
}