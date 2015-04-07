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
// attach timestamp field to phone number
Phones.attachBehaviour("timestampable", {
  createdBy: 'userId',
  updatedBy: false
});
/*
Agents collection
- _id
- name (Mobifone, Vinaphone, viettel, Vietnamobile, Gphone)
*/
Agents = new Mongo.Collection("agents");