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
    render() {
        return (
            <Layout>
                <Grid>
                    <Grid.Row>
                        <Card.Group>
                            
                        </Card.Group>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Button primary onClick={() => history.push("/")}>Create Deck</Button>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    };
};