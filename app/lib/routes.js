
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
