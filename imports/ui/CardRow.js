import React from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class CardRow extends React.Component {
    render() {
        const { Row, Cell } = Table;
        const { _id, name, imageUrl, classType, description, owner} = this.props;
        return (
            <Row>
                <Cell>{_id}</Cell>
                <Cell>{name}</Cell>
                <Cell><a target='_blank' href={imageUrl}>image</a></Cell>
                <Cell>{classType}</Cell>
                <Cell>{description}</Cell>
                <Cell>{owner}</Cell>
                <Cell>
                    <Link to={`/cards/${_id}/details`}>View</Link>
                </Cell>
            </Row>
        );
    }
}