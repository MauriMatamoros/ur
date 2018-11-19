import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export default class NavBar extends React.Component {
    state = {
        loggedIn: false
    }
    componentDidMount() {
        this.tracker = Tracker.autorun(() => {
            const loggedIn = !!Meteor.userId();
            this.setState({ loggedIn });
        });
    }
    componentWillUnmount() {
        this.tracker.stop();
    }
    render() {
        return (
            <Menu>
                <Menu.Item>Ur</Menu.Item>
                <Menu.Item position="right">
                    { this.state.loggedIn ? <Link to="/" onClick={() => Accounts.logout()}>Logout</Link> : <Link to="/login">Login</Link>}
                </Menu.Item>
            </Menu>
        );
    }
};