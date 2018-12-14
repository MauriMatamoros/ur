import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

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
            playerOneCards:[],
            playerTwoCards:[]
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
                $push:{
                    playerOneCards: cardId
                }
            });
        }else{
            Games.update({
                _id:id
            },{
                $push:{
                    playerOneCards: cardId
                }
            });
        }
        Games.save(game);
    },
    'games.list' () {
        return Games.find({});
    }
});