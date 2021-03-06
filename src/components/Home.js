import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Image, Grid, List, Label, Segment } from 'semantic-ui-react'
import Header from './Header';
// import logo from '../logo.svg';
import 'semantic-ui-css/semantic.min.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import TimeAgo from 'react-time-ago'



var uuid = require('uuid-v4'); // generating ids for each item in grids may be useful in furthur uses is Allah !!!

export default class Home extends Component {
	state = {
		'latestOrders' : [
			{'type': "Breakfast", 'date':"1-2-2018", 'id':"1"},
			{'type': "Launch", 'date':"2-5-2018", 'id':"2"}
		],
		'friendActivities' : [
			{'friendName':"Ahmed", 'orderId':"1", 'type': "breakfast", 'from':"Tom and Basl"},
			{'friendName':"Mina", 'orderId':"2", 'type': "launch", 'from':"Mac"},
		],
	}


	componentWillMount(){
		
		const cookies = new Cookies();       
				console.log("http://localhost:3000/friends/latestActivities");
				
				axios({
					method:'GET',
					url:"http://localhost:3000/orders/latestOrders",
					headers:{
					"Authorization":`Barear ${cookies.get("access_token")}`},
				}).then((res)=>{
						console.log(res);
					this.setState({latestOrders:res.data.orders});      
				});
				
        axios({
            method:'GET',
            url:"http://localhost:3000/friends/latestActivities",
            headers:{
            "Authorization":`Barear ${cookies.get("access_token")}`},
          }).then((res)=>{
              console.log(res);
            //this.setState({groups:res.data});      
          });
	}

  render() {
    return (
    	<div style={{ marginTop: '50px' }} >
	      <Header user={ this.props.user } />
				<Grid centered divided='vertically' doubling columns={2}>
					<Grid.Row>
						<Grid.Column computer={3} position='left'>
							<Segment>
							<Label as='a' color='green' tag>latest Orders</Label>
								<List>
								{
									this.state.latestOrders && this.state.latestOrders.map((order)=>{
										return(
											<List.Item key={uuid()} as={Link} to={`/orders/${order.id}`}>
											  <List.Content>{order.meal_name} on {order.created_at}</List.Content>
											</List.Item>
										)
									})
								}
								</List>
							</Segment>
						</Grid.Column>
						<Grid.Column computer={5}  position='right'>
							<Segment>
								<Label as='a' color='green' tag>friend Activities</Label>
								<List>
								{
									this.state.friendActivities && this.state.friendActivities.map((order)=>{
										return(
											<List.Item key={uuid()}>
												<List.Content>
												<List.Header as='a'>{order.friendName}</List.Header>
												<List.Description>Created an <Link to={`/orders/${order.orderId}`}><b>order</b></Link> for <a><b>{order.type}</b></a> from <a><b>{order.from}</b></a>.</List.Description>
												</List.Content>
											</List.Item>
										)
									})
								}
								</List>
							</Segment>
						</Grid.Column>
					</Grid.Row>
				</Grid>
    	</div>
    )
  }
}

