import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';

import { history } from '../routes/routes';

export default class Decks extends React.Component {
    render() {
        const { _id, name, cards } = this.props;
        return (
            <Card>
                <Card.Content>
                    <Card.Header>{name}</Card.Header>
                    <Card.Meta>{_id}</Card.Meta>
                    <Card.Description>
                        {cards[0].name} {cards[1] ? `${cards[1].name},` : undefined} { cards[2] ? `${cards[2].name},` : undefined} ...
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                    <Button primary onClick={() => history.push(`/deck/${_id}/details`)}>
                        View Details
                    </Button>
                    <Button 
                        basic 
                        primary
                        onClick={() => Meteor.call('decks.remove', _id)}
                    >
                        Delete
                    </Button>
                    </div>
                </Card.Content>
            </Card>
        );
    }
};