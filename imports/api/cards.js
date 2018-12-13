import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { Decks } from './decks';

export const Cards = new Mongo.Collection('cards');

if (Meteor.isServer) {
    Meteor.publish('cards', () => {
        return Cards.find({});
    });
    Meteor.publish('myCards', function () {
        return Cards.find({ owner: this.userId });
    });
}

Meteor.methods({
    'cards.insert'({ name, imageUrl, classType, description, price }) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        if (!Roles.userIsInRole(this.userId, 'admin')) {
            throw new Meteor.Error('not-authorized');
        }
        const card = Cards.insert({
            name,
            imageUrl,
            classType,
            description,
            price,
            trade: false,
            owner: null
        });
        return card;
    },
    'cards.remove'(_id) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        if (!Roles.userIsInRole(this.userId, 'admin')) {
            throw new Meteor.Error('not-authorized');
        }
        Cards.remove({_id});
    },
    'cards.removeOwner'(_id) {
        Cards.update({ _id }, { $set: {owner: null, trade: false }});
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
        if (Cards.findOne({ _id, trade: true })) {
            return await Cards.update({ _id, trade: true }, { $set: { owner: this.userId, trade: false }});
        } else {
            return await Cards.update({ _id, owner: null }, { $set: { owner: this.userId }});
        } 
    },
    async 'cards.setForTrade'(_id) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        const card = Cards.findOne({ _id });
        Decks.update({}, { $pull: { cards: card } });
        return await Cards.update({ _id, owner: this.userId }, { $set: { trade: true }});
    },
    async 'cards.cancelSetForTrade'(_id) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        return await Cards.update({ _id, owner: this.userId }, { $set: { trade: false }});
    }
});