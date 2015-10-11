
Images.allow({
  insert: function(userId, doc) { return true; },
  download: function(userId) { return true; }
});

Meteor.publish("images", function() {
  return Images.find();
});


