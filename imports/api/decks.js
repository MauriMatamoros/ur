import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Decks = new Mongo.Collection('decks');

if (Meteor.isServer) {
    Meteor.publish('decks', () => {
        return Decks.find({});
    });
}

