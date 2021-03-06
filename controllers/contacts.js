const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
}

const getData = async (req, res, next) => {
  /*

  #swagger.description = "Returns all contacts from the database"


*/

  const result = await mongodb.getDb().db().collection("contacts").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists); // we just need the first one (the only one)
  });
};

const getDataById = async (req, res, next) => {
  /*

#swagger.description = "Returns a contact from the database using specified id"


*/
  const id = req.params.id;
  if (isValidObjectId(id)) {
    const result = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .findOne({
        _id: new ObjectId(id),
      });
    if (result) {
      res.status(200).json(result);
    }
  } else {
    res.status(400).send("Contact Not Found");
  }
};

const insertContact = async (req, res) => {
  /*

#swagger.description = "Inserts a new contact into the database"


*/

  if (
    typeof req.body.firstName !== "undefined" &&
    typeof req.body.lastName !== "undefined" &&
    typeof req.body.email !== "undefined" &&
    typeof req.body.favoriteColor !== "undefined" &&
    typeof req.body.birthday !== "undefined"
  ) {
    const document = {};
    document["firstName"] = req.body.firstName;
    document["lastName"] = req.body.lastName;
    document["email"] = req.body.email;
    document["favoriteColor"] = req.body.favoriteColor;
    document["birthday"] = req.body.birthday;
    // Optional addtional info
    typeof req.body.nickName !== "undefined"
      ? (document["nickName"] = req.body.nickName)
      : (document["nickName"] = "Not Provided");
    typeof req.body.age !== "undefined"
      ? (document["age"] = req.body.age)
      : (document["age"] = "Not Provided");
    typeof req.body.location !== "undefined"
      ? (document["location"] = req.body.location)
      : (document["location"] = "Not Provided");

    try {
      const result = await mongodb
        .getDb()
        .db()
        .collection("contacts")
        .insertOne(document);
      res.send(result.insertedId);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).send("All fields are required");
  }
};

const updateContact = async (req, res) => {
  /*

#swagger.description = "Updates a contact that exists in the database by id"


*/
  const document = {};

  //set only receibed values to be updated
  typeof req.body.firstName !== "undefined" &&
    (document["firstName"] = req.body.firstName);
  typeof req.body.lastName !== "undefined" &&
    (document["lastName"] = req.body.lastName);
  typeof req.body.email !== "undefined" && (document["email"] = req.body.email);
  typeof req.body.favoriteColor !== "undefined" &&
    (document["favoriteColor"] = req.body.favoriteColor);
  typeof req.body.birthday !== "undefined" &&
    (document["birthday"] = req.body.birthday);
  typeof req.body.nickName !== "undefined" &&
    (document["nickName"] = req.body.nickName);
  typeof req.body.age !== "undefined" && (document["age"] = req.body.age);
  typeof req.body.location !== "undefined" &&
    (document["location"] = req.body.location);
  //if no value was sent in req
  if (Object.keys(document).length === 0) {
    res.status(400).send("Data to update needs to be provided");
    return;
  }
  try {
    const id = req.params.id;
    if (isValidObjectId(id)) {
      const result = await mongodb
        .getDb()
        .db()
        .collection("contacts")
        .findOneAndUpdate(
          {
            _id: new ObjectId(id),
          },
          { $set: document }
        );
      res.send("Document was updated successfully");
    } else {
      res.status(400).send("Contact Not Found");
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteDocById = async (req, res, next) => {
  /*

#swagger.description = "Deletes a contact from the database using specified id"


*/
  const id = req.params.id;
  if (isValidObjectId(id)) {
    const result = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .deleteOne({
        _id: new ObjectId(id),
      });
    if (result) {
      res.send("Document was deleted successfully");
    }
  } else {
    res.status(400).send("Contact Not Found");
  }
};

module.exports.getData = getData;
module.exports.getDataById = getDataById;
module.exports.insertContact = insertContact;
module.exports.updateContact = updateContact;
module.exports.deleteDocById = deleteDocById;
