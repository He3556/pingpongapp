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
      member = Meteor.users.find(member)

    check(member, Object);

    assert(this.userId !== member._id);

    var club = Clubs.findOne({
      _id: doc.club,
      $and: [
        { "members.user": this.userId },
        { "members.user": member },
      ]
    });

    check(club, Object);

    Requests.insert({
      club: club._id,
      challenger: this.userId,
      opponent: member._id
    });
  }



});
