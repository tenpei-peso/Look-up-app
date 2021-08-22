import React from 'react';
import {Switch, Route} from "react-router";
import {SignIn, SignUp, Reset, ProductEdit, ProductList, ProductDetail, WishList, Home} from "./templates"
import Auth from './Auth'
import Map from './templates/Map';
import ShopPage from './templates/ShopPage';
import ProductSell from './templates/ProductSell';

const Router = () => {
    return (
        <Switch>
            <Route exact path="/signup" component={SignUp}></Route>
            <Route exact path="/signin" component={SignIn}></Route>
            <Route exact path="/signin/reset" component={Reset}></Route>

            <Auth>
                <Route exact path="(/)?" component={ProductList}></Route>
                <Route exact path="/product/:id/:id" component={ProductDetail}></Route>
                <Route path="/edit(/:id)?" component={ProductEdit}></Route>
                <Route path="/sell/:id" component={ProductSell}></Route>

                <Route exact path="/shopPage/:id" component={ShopPage}></Route>

                <Route exact path="/home" component={Home}></Route>
                
                <Route exact path="/wish" component={WishList}></Route>
                <Route exact path="/map" component={Map}></Route>
            </Auth>
            
        </Switch>
    )
}
export default Router