import { Dimmer, Loader, Image, Message, Card, Button, Icon } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import React from 'react';

import web3 from '../ethereum/web3';
import CardInstance from '../ethereum/card';
import factory from '../ethereum/factory';
import Layout from './Layout';

export default class CardDetails extends React.Component {
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
    buyCard = () => {
        this.setState({ buttonLoading: true })
        Meteor.call('cards.buy', this.state.card._id, async (error, result) => {
            if (result === 0) {
                this.setState({ errorMessage: 'The transaction could not go through' });
            } else {
                const accounts = await web3.eth.getAccounts();
                const card = CardInstance(this.state.address);
                const userId = await Meteor.userId();
                try {
                    await card.methods
                        .buy(userId)
                        .send({
                            from: accounts[0]
                        });
                    this.setState({ 
                        successMessage: 'You bought the card!',
                        buttonLoading: false
                    });
                } catch (error) {
                    await Meteor.call('cards.removeOwner', this.state.card._id);
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
                    <Button animated='vertical' fluid primary onClick={this.buyCard} loading={this.state.buttonLoading}>
                    <Button.Content hidden>Buy</Button.Content>
                        <Button.Content visible>
                            <Icon name='shop' />
                        </Button.Content>
                    </Button>
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