/*****************************************************************************/
/* ClubList: Event Handlers */
/*****************************************************************************/
Template.ClubList.events({
  'click .join': function() {
    Meteor.call('requestMembership', this, function(error){
      if (error)
        Flash.warning(error.message);
      else
        Flash.info("Your request has been sent");
    });
  }
});

/*****************************************************************************/
/* ClubList: Helpers */
/*****************************************************************************/
Template.ClubList.helpers({
});

/*****************************************************************************/
/* ClubList: Lifecycle Hooks */
/*****************************************************************************/
Template.ClubList.onCreated(function () {
});

Template.ClubList.onRendered(function () {
});

Template.ClubList.onDestroyed(function () {
});
