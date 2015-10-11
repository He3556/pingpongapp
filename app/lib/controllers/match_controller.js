MatchController = RouteController.extend({
  
  // A place to put your subscriptions
  // this.subscribe('items');
  // // add the subscription to the waitlist
  // this.subscribe('item', this.params._id).wait();
  
  subscriptions: function() {
  },
  
  // Subscriptions or other things we want to "wait" on. This also
  // automatically uses the loading hook. That's the only difference between
  // this option and the subscriptions option above.
  // return Meteor.subscribe('post', this.params._id);
  
  waitOn: function () {
    matchId = this.params._id;
    return { ready: function() {
      var match =  Matches.findOne(matchId);
      if (match)
        return true;
      else
        return false;
    } };
  },
  
  // A data function that can be used to automatically set the data context for
  // our layout. This function can also be used by hooks and plugins. For
  // example, the "dataNotFound" plugin calls this function to see if it
  // returns a null value, and if so, renders the not found template.
  // return Posts.findOne({_id: this.params._id});
  
  data: function () {
    var match = Matches.findOne(this.params._id);
    if (!match) return;
    match.games = Games.find({match: this.params._id}).map(function(game, index){
      game.index = index + 1;
      return game;
    });
    match.club = Clubs.findOne(match.club);
    match.club.members = match.club.members.sort(function(a,b) {
      return b.rating - a.rating;
    }).map(function(member, index) {
      member.rank = index + 1;
      return member;
    });
    for (player of match.players) {
      player.profile = Meteor.users.findOne(player.user).profile;
      player.membership = match.club.members.find(function(member) {
        return member.user === player.user;
      });
      player.profile.image = Images.findOne(player.profile.image);
    }
    return match;
  },
  
  // You can provide any of the hook options
  
  onRun: function () {
    this.next();
  },
  onRerun: function () {
    this.next();
  },
  onBeforeAction: function () {
    this.next();
  },
  
  // The same thing as providing a function as the second parameter. You can
  // also provide a string action name here which will be looked up on a Controller
  // when the route runs. More on Controllers later. Note, the action function
  // is optional. By default a route will render its template, layout and
  // regions automatically.
  // Example:
  //  action: 'myActionFunction'
  
  action: function () {
    this.render();
  },
  onAfterAction: function () {
  },
  onStop: function () {
  }
});
