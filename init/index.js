const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/FaeTrails";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  const userId = new mongoose.Types.ObjectId("6939cdd3718bbe2db4c1d6bf");

  const listingsWithOwner = initData.data.map((obj) => ({
    ...obj,
    owner: userId,
  }));

  await Listing.insertMany(listingsWithOwner);
  console.log("data was initialized");
};

initDB();