Meteor.publish('allClubs', function(){
	if(!this.userId) return this.ready();
	return Clubs.find();
});

Meteor.publish('myClubs', function(){
	if(!this.userId) return this.ready();
	return Clubs.find({}, {memebers: {$in: [this.userId]}});
});
