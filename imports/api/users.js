import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
    'users.createUser'(user) {
        Roles.addUsersToRoles(Accounts.createUser(user), 'client');
    },
    async 'users.isAdmin'() {
        return await Roles.userIsInRole(Meteor.userId(), 'admin')
    }
});