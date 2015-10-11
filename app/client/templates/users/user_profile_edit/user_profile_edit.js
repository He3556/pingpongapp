AutoForm.hooks({
  userProfile: {
    onSuccess: function(formType, result) {
      if (this.docId === Meteor.userId()) {
        Router.go('myUserProfile');
      } else {
        Router.go('userProfile', {_id: this.docId});
      }
    }
  }
});

/*****************************************************************************/
/* UserProfileEdit: Event Handlers */
/*****************************************************************************/
Template.UserProfileEdit.events({
});

/*****************************************************************************/
/* UserProfileEdit: Helpers */
/*****************************************************************************/
Template.UserProfileEdit.helpers({
});

/*****************************************************************************/
/* UserProfileEdit: Lifecycle Hooks */
/*****************************************************************************/
Template.UserProfileEdit.onCreated(function () {
});

Template.UserProfileEdit.onRendered(function () {
});

Template.UserProfileEdit.onDestroyed(function () {
});
