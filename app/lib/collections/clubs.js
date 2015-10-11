Clubs = new Mongo.Collection('clubs');

Schema.Club = new SimpleSchema({
  createdAt: {
    type: Date,
    label: "Created At",
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();
      }
    },
    autoform: {
      omit: true
    }
  },
  name: {
    type: String,
    label: 'Name',
    max: 100,
    optional: false,
    index: 1,
    unique: true
  },
  slug: {
    type: String,
    label: 'Slug',
    autoform: {
      omit: true
    },
    autoValue: function() {
      if (this.isInsert) {
        return slugify(this.field('name').value);
      }
    }
  },
  owners: {
    type: [String],
    label: "Owners",
    optional: false,
    autoValue: function() {
      if (this.isInsert) {
        return [this.userId];
      } else if (this.isUpsert) {
        return {$setOnInsert: [this.userId]};
      }
    }
  },
  members: {
    type: Array,
    label: 'Members',
    optional: false,
    autoValue: function() {
      console.log(this);
      if (this.isInsert) {
        return [{ user: this.userId, rating: 3}];
      } else if (this.isUpsert) {
        return {$setOnInsert: [{ user: this.userId, rating: 3}] };
      }
    }
  },
  "members.$": {
    type: Object
  },
  "members.$.user": {
    type: String,
    optional: false
  },
  "members.$.rating": {
    type: Number,
    optional: false
  },
  memberCount: {
    type: Number,
    label: "Member Count",
    autoform: {
      omit: true
    },
    autoValue: function() {
      var members = this.field('members').value;
      if (!members) {
        if (this.isInsert) {
          return 0;
        } else {
          this.unset();
        }
      } else {
        return members.length;
      }
    }
  }
});

Clubs.attachSchema(Schema.Club);

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

var slugify = function(s) {
  return s.toLowerCase().trim().replace(/[^a-z]+/g, '-');
}

Meteor.startup(function() {
  Clubs.find({ slug: null }).forEach(function(club) {
    Clubs.update(club._id, {$set: {slug: slugify(club.name)}});
  });
});
