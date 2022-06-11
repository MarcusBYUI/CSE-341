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
  const result = await mongodb.getDb().db().collection("contacts").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists); // we just need the first one (the only one)
  });
};

const getDataById = async (req, res, next) => {
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
    console.log("Not Found");
    res.send("Not Found");
  }
};

module.exports.Data = getData;
module.exports.DataById = getDataById;
