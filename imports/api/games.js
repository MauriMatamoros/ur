import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Games = new Mongo.Collection('game');

if (Meteor.isServer) {
    Meteor.publish('games', () => {
        return Games.find({});
    })
}

Meteor.methods({
    'games.create'() {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        Games.insert({
            playerOne: this.userId,
            playerTwo: '',
            turnOne: 0,
            tuneTwo: 0,
            turnThree: 0
        });
    }
});