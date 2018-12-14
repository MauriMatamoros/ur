import React from 'react';
import { Grid, Card } from 'semantic-ui-react';
export default class Hand extends React.Component {
    state = {
        cardCount: 3
    }
    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Card.Description className="ur-card">MY CARD</Card.Description>
                </Grid.Row>
            </Grid>
        );
    }
}