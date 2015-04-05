Template.index.agents = function() {
	return Agents.find({}).fetch();
}

Template.index.notSentNumbers = function() {
	return ["0966042043", "0912797869", "0903406099", "0923456699", "0991119998"];
}

Template.index.SentNumbers = function() {
	return ["0965309095", "0914444869", "0902226099", "0925556699", "0992229991"];
}
