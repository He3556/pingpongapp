/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

Meteor.methods({

  'requestMembership': function(club) {

    if (typeof club === "string")
    	club = Club.find({_id: club});

    check(club, Object)

    if (club.members.filter(function(m){m.user === request.user;}).length > 0) {
      throw new Meteor.Error("already-member", "User is already in club");
    }

    JoinRequests.insert({
      user: this.userId,
      club: club
    });

  },

  'approveClubRequest': function(request, rating){
  	//if this.userId is an owner, add the requesting user
  	//to the clubs members array
  	var club = Club.find({_id: request.club, owners: this.userId});
    
    check(club, Object)

    if (club.members.filter(function(m){m.user === request.user;}).length > 0) {
      JoinRequests.update(request._id, { $set: { status: "cancelled" } });
      throw new Meteor.Error("already-member", "User is already in club");
    }

    Clubs.update(club._id, { $push: {
      user: request.user,
      rating: rating
    }});

    JoinRequests.update(request._id, { $set: { status: "accepted" } });
  },

  'rejectClubRequest': function(request, rating){
  	//if this.userId is an owner, add the requesting user
  	//to the clubs members array
  	var club = Club.find({_id: request.club, owners: this.userId});
    
    check(club, Object)

    JoinRequests.update(request._id, { $set: { status: "rejected" } });
  }
});
