import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Register from '../ui/Register';
import Login from '../ui/Login';
import HomePage from '../ui/HomePage';
import CardsList from '../ui/CardsList';
import CardDetails from '../ui/CardDetails';

const history = createBrowserHistory();

const unauthenticatedPages = ['/', '/register', '/login'];
const authenticatedPages = ['/cards'];

const publicPage = function  () {
    if (Meteor.userId()) {
        history.replace('/cards');
    }
};

const privatePage = function  () {
    if(!Meteor.userId()) {
        history.replace('/');
    }
};

export const routes = (
    <Router history={history}>
        <Switch>
            <Route exact path='/register' component={Register} onEnter={publicPage}/>
            <Route exact path='/login' component={Login} onEnter={publicPage}/>
            <Route exact path='/' component={HomePage} onEnter={publicPage}/>
            <Route exact path='/cards' component={CardsList} onEnter={privatePage}/>
            <Route exact path='/cards/:id/details' component={CardDetails} onEnter={privatePage}/>
        </Switch>
    </Router>
);

export const onAuthChange = (authenticated) => {
    const path = history.location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(path);
    const isAuthenticatedPage = authenticatedPages.includes(path);
    if (authenticated && isUnauthenticatedPage) {
        history.replace('/cards'); 
    } else if (!authenticated && isAuthenticatedPage) {
        history.replace('/');
    }
};
