
Schema.UserProfile = new SimpleSchema({
  name: {
    type: String,
    optional: true
  },
  image: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images',
        label: 'Choose image'
      }
    }
  }
});

Schema.User = new SimpleSchema({
  username: {
    type: String,
    optional: true
  },
  emails: {
    type: Array,
    optional: true
  },
  "emails.$": {
    type: Object
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean,
    autoValue: function() {
      return false;
    }
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
    autoform: { omit: true },
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      }
    }
  },
  profile: {
    type: Schema.UserProfile,
    optional: true
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  roles: {
    type: Object,
    optional: true,
    blackbox: true
  }
});

Meteor.users.attachSchema(Schema.User);

