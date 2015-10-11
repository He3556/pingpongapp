
Meteor.startup(function() {
  Deps.autorun(function() {
    activeMatches = Matches.find({
      "players.user": Meteor.userId(),
      status: "active"
    });

    if (activeMatches.count()
        && Router.current()
        && Router.current().route.getName() !== "match") {
      Router.go("match", activeMatches.fetch().pop());
    }

  });
});
