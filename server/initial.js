// Initial Agents collection data in case empty
if (Agents.find().count() == 0) {
	Agents.insert({name: "Mobifone"});
	Agents.insert({name: "Vinaphone"});
	Agents.insert({name: "Viettel"});
	Agents.insert({name: "Vietnamobile"});
	Agents.insert({name: "Gmobile"});
}
