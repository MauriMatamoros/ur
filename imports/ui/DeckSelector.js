import React from 'react';
import { Grid, List, Dimmer, Loader } from 'semantic-ui-react';
import { history } from '../routes/routes';
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
    chooseDeck(deckId) {
        console.log(deckId);
        history.push(`/game/${12354981}`, {
            deckId
        });
    }
    renderDecks = () => {
        if(this.state.decks.length === 0){
            this.setState({
                decks: [
                    {_id:'01', name:'Deck1'},
                    {_id:'02', name:'Deck2'},
                    {_id:'03', name:'Deck3'},
                    {_id:'04', name:'Deck69'},
                    {_id:'05', name:'Deck4'},
                    {_id:'06', name:'Deck5'},
                ]
            });
        }
        return this.state.decks.map((deck) =>(
            <List.Item key={deck._id}>
                <List.Content onClick={()=>this.chooseDeck(deck._id)}>
                    <List.Header>{deck.name}</List.Header>
                </List.Content>
            </List.Item>
        ));
    }
    render() {
        return (
            <Layout>
                <Grid>
                    <Dimmer active={this.state.loading}>
                        <Loader></Loader>
                    </Dimmer>
                    <Grid.Row centered>
                    <List selection verticalAlign='middle'>
                        {this.renderDecks()}
                    </List>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}