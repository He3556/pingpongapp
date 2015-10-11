Games = new Mongo.Collection('games');

Schema.GamePlayer = new SimpleSchema({
  user: {
    type: String
  },
  score: {
    type: Number
  }
});

Schema.Game = new SimpleSchema({
  match: {
    type: String
  },
  players: {
    type: [Schema.GamePlayer]
  },
  winner: {
    type: String,
    autoValue: function() {
      if (this.isInsert) {
        var players = this.field('players').value;
        if (!players) return;
        if (players[0].score > players[1].score) {
          return players[0].user;
        } else {
          return players[1].user;
        }
      }
    }
  }
});

Games.attachSchema(Schema.Game);

if (Meteor.isServer) {
  Games.allow({
    insert: function (userId, doc) {
      if (doc.players.find(function(player) {
            return player.user === userId;
          }) !== null) {
        return true;
      }
      return false;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return false;
    },

    remove: function (userId, doc) {
      return false;
    }
  });

  Games.deny({
    insert: function (userId, doc) {
      return false;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return true;
    }
  });
}
