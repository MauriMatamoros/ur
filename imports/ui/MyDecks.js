import React from 'react';
import { Card, Button, Grid, Dimmer, Loader } from 'semantic-ui-react'

import Layout from './Layout';
import DecksCard from './DecksCard';
import { history } from '../routes/routes';
import { Decks } from '../api/decks';

export default class MyDecks extends React.Component {
    state = {
        decks: [],
        loading: true
    }
    componentDidMount() {
        this.tracker = Tracker.autorun( async () => {
            Meteor.subscribe('decks');
            const decks = Decks.find({}).fetch();
            this.setState({ 
                decks,
                loading: false
            });
        });
    }
    componentWillUnmount() {
        this.tracker.stop();
    }
    render() {
        return (
            <Layout>
                <Dimmer active={this.state.loading}>
                    <Loader></Loader>
                </Dimmer>
                <Grid>
                    <Grid.Row>
                        <Card.Group>
                            {this.state.decks.map((deck) => <DecksCard key={deck._id} {...deck}/>)}
                        </Card.Group>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Button primary onClick={() => history.push("/deckCreator")}>Create Deck</Button>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    };
};