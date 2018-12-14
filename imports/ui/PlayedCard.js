import React from 'react';
import { Grid, Card } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
export default class Hand extends React.Component {
    state = {
        playerOneCard: {},
        playerTwoCard: {},
    }
    componentDidMount(){
        Meteor.call('games.playerNum', (err, res)=>{
            if(res === 1){
                Meteor.call('')
                this.setState({
                    playerOneCard: this.props.playerCards[0],
                    playerTwoCard: this.props.playerCards[1]
                });
            }else if(res === 2){
                this.setState({
                    playerOneCard: this.props.playerCards[1],
                    playerTwoCard: this.props.playerCards[0]
                });
            }
        })
    }
    getWinner(){
        if(!this.state.playerOneCard._id || !this.state.playerTwoCard._id )
            return 'Waiting players...'
        if(this.state.playerOneCard.classType === this.state.playerTwoCard.classType)
            return 'It\'s a tie';
        if(this.state.playerOneCard.classType.toLowerCase() === 'unicorn' && this.state.playerTwoCard.classType.toLowerCase() === 'engineer')
            return 'You win!!'
        if(this.state.playerOneCard.classType.toLowerCase() === 'unicorn' && this.state.playerTwoCard.classType.toLowerCase() === 'zombie')
            return 'You loose!!'
        if(this.state.playerOneCard.classType.toLowerCase() === 'engineer' && this.state.playerTwoCard.classType.toLowerCase() === 'unicorn')
            return 'You loose!!'
        if(this.state.playerOneCard.classType.toLowerCase() === 'engineer' && this.state.playerTwoCard.classType.toLowerCase() === 'zombie')
            return 'You win!!'
        if(this.state.playerOneCard.classType.toLowerCase() === 'zombie' && this.state.playerTwoCard.classType.toLowerCase() === 'engineer')
            return 'You loose!!'
        if(this.state.playerOneCard.classType.toLowerCase() === 'zombie' && this.state.playerTwoCard.classType.toLowerCase() === 'unicorn')
            return 'You win!!'
    }
    render() {
        let playerTwoState;
        if(!this.state.playerTwoCard._id){
            playerTwoState = 'Choosing...';
        }else if(!this.state.playerOneCard._id){
            playerTwoState = 'Waiting for you to choose...'
        }else {
            playerTwoState = this.state.playerTwoCard.name;
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
                    {this.getWinner()}
                    </Card.Description>
                </Grid.Row>
                <Grid.Row>
                    <Card.Description className="ur-card">
                    MY CARD: {this.state.playerOneCard._id?this.state.playerOneCard.name:'Choose Card...'}
                    </Card.Description>
                </Grid.Row>
            </Grid>
        );
    }
}