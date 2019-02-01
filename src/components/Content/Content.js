import React, { Component } from "react";
import BrandList from './BrandList'
import ProductList from './ProductList'
import {Switch, Route} from 'react-router-dom'

class Content extends Component {

    render(){ 
        return (
            <div style={{marginTop: '100px'}}>
                <Switch>
                    <Route path="/" exact component={BrandList} />
                    <Route path="/:brandId/products" exact component={ProductList}/>
                </Switch>
            </div>
        )
    }
}

export default Content