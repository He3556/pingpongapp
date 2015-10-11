UI.registerHelper('isEquals', function(a,b) {
    return a === b;
});

Template.registerHelper('pluralize', function(n, thing) {
  // fairly stupid pluralizer
  if (n === 1) {
    return '1 ' + thing;
  } else {
    return n + ' ' + thing + 's';
  }
});

Template.registerHelper('numberizer', function(n) {
  // fairly stupid pluralizer
  if (n === 1) {
    return n + 'st';
  } else if (n % 20 == 2){
    return n + 'nd';
  } else if (n % 30 == 3){
    return n + 'rd';
  } else {
    return n + 'th';
  }
});

UI.registerHelper('isClubOwner', function(club, userId) {
  if (!club) {
    club = this;
  } else if (typeof club === 'string') {
    club = Clubs.findOne(club);
  }

  if (typeof userId !== 'string') {
    userId = Meteor.userId();
  }

  return club.owners.indexOf(userId) != -1;
});

UI.registerHelper('isMember', function(club, userId) {
  if (!club) {
    club = this;
  } else if (typeof club === 'string') {
    club = Clubs.findOne(club);
  }

  if (typeof userId != 'string') {
    userId = Meteor.userId();
  }

  return club.members.filter(function(member){
    return member.user === userId;
  }).length > 0;
});

UI.registerHelper('isPending', function(club, userId) {
  if (!club) {
    club = this;
  } else if (typeof club === 'string') {
    club = Clubs.findOne(club);
  }

  if (typeof userId !== 'string') {
    userId = Meteor.userId();
  }

  return JoinRequests.find({
    user: userId,
    club: club._id,
    status: 'pending'
  }).count() > 0;
});
