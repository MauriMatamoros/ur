import React from 'react';
import { history } from '../routes/routes';

import Layout from './Layout';
import Hand from './Hand';

export default class Board extends React.Component {
    render() {
        return (
            <Layout>
                <Hand></Hand>
                <Hand deckId={this.props.history.location.state.deckId}></Hand>
            </Layout>
        );
    }
}