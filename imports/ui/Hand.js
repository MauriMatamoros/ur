import React from 'react';
import { Grid, Card } from 'semantic-ui-react';
export default class Hand extends React.Component {
    state = {
        deck: {},
        loading: true,
        hand: [],
        discard: []
    }
    componentDidMount() {
        console.log(this.props);
        const id = this.props.deckId;
        if(!id){
            this.state.hand.push({name:''});
            this.state.hand.push({name:''});
            this.state.hand.push({name:''});
            return;
        }
        Meteor.call('decks.details', id, (error, result) => {
            console.log(result);
            if (error) {
                this.setState({ errorMessage: error.message });
            } else {
                this.setState({ deck: result || {cards:[]} });
                for(let i = 0; i < 3; i++){
                    const cards = this.state.deck.cards;
                    const selected = Math.floor(Math.random()*cards.length);
                    this.state.hand.push(cards.splice(selected, 1)[0]);
                }
            }
            this.setState({ loading: false });
        });
    }
    playCard(card){
        console.log(this.props.gameId, card._id);
        
        Meteor.call('games.playCard', this.props.gameId, card._id, ()=>{})
    }
    renderHand(){
        if (this.state.hand) {
            return this.state.hand.map((card) => <Card.Description className="ur-card" onClick={()=>this.playCard(card)} key={card._id}>{card.name}</Card.Description>);
        }
    }
    render() {
        return (
            <Grid>
                <Grid.Row>
                    {this.renderHand()}
                </Grid.Row>
            </Grid>
        );
    }
}