import React from 'react';
import { Card, Button, Grid } from 'semantic-ui-react'

import Layout from './Layout';
import DeckDetails from './DeckDetails';
import { history } from '../routes/routes';
import { Decks } from '../api/decks';

export default class MyDecks extends React.Component {
    state = {
        decks: []
    }
    componentDidMount() {
        this.tracker = Tracker.autorun( async () => {
            Meteor.subscribe('decks');
            const decks = Decks.find({}).fetch();
            this.setState({ decks });
        });
    }
    componentWillUnmount() {
        this.tracker.stop();
    }
    render() {
        return (
            <Layout>
                <Grid>
                    <Grid.Row>
                        <Card.Group>
                            {this.state.decks.map((deck) => <DeckDetails key={deck._id} {...deck}/>)}
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