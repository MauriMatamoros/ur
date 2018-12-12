import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Register from '../ui/Register';
import Login from '../ui/Login';
import HomePage from '../ui/HomePage';
import CardsList from '../ui/CardsList';
import CardDetails from '../ui/CardDetails';
import MyCards from '../ui/MyCards';
import MyDecks from '../ui/MyDecks';
import Trade from '../ui/Trade';
import DeckCreator from '../ui/DeckCreator';
import DeckDetails from '../ui/DeckDetails';
import GamesList from '../ui/GamesList';

export const history = createBrowserHistory();

const unauthenticatedPages = ['/', '/register', '/login'];
const authenticatedPages = ['/cards', '/myDecks', '/myCards', '/card/:id/details', '/card/:id/view', '/deckCreator', '/games', '/deck/:id/details'];

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
            <Route exact path='/myCards' component={MyCards} onEnter={privatePage}/>
            <Route exact path='/myDecks' component={MyDecks} onEnter={privatePage}/>
            <Route exact path='/cards/:id/details' component={CardDetails} onEnter={privatePage}/>
            <Route exact path='/cards/:id/view' component={Trade} onEnter={privatePage}/>
            <Route exact path='/deckCreator' component={DeckCreator} onEnter={privatePage}/>
            <Route exact path='/deck/:id/details' component={DeckDetails} onEnter={privatePage}/>
            <Route exact path='/games' component={GamesList} onEnter={privatePage}/>
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
