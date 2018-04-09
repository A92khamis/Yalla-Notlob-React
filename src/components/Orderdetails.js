import React, { Component } from 'react'
import { Link } from "react-router-dom";
import GridColumn, { Button, Grid, List, Label, Segment, Menu, Icon, Table, Form, Input, Dimmer, Header, Image } from 'semantic-ui-react'
let uuid = require('uuid-v4');


export default class Orderdetails extends Component {

	state = {
		'orders' : [
			{'user': "sam", 'item':"koshry", 'amount':"1", 'price':"13", 'comment':"wast"},
			{'user': "rania", 'item':"burger", 'amount':"2", 'price':"8", 'comment':"bel salsa"},
		],
		'joined' : [
		],

		'invited' : [
			{'user': "khamis", 'img':"12.jpg"},
			{'user': "mina", 'img':"12.jpg"},
			{'user': "sam", 'img':"12.jpg"},
			{'user': "ahmed", 'img':"12.jpg"},
			{'user': "rania", 'img':"12.jpg"},
        ],
        'joined' : [
			{'user': "khamis", 'img':"12.jpg"},
			{'user': "rania", 'img':"12.jpg"},
		],

	}



    
  handleOpen1 = () => this.setState({ active: true ,flag : 'invited'})
  handleOpen2 = () => this.setState({ active: true ,flag : 'joined'})
  handleClose = () => this.setState({ active: false})

  
	handleSubmit = (e) => {
		let formData = new FormData(document.getElementById('itemForm'))
		console.log(formData.get('item'))
	}

    render() {
			 const { active , flag} = this.state
    return (
        <Grid>
        <Grid  columns={2}>
            <h1><font color="#154360">Order Details</font></h1>
                 <div>
        <Button
        color='blue'

        content='5 people invited'
        icon='eye'
          labelPosition='left'
          onClick={this.handleOpen1}
        />

        <Dimmer
          active={active}
          onClickOutside={this.handleClose}
          page
        >
        
          <Header as='h2' icon inverted>
          <div>
          {
            this.state.flag === 'invited'&&this.state.invited.map(friend =>{
                  return(
                    <Label as='a' color='teal' image>
                    <img src='../public/images/person.jpeg' />
                    {friend.user}
                    <Label.Detail>Friend</Label.Detail>
                  </Label>
                  )
              })
          }
      </div>
          </Header>
        </Dimmer>
      </div>
      <br/>
      <div>
        <Button
        color='blue'
          content='2 people Joined'
          icon='eye'
          labelPosition='left'
          onClick={this.handleOpen2}
        />

        <Dimmer
          active={active}
          onClickOutside={this.handleClose}
          page
        >
        
          <Header as='h2' icon inverted>
          <div>
          {
            this.state.flag === 'joined'&&this.state.joined.map(friend =>{
                  return(
                    <Label as='a' color='teal' image>
                    <img src='../public/images/person.jpeg' />
                    {friend.user}
                    <Label.Detail>Friend</Label.Detail>
                  </Label>
                  )
              })
          }
      </div>
          </Header>
        </Dimmer>
      </div>
            <Grid.Column>
            <Table celled inverted selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign='center'>person</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>item</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>amount</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>price</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>comment</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                  <Table.Body>
                    {
                        this.state.orders && this.state.orders.map((order)=>{
                            return(
                                <Table.Row>
                                    <Table.Cell textAlign='center' key={uuid()} >{order.user} </Table.Cell>
                                    <Table.Cell textAlign='center' key={uuid()}>{order.item}</Table.Cell>
                                    <Table.Cell textAlign='center' key={uuid()}>{order.amount}</Table.Cell>
                                    <Table.Cell textAlign='center' key={uuid()}>{order.price}</Table.Cell>
                                    <Table.Cell textAlign='center' key={uuid()}>{order.comment}</Table.Cell>
                                    <Table.Cell textAlign='center' key={uuid()}>
                                    <Button  toggle active={active} inverted color='red' as={Link} to={`/orders/${order.id}`} onClick={this.cancelOrder} value={order.id}>Cancel</Button>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                    </Table.Body>
            </Table>
            </Grid.Column>
            <Grid.Column computer={8}>
            <Form onSubmit={this.handleSubmit} id='itemForm' inverted>
                <Form.Group>
                  <Form.Input required name='item' type='text' placeholder='Item'/>
                  <Form.Field required name='amount' control='input' type='number' min={1} max={2} width={3}/>
                  <Form.Field required name='price' control='input' type='number' min={1} width={4}/>
                  <Form.Input required name='comment' type='text' placeholder='Comment' />
                  <Button type='submit' icon='plus' size='small' color = 'blue'/>
                </Form.Group>
            </Form>
        </Grid.Column>
        </Grid>
        </Grid>
    )

}
}