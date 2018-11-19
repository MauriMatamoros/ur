import React from 'react';
import { Form, Button, Grid, Select, Message } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';

import Layout from './Layout';

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
];

export default class Register extends React.Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        gender: '',
        loading: false,
        passwordsMatch: true,
        errorMessage: ''
    }
    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ 
            loading: true,
            errorMessage: ''
        });
        if (this.state.passwordsMatch) {
            const user = {
                email: this.state.email,
                password: this.state.password,
                profile: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    gender: this.state.gender
                }
            }
            await Meteor.call('users.createUser', user, (error) => {
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
    }
    render() {
        return (
            <Layout>
                <Grid centered verticalAlign='middle'>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <h3>Register</h3>
                            <Form 
                                warning={!this.state.passwordsMatch} 
                                loading={this.state.loading} 
                                onSubmit={this.onSubmit}
                                error={!!this.state.errorMessage}
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
                                <Form.Field>
                                    <label>Re-type Password</label>
                                    <input 
                                        type="password"
                                        placeholder="********"
                                        onChange={(event) => event.target.value === this.state.password ? this.setState({ passwordsMatch: true }) : this.setState({ passwordsMatch: false }) }
                                    />
                                    <Message
                                        warning
                                        header="Oops!"
                                        content="Your passwords don't match"
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>First Name</label>
                                    <input 
                                        placeholder="John"
                                        value={this.state.firstName}
                                        onChange={(event) => this.setState({ firstName: event.target.value })}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Last Name</label>
                                    <input 
                                        placeholder="Doe"
                                        value={this.state.lastName}
                                        onChange={(event) => this.setState({ lastName: event.target.value })}
                                    />
                                </Form.Field>
                                <Form.Field 
                                    control={Select} 
                                    label='Gender' 
                                    options={options} 
                                    placeholder='Gender' 
                                    value={this.state.gender}
                                    onChange={(event, data) => this.setState({ gender: data.value })}
                                />
                                <Button primary>Register</Button>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
};