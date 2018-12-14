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
                if(this.state.deck.cards.length === 0){
                    this.setState({
                        deck:{
                            name: 'Prueba',
                            cards: [
                                {
                                    "_id": "zLYJyYGuQkypiYH45",
                                    "name": "Civil Engineer",
                                    "imageUrl": "",
                                    "classType": "Engineer",
                                    "description": "A concrete fanatic.",
                                    "trade": false,
                                    "owner": "eqpWnpqiobhrqBbLE"
                                },
                                {
                                    "_id": "7j5athqagpsG8iZuq",
                                    "name": "Software Engineer",
                                    "imageUrl": "",
                                    "classType": "Engineer",
                                    "description": "Hello World!",
                                    "trade": false,
                                    "owner": "eqpWnpqiobhrqBbLE"
                                },
                                {
                                    "_id": "6nitENLFABYrZKkcK",
                                    "name": "Electrical Engineer",
                                    "imageUrl": "",
                                    "classType": "Engineer",
                                    "description": "ZaZ",
                                    "trade": false,
                                    "owner": "eqpWnpqiobhrqBbLE"
                                },
                                {
                                    "_id": "2BADXJ5h8WW7wcB83",
                                    "name": "Mechanical Engineer",
                                    "imageUrl": "",
                                    "classType": "Engineer",
                                    "description": "Big metal Fan!",
                                    "trade": false,
                                    "owner": "eqpWnpqiobhrqBbLE"
                                },
                                {
                                    "_id": "rzbhMGdFP7KPJdE2f",
                                    "name": "Zombie girl",
                                    "imageUrl": "",
                                    "classType": "Zombie",
                                    "description": "Guuuurrrrl",
                                    "trade": false,
                                    "owner": "eqpWnpqiobhrqBbLE"
                                },
                                {
                                    "_id": "yb7kLLW83YWsmFnoD",
                                    "name": "Zombie boy",
                                    "imageUrl": "",
                                    "classType": "Zombie",
                                    "description": "Boooooooy",
                                    "trade": false,
                                    "owner": "eqpWnpqiobhrqBbLE"
                                },
                                {
                                    "_id": "3SKK3nDdx8CtygG95",
                                    "name": "Meta OneCord",
                                    "imageUrl": "",
                                    "classType": "Unicorn",
                                    "description": "Meta meta",
                                    "trade": false,
                                    "owner": "eqpWnpqiobhrqBbLE"
                                },
                                {
                                    "_id": "AfEWBHQePcGvmi8yN",
                                    "name": "Zomby",
                                    "imageUrl": "",
                                    "classType": "Zombie",
                                    "description": "Zommmmmbyyyy",
                                    "trade": false,
                                    "owner": "eqpWnpqiobhrqBbLE"
                                },
                                {
                                    "_id": "mhjpGKbXwzZZd3yyA",
                                    "name": "Unycorn",
                                    "imageUrl": "",
                                    "classType": "Unicorn",
                                    "description": "Uny",
                                    "trade": false,
                                    "owner": "eqpWnpqiobhrqBbLE"
                                }
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
    playCard(card){
        // Meteor.call('game.playCard', card, ()=>{})
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