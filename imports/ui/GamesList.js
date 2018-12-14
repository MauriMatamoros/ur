import React from 'react';
import { history } from '../routes/routes';

import Layout from './Layout';

export default class GamesList extends React.Component {
    render() {
        return (
            <Layout>
                <Grid>
                    <Grid.Row centered>
                        <Button primary onClick={() => history.push("/gameCreator")}>Create Game</Button>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}