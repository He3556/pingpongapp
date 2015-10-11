/*****************************************************************************/
/* MatchRequestModal: Event Handlers */
/*****************************************************************************/
Template.MatchRequestModal.events({
  'click .accept': function(e) {
    e.preventDefault();
    Meteor.call('acceptMatch', this._id);
  },
  'click .reject': function(e) {
    e.preventDefault();
    Meteor.call('rejectMatch', this._id, function(error, matchId) {
      if (!error) {
        Router.go('match', {_id: matchId});
      }
    });
  }
});

/*****************************************************************************/
/* MatchRequestModal: Helpers */
/*****************************************************************************/
Template.MatchRequestModal.helpers({
  pendingRequests: function() {
    return Requests.find({
      status: 'pending',
      opponent: Meteor.userId()
    }).map(function(request){
      request.challenger = Meteor.users.findOne(request.challenger);
      console.log(request);
      return request;
    });
  }
});

/*****************************************************************************/
/* MatchRequestModal: Lifecycle Hooks */
/*****************************************************************************/
Template.MatchRequestModal.onCreated(function () {
});

Template.MatchRequestModal.onRendered(function () {
});

Template.MatchRequestModal.onDestroyed(function () {
});
