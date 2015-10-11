AutoForm.hooks({
  addGame: {
    before: {
      insert: function(doc) {
        match = Router.current().data();
        doc.match = match._id;
        if (doc.players && match.players) {
          doc.players[0].user = match.players[0].user;
          doc.players[1].user = match.players[1].user;
        }
        return doc;
      }
    }
  }
});

/*****************************************************************************/
/* Match: Event Handlers */
/*****************************************************************************/
Template.Match.events({
  'click .pause': function() {
    Matches.update(this._id, { $set: { "status": "paused" } });
  },
  'click .resume': function() {
    Matches.update(this._id, { $set: { "status": "active" } });
  },
  'click .submit-match': function() {
    var match = this;
    console.log(this);
    player1wins = 0;
    player2wins = 0;
    match.games.forEach(function(game) {
      if (game.players[0].score > game.players[1].score) {
        player1wins++;
      } else {
        player2wins++;
      }
    });


    var winner, p1score, p2score;
    if (player1wins > player2wins) {
      winner = match.players[0].user;
      p1score = 1;
      p2score = 0;
    } else if (player2wins > player1wins) {
      winner = match.players[1].user;
      p2score = 1;
      p1score = 0;
    } else {
      p1score = 0.5;
      p2score = 0.5;
    }

    var club = Clubs.findOne(match.club._id);

    p1 = match.club.members.find(function(m){return m.user === match.players[0].user});
    p2 = match.club.members.find(function(m){return m.user === match.players[1].user});

    p1index = findIndex(club.members, function(m) {
      return m.user === match.players[0].user;
    });
    p2index = findIndex(club.members, function(m) {
      return m.user === match.players[1].user;
    });

    ratings = {};
    ratings["members."+p1index+".rating"] = changeInRating(p1.rating, p1score, match.players[0].expected);
    ratings["members."+p2index+".rating"] = changeInRating(p2.rating, p2score, match.players[1].expected);

    Clubs.update(match.club._id, { $inc: ratings } )

    Matches.update(match._id, { $set: { status: "completed", winner: winner, completedAt: new Date } });
  }
});

var changeInRating = function(current, score, expected) {
  var delta = Math.round(16*(score - expected));
  return delta;
};

var findIndex = function(array, predicate) {
  var length = array.length;
  for (var index = 0; index >= 0 && index < length; index++) {
    if (predicate(array[index], index, array)) return index;
  }
  return -1;
};

/*****************************************************************************/
/* Match: Helpers */
/*****************************************************************************/
Template.Match.helpers({
});

/*****************************************************************************/
/* Match: Lifecycle Hooks */
/*****************************************************************************/
Template.Match.onCreated(function () {
});

Template.Match.onRendered(function () {
});

Template.Match.onDestroyed(function () {
});
