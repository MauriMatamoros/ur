import React from 'react';
import { Grid, Card } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
export default class Hand extends React.Component {
    state = {
        palyerOneCard: {},
        palyerTwoCard: {},
        
        win: 'Waiting player'
    }
    componentDidMount(){
        Meteor.call('games.playerNum', (err, res)=>{
            if(res === 1){
                Meteor.call('')
                this.setState({
                    palyerOneCard: this.props.playerCards[0],
                    palyerTwoCard: this.props.playerCards[1]
                });
            }else if(res === 2){
                this.setState({
                    palyerOneCard: this.props.playerCards[1],
                    palyerTwoCard: this.props.playerCards[0]
                });
            }
        })
    }
    render() {
        let playerTwoState;
        if(!this.state.palyerTwoCard._id){
            playerTwoState = 'Choosing...';
        }else if(!this.state.palyerOneCard._id){
            playerTwoState = 'Waiting for you to choose...'
        }else {
            playerTwoState = this.state.palyerTwoCard.name;
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
                    {this.state.win}
                    </Card.Description>
                </Grid.Row>
                <Grid.Row>
                    <Card.Description className="ur-card">
                    MY CARD: {this.state.palyerOneCard._id?this.state.palyerOneCard.name:'Choose Card...'}
                    </Card.Description>
                </Grid.Row>
            </Grid>
        );
    }
}