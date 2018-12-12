import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Button, Table, Form, Message } from 'semantic-ui-react';

import Layout from './Layout';
import { Cards } from '../api/cards';
import { history } from '../routes/routes';

export default class DeckCreator extends React.Component {
    state = {
        cards: [],
        inDeck: [],
        name: '',
        errorMessage: '',
        loading: false
        
    }
    componentDidMount() {
        this.tracker = Tracker.autorun( async () => {
            Meteor.subscribe('myCards');
            const cards = Cards.find({}).fetch();
            this.setState({ cards });
        });
    }
    componentWillUnmount() {
        this.tracker.stop();
    }
    renderRowsOfCards() {
        const { Row, Cell } = Table;
        return this.state.cards.map(({_id, name, classType, description}) => ((
            <Row key={_id}>
                <Cell>{_id}</Cell>
                <Cell>{name}</Cell>
                <Cell>{classType}</Cell>
                <Cell>{description}</Cell>
                <Cell>
                    <Button 
                        primary
                        type="button"
                        onClick={() => {
                            this.setState({ errorMessage: '' });
                            const inDeck = this.state.inDeck;
                            const card = this.state.cards.find((card) => card._id === _id);
                            if (inDeck.find((cardInDeck) => card._id === cardInDeck._id)) {
                                this.setState({ errorMessage: `${card.name} is already in the Deck` });
                            } else {
                                inDeck.push(card);
                                this.setState({ inDeck })
                            }
                        }}
                    >Add</Button>
                </Cell>
            </Row>
        )));
    }
    renderInDeck() {
        const { Row, Cell } = Table;
        return this.state.inDeck.map(({_id, name, classType, description}) => ((
            <Row key={_id}>
                <Cell>{_id}</Cell>
                <Cell>{name}</Cell>
                <Cell>{classType}</Cell>
                <Cell>{description}</Cell>
                <Cell>
                    <Button 
                        primary
                        type="button"
                        onClick={() => {
                            this.setState({ errorMessage: '' });
                            const inDeck = this.state.inDeck.filter((card) => card._id !== _id);
                            this.setState({ inDeck });
                        }}
                    >Remove</Button>
                </Cell>
            </Row>
        )));
    }
    onSubmit = (event) => {
        event.preventDefault();
        this.setState({ errorMessage: '' });
        if ((this.state.inDeck.length > 12) || this.state.inDeck.length === 0) {
            this.setState({ 
                loading: true,
                errorMessage: "You're deck can't have more than 12 cards nor can it be empty" 
            })
        } else {
            const deck = {
                name: this.state.name,
                cards: this.state.inDeck
            };
            Meteor.call('decks.insert', deck, (err, res) => {
                if (err) {
                    this.setState({
                        loading: false,
                        errorMessage: error.message
                    });
                } else {
                    history.push('/myDecks');
                }
            });
        }
        this.setState({ loading: false });
    }
    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        return (
            <Layout>
                <Form 
                    onSubmit={this.onSubmit}
                    error={!!this.state.errorMessage}
                    loading={this.state.loading}
                >
                    <Message
                        error
                        header="Oops!"
                        content={this.state.errorMessage}
                    />
                    <h2>Name</h2>
                    <input 
                        placeholder="Name"
                        value={this.state.name}
                        onChange={(event) => this.setState({ name: event.target.value })}
                    />
                    <br></br>
                    <br></br>
                    <Grid columns={2}>
                        <Grid.Row centered>
                            <Grid.Column>
                                <h3>Cards in Deck</h3>
                                <Table>
                                    <Header>
                                        <Row>
                                            <HeaderCell>ID</HeaderCell>
                                            <HeaderCell>Name</HeaderCell>
                                            <HeaderCell>Class</HeaderCell>
                                            <HeaderCell>Description</HeaderCell>
                                            <HeaderCell>Action</HeaderCell>
                                        </Row>
                                    </Header>
                                    <Body>
                                        {this.renderInDeck()}
                                    </Body>
                                </Table>
                            </Grid.Column>
                            <Grid.Column>
                                <h3>My Cards</h3>
                                <Table>
                                    <Header>
                                        <Row>
                                            <HeaderCell>ID</HeaderCell>
                                            <HeaderCell>Name</HeaderCell>
                                            <HeaderCell>Class</HeaderCell>
                                            <HeaderCell>Description</HeaderCell>
                                            <HeaderCell>Action</HeaderCell>
                                        </Row>
                                    </Header>
                                    <Body>
                                        {this.renderRowsOfCards()}
                                    </Body>
                                </Table>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Button primary>Create</Button>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Layout>
        );
    }
}