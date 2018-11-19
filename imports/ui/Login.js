import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Form, Button, Grid, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Layout from './Layout';

export default class Login extends React.Component {
    state = {
        email: '',
        password: '',
        errorMessage: '',
        loading: false
    }
    onSubmit = async (event) => {
        event.preventDefault();
        const email = this.state.email;
        this.setState({ 
            loading: true,
            errorMessage: '' 
        });
        await Meteor.loginWithPassword({ email }, this.state.password, (error) => {
            if (error) {
                this.setState({ 
                    loading: false,
                    errorMessage: error.message 
                });
            } else {
                this.setState({ loading: false });
            }
        });
    }
    render() {
        return (
            <Layout>
                <Grid centered verticalAlign='middle'>
                    <Grid.Row>
                        <Grid.Column width={7}>
                            <h3>Login</h3>
                            <Form 
                                error={!!this.state.errorMessage}
                                loading={this.state.loading}
                                onSubmit={this.onSubmit}
                            >
                                <Message 
                                    error
                                    header="Oops!"
                                    content={this.state.errorMessage}
                                />
                                <Form.Field>
                                    <label>Email</label>
                                    <input
                                        placeholder="john@example.com"
                                        value={this.state.email}
                                        onChange={(event) => this.setState({ email: event.target.value })}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Password</label>
                                    <input 
                                        type="password"
                                        placeholder="********"
                                        value={this.state.password}
                                        onChange={(event) => this.setState({ password: event.target.value })}
                                    />
                                </Form.Field>
                                <Link to="/register">Need an account?</Link>
                                <Button primary floated="right">Login</Button>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}