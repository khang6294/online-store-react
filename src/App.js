import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import Content from './components/Content/Content'
import {BrowserRouter} from 'react-router-dom'
class App extends Component {
    render() {
        return (
            <BrowserRouter>
            <div className="App">
            
                <Header/>
                <Content/>
            </div>
            </BrowserRouter>
        );
    }
}

export default App;
