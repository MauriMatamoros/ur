import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { Cards } from './cards';

export const Games = new Mongo.Collection('game');

if (Meteor.isServer) {
    Meteor.publish('games', () => {
        return Games.find({});
    });
    Meteor.publish('game', (_id) => {
        return Games.findOne({_id});
    })
}

Meteor.methods({
    'games.create'() {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        return Games.insert({
            playerOne: this.userId,
            playerTwo: '',
            playerOneCards:'',
            playerTwoCards:''
        });
    },
    'games.join'(id){
        const game = Games.findOne({
            _id:id,
        });
        if(game.playerOne && game.playerTwo){
            return game;
        }
        if(game.playerOne === this.userId){
            return game;
        }
        if(game.playerTwo === this.userId){
            return game;
        }
        if(game.playerOne === ''){
            return Games.update({_id:id},{
                $set:{
                    playerOne:this.userId
                }
            });
        }
        if(game.playerTwo === ''){
            return Games.update({_id:id},{
                $set:{
                    playerTwo:this.userId
                }
            });
        }
        return game;
    },
    'games.playCard'(id, cardId){
        const game = Games.findOne({
            _id:id,
        });
        if(game.playerOne === this.userId){
            return Games.update({
                _id:id
            },{
                $set:{
                    playerOneCards: Cards.findOne(cardId)
                }
            });
        }else{
            Games.update({
                _id:id
            },{
                $set:{
                    playerTwoCards: Cards.findOne(cardId)
                }
            });
        }
        Games.save(game);
    },
    'games.playerNum'(){
        const game = Games.findOne({
            _id:id,
        });
        if(game.playerOne === this.userId){
            return 1;
        }
        if(game.playerTwo === this.userId){
            return 2;
        }
        return 0;
    },
    'games.list' () {
        return Games.find({});
    }
});