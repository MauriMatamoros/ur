import React from 'react';
import { Grid, Card } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
export default class Hand extends React.Component {
    state = {
        playerNumber: 0
    }
    componentDidMount(){
        Meteor.call('games.playerNum', this.props.gameId, (err, res)=>{
            this.setState({
                playerNumber: res
            });  
        })
    }
    getWinner(playerOneCard, playerTwoCard){
        if(!playerOneCard._id || !playerTwoCard._id )
            return 'Waiting players...'
        if(playerOneCard.classType === playerTwoCard.classType)
            return 'It\'s a tie';
        if(playerOneCard.classType.toLowerCase() === 'unicorn' && playerTwoCard.classType.toLowerCase() === 'engineer')
            return 'You win!!'
        if(playerOneCard.classType.toLowerCase() === 'unicorn' && playerTwoCard.classType.toLowerCase() === 'zombie')
            return 'You loose!!'
        if(playerOneCard.classType.toLowerCase() === 'engineer' && playerTwoCard.classType.toLowerCase() === 'unicorn')
            return 'You loose!!'
        if(playerOneCard.classType.toLowerCase() === 'engineer' && playerTwoCard.classType.toLowerCase() === 'zombie')
            return 'You win!!'
        if(playerOneCard.classType.toLowerCase() === 'zombie' && playerTwoCard.classType.toLowerCase() === 'engineer')
            return 'You loose!!'
        if(playerOneCard.classType.toLowerCase() === 'zombie' && playerTwoCard.classType.toLowerCase() === 'unicorn')
            return 'You win!!'
    }
    getPlayerCards(){
        if(this.state.playerNumber === 1){
            return{
                playerOneCard: this.props.playerCards[0],
                playerTwoCard: this.props.playerCards[1]
            }
        }else if(this.state.playerNumber === 2){
            return{
                playerOneCard: this.props.playerCards[1],
                playerTwoCard: this.props.playerCards[0]
            }
        }
        return{
            playerOneCard: {},
            playerTwoCard: {}
        };
    }
    render() {
        const {playerOneCard, playerTwoCard} = this.getPlayerCards();
        let playerTwoState;
        if(!playerTwoCard._id){
            playerTwoState = 'Choosing...';
        }else if(!playerOneCard._id){
            playerTwoState = 'Waiting for you to choose...'
        }else {
            playerTwoState = playerTwoCard.name;
        }
        return (
            <Grid>
                <Grid.Row>
                    <Card.Description className="ur-card">
                    OTHER PLAYER CARD: {playerTwoState}
                    </Card.Description>
                </Grid.Row>
                <Grid.Row>
                    <Card.Description className="ur-card">
                    {this.getWinner(playerOneCard, playerTwoCard)}
                    </Card.Description>
                </Grid.Row>
                <Grid.Row>
                    <Card.Description className="ur-card">
                    MY CARD: {playerOneCard._id?playerOneCard.name:'Choose Card...'}
                    </Card.Description>
                </Grid.Row>
            </Grid>
        );
    }
}