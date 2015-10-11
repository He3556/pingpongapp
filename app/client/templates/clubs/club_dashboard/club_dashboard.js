/*****************************************************************************/
/* ClubDashboard: Event Handlers */
/*****************************************************************************/
Template.ClubDashboard.events({
});

/*****************************************************************************/
/* ClubDashboard: Helpers */
/*****************************************************************************/
Template.ClubDashboard.helpers({
  image: function() {
    return Images.findOne(this.profile.image);
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
