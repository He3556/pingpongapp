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

  pendingMemberRequests: function() {
    return JoinRequests.find({
      club: this.club._id,
      status: 'pending'
    }, {sort: [['createdAt',-1]]}).map(function(request) {
      request.member = Meteor.users.findOne(request.user);
      return request;
    });
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
