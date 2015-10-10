Clubs = new Mongo.Collection('clubs');

Schemas.Club = new SimpleSchema({
  createdAt: {
    type: Date,
    label: "Created At"
  },
  name: {
    type: String,
    label: 'Name',
    max: 100
  },
  owners: {
    type: [String],
    label: "Owners",
    optional: false
  },
  members: {
    type: Array,
    label: 'Members'
  },
  "members.$" {
    type: Object
  }
  "members.$.user": {
    type: String
  }
  "members.$.rating": {
    type: Number
  }
});

Clubs.attachSchema(Schemas.Club);

if (Meteor.isServer) {
  Clubs.allow({
    insert: function (userId, doc) {
      return userId != null;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return Roles.userIsInRole(userId, ['admin']) || 
             doc.owners.indexOf(userId) >= 0;
    },

    remove: function (userId, doc) {
      return false;
    }
  });

  Clubs.deny({
    insert: function (userId, doc) {
      return false;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return false;
    },

    remove: function (userId, doc) {
      return true;
    }
  });
}
