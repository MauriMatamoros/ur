import { Dimmer, Loader, Image, Message, Card, Button, Icon } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import React from 'react';

import Layout from './Layout';

export default class CardDetails extends React.Component {
    state = {
        card: {},
        buttonLoading: false,
        loading: true,
        errorMessage: '',
        successMessage: ''
    }
    componentDidMount() {
        const { id } = this.props.match.params;
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
        Meteor.call('cards.buy', this.state.card._id, (error, result) => {
            if (result === 0) {
                this.setState({ errorMessage: 'The transaction could not go through' });
            } else {
                this.setState({ 
                    successMessage: 'You bought the card!',
                    buttonLoading: false
                });
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