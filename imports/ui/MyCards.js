import React from 'react';
import { Meteor } from 'meteor/meteor';

import Layout from './Layout'
import { Cards } from '../api/cards';

export default class MyCards extends React.Component {
    state = {
        cards: []
    }
    componentDidMount() {
        this.tracker = Tracker.autorun( async () => {
            Meteor.subscribe('myCards');
            const cards = Cards.find({},).fetch();
            this.setState({ cards });
        });
    }
    componentWillUnmount() {
        this.tracker.stop();
    } 
    render() {
        console.log(this.state.cards.length)
        return (
            <Layout>
                { this.state.cards.map((card) => <p key={card._id}>{card.name}</p>)}
                MyCards component
            </Layout>
        );
    }
};