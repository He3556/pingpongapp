JoinRequests = new Mongo.Collection('join_requests');

Schema.JoinRequest = new SimpleSchema({
  status: {
    type: String,
    autoValue: function() {
      if (this.isInsert) {
        return 'pending';
      }
    }
  },
  user: {
    type: String
  },
  club: {
    type: String
  }
});

JoinRequests.attachSchema(Schema.JoinRequest);

if (Meteor.isServer) {
  JoinRequests.allow({
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

  JoinRequests.deny({
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
