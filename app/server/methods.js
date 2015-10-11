/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

Meteor.methods({

  'requestMembership': function(club) {

    if (typeof club === "string")
    	club = Club.findOne(club);

    check(club, Object)

    if (club.members.filter(function(m){return m.user === this.userId}).length > 0)
      throw new Meteor.Error("already-member", "User is already in club");

    if (JoinRequests.findOne({user: this.userId, club: club._id, status: "pending"}))
      throw new Meteor.Error("already-pending", "Pending request in progress");

    JoinRequests.insert({
      user: this.userId,
      club: club._id
    });

  },

  'approveClubRequest': function(request, rating){
  	//if this.userId is an owner, add the requesting user
  	//to the clubs members array
  	var club = Clubs.findOne({_id: request.club, owners: this.userId});
    check(club, Object);

    if (club.members.filter(function(m){return m.user === request.user;}).length > 0) {
      JoinRequests.update(request._id, { $set: { status: "cancelled" } });
      throw new Meteor.Error("already-member", "User is already in club");
    }

    Clubs.update(club._id, { $push: { members: {
      user: request.user,
      rating: rating
    }}});

    JoinRequests.update(request._id, { $set: { status: "accepted" } });
  },

  'rejectClubRequest': function(request, rating){
  	//if this.userId is an owner, add the requesting user
  	//to the clubs members array
  	var club = Clubs.findOne({_id: request.club, owners: this.userId});
    
    check(club, Object);

    JoinRequests.update(request._id, { $set: { status: "rejected" } });
  },

  requestMatch: function(club, member) {
    check(this.userId, String);

    if (typeof member === 'string')
      member = Meteor.users.findOne(member)

    check(member, Object);

    if (this.userId === member._id)
      throw new Meteor.Error("You can't challenge yourself");

    if (typeof club == 'string')
      club = Clubs.findOne(club);

    check(club, Object);

    var memberIds = _.pluck(club.members, 'user');

    if (memberIds.indexOf(member._id) === -1)
      throw new Meteor.Error("You must challenge someone in this club.");

    if (memberIds.indexOf(this.userId) === -1)
      throw new Meteor.Error("You must be in this club to challenge.");

    Requests.insert({
      club: club._id,
      challenger: this.userId,
      opponent: member._id
    });
  },

  rejectMatch: function(requestId) {
    request = Requests.findOne(requestId);
    if (request.opponent != this.userId)
      throw new Meteor.Error("You can't reject this request");

    Requests.update(request._id, { $set: { status: 'rejected' } }); 
  },

  acceptMatch: function(requestId) {
    request = Requests.findOne(requestId);
    if (request.opponent != this.userId)
      throw new Meteor.Error("You can't reject this request");

    Requests.update(request._id, { $set: { status: 'accepted' } });

    club = Clubs.findOne(request.club);

    challenger = club.members.find(function(member) {
      return member.user === request.challenger;
    });

    opponent = club.members.find(function(member) {
      return member.user === request.opponent;
    });

    Matches.insert({
      players: [
        { user: request.challenger, expected: expected(challenger.rating, opponent.rating) },
        { user: request.opponent, expected: expected(opponent.rating, challenger.rating) }
      ],
      club: request.club
    });

  }



});

var expected = function(p1, p2) {
  return 1 / (1 + Math.pow(10, (p2-p1)/400));
}
