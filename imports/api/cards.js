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

        Cards.insert({
            name,
            imageUrl,
            classType,
            description,
            owner: null
        });
    }
});