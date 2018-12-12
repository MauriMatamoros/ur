import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Decks = new Mongo.Collection('decks');

if (Meteor.isServer) {
    Meteor.publish('decks', function () {
        return Decks.find({ owner: this.userId });
    });
}

Meteor.methods({
    'decks.insert'({name, cards, owner}) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        Decks.insert({
            name,
            cards,
            owner
        });
    },
    'decks.remove'(_id) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        return Decks.remove({ _id, owner: this.userId });
    },
    'decks.remove-card'(_id) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        Decks.update({}, { $pull: { cards: _id } });
    }
});
