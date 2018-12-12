import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Games = new Mongo.Collection('game');

if (Meteor.isServer) {
    Meteor.publish('games', () => {
        return Games.find({});
    })
}