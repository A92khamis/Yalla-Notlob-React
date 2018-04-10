import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from '../components/Home';
import Login from '../components/Login'
import Register from '../components/Register'
import AddOrder from '../components/AddOrder';
import Groups from '../components/groups';
import MyFriends from '../components/MyFriends';
import Orders from '../components/Orders';
import OrderDetails from '../components/Orderdetails';


export const AppRouter = (props) => (
  <BrowserRouter>
    <Switch>
      <Route path="/" render={ () => <Home user={ props.user } /> } exact={ true } />
      <Route path="/addorder" render={ () => <AddOrder user={ props.user } /> } exact={true}/>
      <Route path="/groups" render={ () => <Groups user={ props.user } /> } exact={true}/>
      <Route path="/myfriends" render={ () => <MyFriends user={ props.user } /> } exact={true}/>
      <Route path="/orders" render={ () => <Orders user={ props.user } /> } exact={true}/>
      <Route path="/orders/:id" render={ () => <OrderDetails user={ props.user } /> } exact={true}/>
    </Switch>
  </BrowserRouter>
);


export const SignRouter = (props) => (
  <BrowserRouter>
    <Switch>
      <Route path="/register" component={ Register } exact={ true } />
      <Route path="/*" component={ Login } exact={ true } />
    </Switch>
  </BrowserRouter>
);
