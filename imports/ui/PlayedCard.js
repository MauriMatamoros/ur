import React from 'react';
import { Grid, Card } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
export default class Hand extends React.Component {
    state = {
        palyerOneCard: '',
        palyerTwoCard: '',
    }
    componentDidMount(){
        Meteor.call('games.playerNum', (err, res)=>{
            if(res === 1){
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
        return (
            <Grid>
                <Grid.Row>
                    <Card.Description className="ur-card">
                    OTHER PLAYER CARD: {this.state.palyerTwoCard}
                    </Card.Description>
                </Grid.Row>
                <Grid.Row>
                    <Card.Description className="ur-card">
                    MY CARD: {this.state.palyerOneCard}
                    </Card.Description>
                </Grid.Row>
            </Grid>
        );
    }
}