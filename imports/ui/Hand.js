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
        Meteor.call('decks.details', id, (error, result) => {
            console.log(result);
            if (error) {
                this.setState({ errorMessage: error.message });
            } else {
                this.setState({ deck: result || {cards:[]} });
                if(this.state.deck.cards.length === 0){
                    this.setState({
                        deck:{
                            name: 'Prueba',
                            cards:[
                                {name:'11'},
                                {name:'21'},
                                {name:'31'},
                                {name:'41'},
                                {name:'51'},
                                {name:'61'},
                                {name:'71'},
                                {name:'81'},
                                {name:'91'},
                                {name:'101'},
                                {name:'111'},
                                {name:'121'},
                            ]
                        }
                    });
                }
                for(let i = 0; i < 3; i++){
                    const cards = this.state.deck.cards;
                    const selected = Math.floor(Math.random()*cards.length);
                    this.state.hand.push(cards.splice(selected, 1)[0]);
                }
            }
            this.setState({ loading: false });
        });
    }
    renderHand(){
        if (this.state.hand) {
            return this.state.hand.map((card, idx) => <Card.Description key={idx}>{card.name}</Card.Description>);
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