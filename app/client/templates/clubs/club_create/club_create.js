AutoForm.hooks({
  insertClubForm: {
    onSuccess: function(formType, result) {
      Router.go('clubDashboard', Clubs.findOne(result));
    }
  }
});

/*****************************************************************************/
/* ClubCreate: Event Handlers */
/*****************************************************************************/
Template.ClubCreate.events({
});

/*****************************************************************************/
/* ClubCreate: Helpers */
/*****************************************************************************/
Template.ClubCreate.helpers({
});

/*****************************************************************************/
/* ClubCreate: Lifecycle Hooks */
/*****************************************************************************/
Template.ClubCreate.onCreated(function () {
});

Template.ClubCreate.onRendered(function () {
});

Template.ClubCreate.onDestroyed(function () {
});
