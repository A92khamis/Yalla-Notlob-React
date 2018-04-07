import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from '../components/Home';
import Login from '../components/Login'
// import Login from '../components/Login';
import Header from '../components/Header';


const AppRouter =()=> (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={Home} exact={true}/>
                <Route path="/login" component={Login} exact={true}/>

            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter;
