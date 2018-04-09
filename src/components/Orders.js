import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Icon, Button, Image, Grid, Modal, Header, Table, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
var uuid = require('uuid-v4'); // generating ids for each item in grids may be useful in furthur uses is Allah !!!

export default class Orders extends Component {
    
    
    state = {
        'orders' : [
            {'type': "Breakfast", 'date':"1-2-2018", 'id':"1",resturant:"Mac","invited":"10","joined":"7","status":"waiting"},
            {'type': "Launch", 'date':"1-3-2018", 'id':"2",resturant:"Al tab3y","invited":"8","joined":"6","status":"waiting"},
            {'type': "Breakfast", 'date':"4-4-2018", 'id':"3",resturant:"Tom and basl","invited":"9","joined":"2","status":"finished"},

        ]
    }
    

    finsihOrder = (e)=>{
        let allOrdersArr = this.state.orders.slice();
        this.state.orders.forEach(order=>{
            console.log(e.target.value);
            if(e.target.value === order.id){
                order.status = "finished";
            }
            allOrdersArr.push(order);

        })
        this.setState({orders:allOrdersArr},()=>{
        console.log(this.state.orders)
        })
}

//     cancelOrder = (e)=>{
//         this.orders.forEach(order=>{
//             if(e.target.value == order.id){
//             order.status = "canceled";
//             }
//         })
//         this.setState({orders:orders},()=>{
//         console.log(this.state.orders)
//         })
//     }


    render() {
        const { active } = this.state;
        return (
            
            <Grid>
            
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
                                        <Button  toggle active={active} inverted color='blue'as={Link} to={`/orders`} onClick={this.finsihOrder} value={order.id} >Finish</Button>
                                        <Button  toggle active={active} inverted color='red' as={Link} to={`/orders/${order.id}`} onClick={this.cancelOrder} value={order.id}>Cancel</Button>
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