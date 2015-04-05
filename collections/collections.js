/*
Phones collection
- number
- userId (reference to Users collection)
- agentId (reference to Agents collection)
- isSent
- createdAt
- updatedAt
*/
Phones = new Mongo.Collection("phones");

/*
Agents collection
- _id
- name (Mobifone, Vinaphone, viettel, Vietnamobile, Gphone)
*/
Agents = new Mongo.Collection("agents");