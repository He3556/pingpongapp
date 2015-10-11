/*****************************************************************************/
/* ClubDashboard: Event Handlers */
/*****************************************************************************/
Template.ClubDashboard.events({
  'click .join': function() {
    Meteor.call('requestMembership', this, function(error){
      if (error)
        Flash.warning(error.message);
      else
        Flash.info("Your request has been sent");
    });

  },

  'click .leaderboard .challenge': function(e) {
    e.preventDefault();

    var club = Template.parentData(1).club;
    var member = this.user;

    Meteor.call('requestMatch', club, member);
  },

  'click .pending-members .accept': function(e) {
    var rating = 1000;
    Meteor.call('approveClubRequest', this, rating);
  },

  'click .pending-members .reject': function(e) {
    Meteor.call('rejectClubRequest', this);
  }
});

/*****************************************************************************/
/* ClubDashboard: Helpers */
/*****************************************************************************/
Template.ClubDashboard.helpers({
  
  image: function() {
    return Images.findOne(this.profile.image);
  },

  isChallengePending: function() {
    return Requests.find({
      opponent: { $in: [this.user, Meteor.userId()] },
      challenger: { $in: [this.user, Meteor.userId()] },
      status: 'pending'
    }).count() > 0;
  },

  pendingMemberRequests: function() {
    return JoinRequests.find({
      club: this.club._id,
      status: 'pending'
    }, {sort: [['createdAt',-1]]}).map(function(request) {
      request.member = Meteor.users.findOne(request.user);
      return request;
    });
  },

  recentMatches: function() {
    return Matches.find({ club: this.club._id, status: 'completed' }, {
      sort: [['completedAt', "desc"]]
    }).map(function(match) {
      match.players.forEach(function(player) {
        player.profile = Meteor.users.findOne(player.user).profile;
      });

      if (!match.winner) return match;

      match.loser = Meteor.users.findOne({
        $and: [
          { _id: { $in: _.pluck(match.players, 'user') } },
          { _id: { $ne: match.winner } }
        ]
      }).profile.name;
      match.winner = Meteor.users.findOne(match.winner).profile.name;
      return match;
    });

  },

  dateFormat: function(date) {
    console.log(date);
    return moment(date).fromNow();
  }

});

/*****************************************************************************/
/* ClubDashboard: Lifecycle Hooks */
/*****************************************************************************/
Template.ClubDashboard.onCreated(function () {
});

Template.ClubDashboard.onRendered(function () {
});

Template.ClubDashboard.onDestroyed(function () {
});
