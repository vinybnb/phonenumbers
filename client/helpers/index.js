Template.index.helpers({
	agents: function() {
		return Agents.find().fetch();
	},
	notSentNumbers: function() {
		var leftAgentId = Session.get("leftAgentId");
		if (leftAgentId === undefined || leftAgentId === "")
			return Phones.find({isSent: false}, {sort: {updatedAt: -1, createdAt: -1}, limit: 12});
		return Phones.find({isSent: false, agentId: leftAgentId}, {sort: {updatedAt: -1, createdAt: -1}, limit: 12});
	},
	SentNumbers: function() {
		var rightAgentId = Session.get("rightAgentId");
		if (rightAgentId === undefined || rightAgentId === "")
			return Phones.find({isSent: true}, {sort: {updatedAt: -1, createdAt: -1}, limit: 12});
		return Phones.find({isSent: true, agentId: rightAgentId}, {sort: {updatedAt: -1, createdAt: -1}, limit: 12});
	},
	isError: function () {
		Session.setDefault("isInvalid", false);
		Session.setDefault("isExist", false);
		return Session.get("isInvalid") || Session.get("isExist");
	},
	errorMessage: function() {
		if (Session.get("isExist"))
			return "Số điện thoại đã tồn tại!";
		return "Số điện thoại không hợp lệ!";
	},
	totalNotSent: function() {
		var leftAgentId = Session.get("leftAgentId");
		if (leftAgentId === undefined || leftAgentId === "")
			return Phones.find({isSent: false}).count();
		return Phones.find({isSent: false, agentId: leftAgentId}).count();
	},
	totalSent: function() {
		var rightAgentId = Session.get("rightAgentId");
		if (rightAgentId === undefined || rightAgentId === "")
			return Phones.find({isSent: true}).count();
		return Phones.find({isSent: false, agentId: rightAgentId}).count();
	}
});

Template.index.events({
	"submit .phone": function(event) {
		// reset all session to the default value
		Session.set("isInvalid", false);
		Session.set("isExist", false);

		// get the input text
		var number = event.target.number.value.replace(/\D/g,'');
		// check whether number is valid or not
		var isValid = checkValidNumber(number);
		if (!isValid) {
			Session.set("isInvalid", true);
			// prevent default form submit
			return false;
		}

		// check whether the phone number is exist or not
		if (Phones.findOne({number: number})) {
			Session.set("isExist", true);
			return false;
		}

		// get the agent id of the phone number
		var agentId = getAgentIdByNumber(number);

		// insert phone number to Phones collection
		Phones.insert({
			number: number,
			agentId: agentId,
			isSent: false
		});

		// clear form
		event.target.number.value = "";

		// prevent default form submit
		return false;
	},
	"click .close": function(event) {
		// check whether the phone number is belong to this current user or not
		var targetUserId = Phones.findOne({_id: event.target.id}).userId;
		// remove the number with given id
		if (Meteor.userId() === targetUserId)
			Phones.remove({_id: event.target.id});
	},
	"change #agentsLeft": function(event) {
		var leftAgentIdSelected = event.target.value;
		Session.set("leftAgentId", leftAgentIdSelected);
	}
});

// check the phone number is valid or not
var checkValidNumber = function(number) {
	// There are 2 kinds of number, the number which has 10 digits has 09 at the beginning and one wich has 11 digits has 01 at the beginning
	// The Sfone 095 is unavailable so we ommit 095x number
	if (number.length === 10 && number.substring(0, 2) === "09" && number.charAt(2) !== "5") return true;
	// The 11 digits number is in one of these format: 012x, 016x, 018x, 019x
	var begins = ["012", "016", "018", "019"];
	if (number.length === 11 && begins.indexOf(number.substring(0, 3)) > -1) return true;
	// Otherwise, the number is invalid
	return false;
}

// get the agent id by phone number
var getAgentIdByNumber = function(number) {
	Agents.findOne({name: "Mobifone"})
	// At the beginning of the number
	// Mobifone: 090, 093, 0120, 0121, 0122, 0126, 0128
	if (number.substring(0, 3) === "090" || number.substring(0, 3) === "090" || number.substring(0, 4) === "0120" || number.substring(0, 4) === "0121" || number.substring(0, 4) === "0122" || number.substring(0, 4) === "0126" || number.substring(0, 4) === "0128") return Agents.findOne({name: "Mobifone"})._id;
	// Vinaphone: 091, 094, 0123, 0124, 0125, 0127, 0129
	if (number.substring(0, 3) === "091" || number.substring(0, 3) === "094" || number.substring(0, 4) === "0123" || number.substring(0, 4) === "0124" || number.substring(0, 4) === "0125" || number.substring(0, 4) === "0127" || number.substring(0, 4) === "0129") return Agents.findOne({name: "Vinaphone"})._id;
	// Vietnamobile: 092, 018
	if (number.substring(0, 3) === "092" || number.substring(0, 3) === "018")
		return Agents.findOne({name: "Vietnamobile"})._id;
	// Gmobile: 099, 019
	if (number.substring(0, 3) === "099" || number.substring(0, 3) === "019")
		return Agents.findOne({name: "Gmobile"})._id;
	// Viettel: 096, 097, 098, 016
	// But we just need return Viettel number
	// if (number.substring(0, 3) === "096" || number.substring(0, 3) === "097" || number.substring(0, 3) === "098" || number.substring(0, 3) === "016")
	return Agents.findOne({name: "Viettel"})._id;
}