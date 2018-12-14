import React from 'react';
import { history } from '../routes/routes';

import Layout from './Layout';
import Hand from './Hand';
import OtherHand from './OtherHand';
import PlayedCard from './PlayedCard';
import OtherPlayedCard from './OtherPlayedCard';
import {Games} from '../api/games';

export default class Board extends React.Component {
    state = {
        playerOne: '',
        playerTwo: '',
        playerOneCards:'',
        playerTwoCards:''
    }
    componentWillMount(){
        console.log(this.props);
        if(!this.props.history.location.state)
            history.push('/gameCreator', {
                gameId:this.props.match.params.id
            })
    }
    componentDidMount() {
        
        const id = this.props.match.params.id;
        console.log(id)
        Meteor.call('games.join', id, (err, result) => {
            console.log(result);
        });
        this.tracker = Tracker.autorun( async () => {
            Meteor.subscribe('games');
            const game = Games.findOne({_id:id});
            
            this.setState({ 
                playerOne:game.playerOne,
                playerTwo:game.playerTwo,
                playerOneCards:game.playerOneCards,
                playerTwoCards:game.playerTwoCards
            });
        });
    }
    render() {
        const { playerOne, playerTwo, playerOneCards, playerTwoCards} = this.state;
        return (
            <Layout>
                <pre>{JSON.stringify({ playerOne, playerTwo, playerOneCards, playerTwoCards},null,2)}</pre>
                <OtherHand></OtherHand>
                <PlayedCard playerCards={[playerOneCards, playerTwoCards]}></PlayedCard>
                <Hand gameId={this.props.match.params.id} deckId={this.props.history.location.state.deckId}></Hand>
            </Layout>
        );
    }
}