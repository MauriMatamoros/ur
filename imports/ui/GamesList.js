import React from 'react';
import { history } from '../routes/routes';

import Layout from './Layout';
import { Grid, Button, List } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import {Games} from '../api/games'

export default class GamesList extends React.Component {
    state = {
        games: []
    }
    componentDidMount(){
        this.tracker = Tracker.autorun( async () => {
            Meteor.subscribe('games');
            const games = Games.find({}).fetch();
            this.setState({
                games
            });
        });
    }
    componentWillUnmount() {
        this.tracker.stop();
    }
    chooseGame = (gameId) => {
        history.push("/gameCreator", {
            gameId
        });
    }
    renderGames = () => {
        return this.state.games.map((game) =>(
            <List.Item key={game._id}>
                <List.Content onClick={()=>this.chooseGame(game._id)}>
                    <List.Header>{game._id} - {game.playerOne}</List.Header>
                </List.Content>
            </List.Item>
        ));
    }
    createGame = () => {
        history.push("/gameCreator", {
            gameId: undefined
        });
    }
    render() {
        return (
            <Layout>
                <Grid>
                    <Grid.Row centered>
                        <Button primary onClick={() => this.createGame()}>Create Game</Button>
                        <List selection verticalAlign='middle'>
                            {this.renderGames()}
                        </List>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}