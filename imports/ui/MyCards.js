import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Table, Pagination, Grid } from 'semantic-ui-react';

import { Cards } from '../api/cards';
import CardRowTrade from './CardRowTrade';
import Layout from './Layout';


export default class MyCards extends React.Component{
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
        totalPages: 0,
    }
    handlePaginationChange = (e, { activePage }) => { 
        const cards = Cards.find({}, { skip: 10 * (activePage - 1), limit: 10 }).fetch();
        this.setState({ activePage, cards }) 
    };
    componentDidMount() {
        this.tracker = Tracker.autorun( async () => {
            Meteor.subscribe('myCards');
            const cards = Cards.find({}, { skip: 0, limit: 10 }).fetch();
            const totalPages = Cards.find({}).fetch().length / 10;
            this.setState({ cards, totalPages });
        });
    }
    componentWillUnmount() {
        this.tracker.stop();
    }
    renderCards = () => {
        return this.state.cards.map((card) => <CardRowTrade key={card._id} {...card}/>);
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
                    <HeaderCell>In detail</HeaderCell>
                </Row>
            </Header>
            <Body>
                {this.renderCards()}
            </Body>
        </Table>
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