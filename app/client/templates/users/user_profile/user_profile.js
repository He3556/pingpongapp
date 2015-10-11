/*****************************************************************************/
/* UserProfile: Event Handlers */
/*****************************************************************************/
Template.UserProfile.events({
});

/*****************************************************************************/
/* UserProfile: Helpers */
/*****************************************************************************/
Template.UserProfile.helpers({
  clubs: function() {
    return Clubs.find({"members.user": this._id});
  }
});

/*****************************************************************************/
/* UserProfile: Lifecycle Hooks */
/*****************************************************************************/
Template.UserProfile.onCreated(function () {
});

Template.UserProfile.onRendered(function () {
});

Template.UserProfile.onDestroyed(function () {
});
