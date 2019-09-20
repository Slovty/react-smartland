import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Login from '../src/components/Login/login';
import Home from '../src/components/Home/home';
import "babel-polyfill";



ReactDOM.render(
    <BrowserRouter>
        <div>
            {/*<Auth/>*/}
            <Switch>
                <Route exact path="/" component={Login}/> {/* 路由下有子路又那么就不用path */}
                <Route component={Home}/> {/* 这是home页面,其下有很多子路由 */}
            </Switch>
        </div>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
