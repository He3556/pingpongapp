Requests = new Mongo.Collection('requests');

Schema.Request = new SimpleSchema({
  club: {
    type: String
  },
  challenger: {
    type: String
  },
  opponent: {
    type: String
  },
  status: {
    type: String,
    autoValue: function() {
      if (this.isInsert) {
        return "new";
      }
    }
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      }
    }
  }
});

Requests.attachSchema(Schema.Request);

if (Meteor.isServer) {
  Requests.allow({
    insert: function (userId, doc) {
      if (userId !== doc.challenger)
        return false;

      var club = Clubs.findOne({
        _id: doc.club,
        $and: [
          { "members.user": doc.challenger },
          { "members.user": doc.opponent },
        ]
      });
      if (!club)
        return false;

      return true;

    },

    update: function (userId, doc, fieldNames, modifier) {
      return false;
    },

    remove: function (userId, doc) {
      return false;
    }
  });

  Requests.deny({
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
