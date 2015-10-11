AutoForm.hooks({
  insertClubForm: {
    onSuccess: function(formType, result) {
      Router.go('clubDashboard', Clubs.findOne(result));
    }
  }
});

Template.registerHelper('pluralize', function(n, thing) {
  // fairly stupid pluralizer
  if (n === 1) {
    return '1 ' + thing;
  } else {
    return n + ' ' + thing + 's';
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
