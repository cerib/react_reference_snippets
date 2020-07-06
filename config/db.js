const mongoose = require("mongoose");
//const config = require("config");
const db = process.env.MONGO_URI; // config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Connected to DB");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
