import { Dimmer, Loader, Image, Message, Card, Button, Icon } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import React from 'react';

import web3 from '../ethereum/web3';
import CardInstance from '../ethereum/card';
import factory from '../ethereum/factory';
import Layout from './Layout';

export default class Trade extends React.Component {
    state = {
        card: {},
        buttonLoading: false,
        loading: true,
        errorMessage: '',
        successMessage: '',
        address: ''
    }
    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const address = await factory.methods.getCardAddress(id).call();
        this.setState({ address });
        Meteor.call('cards.details', id, (error, result) => {
            if (error) {
                this.setState({ errorMessage: error.message });
            } else {
                this.setState({ card: result });
            }
            this.setState({ loading: false });
        });
    }
    tradeCard = async () => {
        this.setState({ buttonLoading: true })
        Meteor.call('cards.setForTrade', this.state.card._id, async (error, result) => {
            if (result === 0) {
                this.setState({ errorMessage: 'The transaction could not go through' });
            } else {
                const accounts = await web3.eth.getAccounts();
                const card = CardInstance(this.state.address);
                try {
                    await card.methods
                        .setForTrade()
                        .send({
                            from: accounts[0]
                        });
                    this.setState({ 
                        successMessage: 'You made the card available for trade!',
                        buttonLoading: false
                    });
                } catch (error) {
                    await Meteor.call('cards.cancelSetForTrade', this.state.card._id);
                    this.setState({ errorMessage: error.message });
                }
            }
        });
    }
    unTradeCard = async () => {
        this.setState({ buttonLoading: true })
        const accounts = await web3.eth.getAccounts();
        const card = CardInstance(this.state.address);
        Meteor.call('cards.cancelSetForTrade', this.state.card._id, async (error, result) => {
            if (result === 0) {
                this.setState({ errorMessage: 'The transaction could not go through' });
            } else {
                try {
                    await card.methods
                        .removeFromTrade()
                        .send({
                            from: accounts[0]
                        });
                    this.setState({ 
                        successMessage: 'You made the card unavailable for trade!',
                        buttonLoading: false
                    });
                } catch (error) {
                    await Meteor.call('cards.setForTrade', this.state.card._id);
                    this.setState({ errorMessage: error.message });
                }
            }
        });
    }
    renderCard = () => {
        if (this.state.card) {
            return (
                <Card centered>
                    <Image src={this.state.card.imageUrl} size='medium'/>
                    <Card.Content>
                        <Card.Header>{this.state.card.name}</Card.Header>
                        <Card.Meta>
                            <span className='date'>{this.state.card.classType}</span>
                        </Card.Meta>
                        <Card.Description>{this.state.card.description}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button primary onClick={this.tradeCard} loading={this.state.buttonLoading}>
                        <Button.Content>Set for trade</Button.Content>
                        </Button>
                        <Button basic primary onClick={this.unTradeCard} loading={this.state.buttonLoading}>
                        <Button.Content>Remove from trade</Button.Content>
                        </Button>
                    </div>
                    </Card.Content>
                </Card>
            );
        }
    }
    render() {
        return (
            <Layout>
                <Dimmer active={this.state.loading}>
                    <Loader></Loader>
                </Dimmer>
                {!!this.state.successMessage ? <Message 
                    success
                    header="Congrats!"
                    content={this.state.successMessage}
                /> : null
                }
                {!!this.state.errorMessage ? <Message 
                    error
                    header="Oops!"
                    content={this.state.errorMessage}
                /> : this.renderCard()
                }
            </Layout>
        );
    }
}