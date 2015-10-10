/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

Meteor.methods({
  'server/method_name': function () {
    // server method logic
  },

  'joinClubRequest': function(user, club){
  	if(user._id !== this.userId){
  		//throw error
  	}
  	//add the request to the requests collection

  },

  'approveClubRequest': function(request){
  	//if this.userId is an owner, add the requesting user
  	//to the clubs members array
  	var clubRequsted = Club.find({request});
  }
});
