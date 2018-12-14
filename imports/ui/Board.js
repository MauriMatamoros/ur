import React from 'react';
import { history } from '../routes/routes';

import Layout from './Layout';
import Hand from './Hand';
import OtherHand from './OtherHand';
import PlayedCard from './PlayedCard';
import OtherPlayedCard from './OtherPlayedCard';

export default class Board extends React.Component {
    render() {
        return (
            <Layout>
                <OtherHand></OtherHand>
                <OtherPlayedCard></OtherPlayedCard>
                <PlayedCard></PlayedCard>
                <Hand deckId={this.props.history.location.state.deckId}></Hand>
            </Layout>
        );
    }
}