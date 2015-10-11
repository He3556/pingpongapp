Router.configure({
  layoutTemplate: "MasterLayout"
});

Router.route('/', {
  name: 'clubList',
  controller: 'ClubsController',
  where: 'client'
});

Router.route('/club/create', {
  name: 'clubCreate',
  controller: 'ClubsController',
  where: 'client'
});

Router.route('/club/:slug', {
  name: 'clubDashboard',
  controller: 'ClubDashboardController',
  where: 'client'
});

Router.route('/club/:slug/join', {
  name: 'joinClub',
  action: function() {
  },
  where: 'client'
});

Router.route('/user-profile', {
  name: 'myUserProfile',
  template: 'UserProfile',
  controller: 'UserProfileController',
  where: 'client'
});

Router.route('/user-profile/:_id', {
  name: 'userProfile',
  controller: 'UserProfileController',
  where: 'client'
});

Router.route('/user-profile/:_id/edit', {
  name: 'userProfileEdit',
  controller: 'UserProfileController',
  where: 'client'
});
