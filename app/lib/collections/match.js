Matches = new Mongo.Collection('matches');

Schema.Match = new SimpleSchema({
  club: {
    type: String,
    index: 1
  },
  players: {
    type: Array,
    index: 1
  },
  'players.$': {
    type: Object
  },
  'players.$.user': {
    type: String
  },
  'players.$.expected': {
    type: Number,
    decimal: true
  },
  winner: {
    type: String,
    optional: true
  },
  status: {
    type: String,
    index: 1,
    autoValue: function() {
      if (this.isInsert) {
        return "active";
      }
    }
  },
  createdAt: {
    type: Date,
    index: 1,
    denyUpdate: true,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      }
    }
  },
  finishedAt: {
    index: 1,
    type: Date,
    optional: true
  }
});

Matches.attachSchema(Schema.Match);

if (Meteor.isServer) {
  Matches.allow({
    insert: function (userId, doc) {
      return false;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return false;
    },

    remove: function (userId, doc) {
      return false;
    }
  });

  Matches.deny({
    insert: function (userId, doc) {
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return true;
    }
  });
}
