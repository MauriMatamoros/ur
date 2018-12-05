import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Cards = new Mongo.Collection('cards');

if (Meteor.isServer) {
    Meteor.publish('cards', () => {
        return Cards.find({});
    });
}

Meteor.methods({
    'cards.insert'({ name, imageUrl, classType, description }) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        if (!Roles.userIsInRole(this.userId, 'admin')) {
            throw new Meteor.Error('not-authorized');
        }
        Cards.insert({
            name,
            imageUrl,
            classType,
            description,
            owner: null
        });
    },
    'cards.total'() {
        return Cards.find({}).count();
    },
    async 'cards.details'(_id) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        return await Cards.findOne({ _id });
    },
    async 'cards.buy'(_id) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        return await Cards.update({ _id, owner: null }, { $set: { owner: this.userId }});
    }
});