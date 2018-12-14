import React from 'react';
import { Grid, Card, Dimmer, Loader } from 'semantic-ui-react';

import Layout from './Layout';
import { Decks } from '../api/decks';


export default class DeckSelector extends React.Component {
    state = {
        decks: [],
        loading: true
    }
    componentDidMount() {
        const { id } = this.props.match.params;
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
    renderDecks = () => {
        if (this.state.decks) {
            return this.state.decks.map((deck) => <Card.Description key={deck._id}>{deck.name}</Card.Description>);
        }
    }
    render() {
        return (
            <Layout>
                <Grid>
                    <Dimmer active={this.state.loading}>
                        <Loader></Loader>
                    </Dimmer>
                    <Grid.Row centered>
                    <Card>
                        <Card.Content>
                        <Card.Header>Your decks:</Card.Header>
                        {this.renderDecks()}
                        </Card.Content>
                    </Card>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}