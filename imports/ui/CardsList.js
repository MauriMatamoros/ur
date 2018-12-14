import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Form, Modal, Message, Table, Pagination, Grid } from 'semantic-ui-react';

import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';
import { Cards } from '../api/cards';
import CardRow from './CardRow';
import Layout from './Layout';


export default class CardsList extends React.Component{
    state = {
        isAdmin: false,
        cards: [],
        name: '',
        imageUrl: '',
        classType: '',
        description: '',
        modalOpen: false,
        errorMessage: '',
        loading: false,
        activePage: 1,
        totalPages: 0
    }
    handlePaginationChange = (e, { activePage }) => { 
        const cards = Cards.find({}, { skip: 10 * (activePage - 1), limit: 10 }).fetch();
        this.setState({ activePage, cards }) 
    };
    handleOpen = () => this.setState({ modalOpen: true });
    handleClose = () => this.setState({ modalOpen: false });
    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ 
            loading: true,
            errorMessage: ''
        });
        const { name, imageUrl, classType, description } = this.state;
        const card = {
            name, 
            imageUrl, 
            classType, 
            description
        };
        await Meteor.call('cards.insert', card, async (error, res) => {
            if (error) {
                this.setState({
                    loading: false,
                    errorMessage: error.message
                });
            } else {
                const accounts = await web3.eth.getAccounts();
                try {
                    await factory.methods
                        .createCard(1, res)
                        .send({
                            from: accounts[0]
                        });
                } catch (error) {
                    await Meteor.call('cards.remove', res);
                    this.setState({ errorMessage: error.message });
                }
                this.setState({ loading: false });
                this.handleClose();
            }
        });
        this.setState({
            name: '',
            imageUrl: '',
            classType: '',
            description: '',
        });
    }
    componentDidMount() {
        this.tracker = Tracker.autorun( async () => {
            Meteor.subscribe('cards');
            const cards = Cards.find({}, { skip: 0, limit: 10 }).fetch();
            const totalPages = Cards.find({}).fetch().length / 2;
            this.setState({ cards });
            Meteor.call('users.isAdmin', (error, result) => {
                this.setState({ 
                    isAdmin: result,
                    cards,
                    totalPages
                });
            });
        });
    }
    componentWillUnmount() {
        this.tracker.stop();
    }
    renderCards = () => {
        return this.state.cards.map((card) => <CardRow key={card._id} {...card}/>);
    }
    renderTrigger = () => {
        return (
            this.state.isAdmin ? 
            <Button 
                primary 
                onClick={this.handleOpen} 
                floated="right">
                Create a Card
            </Button>
            : null
        );
    }
    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        return (
            <Layout>
            <Table>
            <Header>
                <Row>
                    <HeaderCell>ID</HeaderCell>
                    <HeaderCell>Name</HeaderCell>
                    <HeaderCell>Image Url</HeaderCell>
                    <HeaderCell>Class</HeaderCell>
                    <HeaderCell>Description</HeaderCell>
                    <HeaderCell>Owner</HeaderCell>
                    <HeaderCell>For Trade</HeaderCell>
                    <HeaderCell>In detail</HeaderCell>
                </Row>
            </Header>
            <Body>
                {this.renderCards()}
            </Body>
        </Table>
                <Modal 
                    trigger={this.renderTrigger()}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                >
                    <Modal.Header>Add a Card</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Form
                                onSubmit={this.onSubmit}
                                error={!!this.state.errorMessage}
                                loading={this.state.loading}
                            >
                                <Form.Field>
                                    <label>Name</label>
                                    <input 
                                        placeholder="Nicol Bolas, Planeswalker"
                                        value={this.state.name}
                                        onChange={(event) => this.setState({ name: event.target.value })}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Image Url</label>
                                    <input 
                                        placeholder="https://d1u5p3l4wpay3k.cloudfront.net/mtgsalvation_gamepedia/8/8d/Nicol_Bolas%2C_Planeswalker.jpg?version=dac2ccbf29fb1472b25bdcee62a89d7c"
                                        value={this.state.imageUrl}
                                        onChange={(event) => this.setState({ imageUrl: event.target.value })}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Class</label>
                                    <input 
                                        placeholder="Class Type"
                                        value={this.state.classType}
                                        onChange={(event) => this.setState({ classType: event.target.value })}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Description</label>
                                    <input 
                                        placeholder="Description"
                                        value={this.state.description}
                                        onChange={(event) => this.setState({ description: event.target.value })}
                                    />
                                </Form.Field>
                                <Message
                                    error
                                    header="Oops!"
                                    content={this.state.errorMessage}
                                />
                                <Button primary fluid>Create</Button>
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
                <Grid>
                    <Grid.Row centered>
                        <Pagination
                        activePage={this.state.activePage}
                        onPageChange={this.handlePaginationChange}
                        totalPages={this.state.totalPages}
                        />
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}