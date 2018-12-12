import React from 'react';
import { Grid, Card, Dimmer, Loader } from 'semantic-ui-react';

import Layout from './Layout';

export default class DeckDetails extends React.Component {
    state = {
        deck: {},
        loading: true
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        Meteor.call('decks.details', id, (error, result) => {
            if (error) {
                this.setState({ errorMessage: error.message });
            } else {
                this.setState({ deck: result });
            }
            this.setState({ loading: false });
        });
    }
    renderCardNames = () => {
        if (this.state.deck.cards) {
            return this.state.deck.cards.map((card) => <Card.Description key={card._id}>{card.name}</Card.Description>);
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
                        <Card.Header>{this.state.deck.name}</Card.Header>
                        {this.renderCardNames()}
                        </Card.Content>
                    </Card>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}