import React, { Component } from "react";
import BrandList from './BrandList'
import ProductList from './ProductList'
import Product from './Product'
import {Switch, Route} from 'react-router-dom'

class Content extends Component {

    render(){ 
        return (
            <div style={{margin: '100px 200px'}}>
                <Switch>
                    <Route path="/" exact component={BrandList} />
                    <Route path="/:brandId/products" exact component={ProductList}/>
                    <Route path="/:brandId/products/:productId" exact component={Product}/>
                </Switch>
            </div>
        )
    }
}

export default Content