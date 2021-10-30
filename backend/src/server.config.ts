import mongoose from "mongoose";

let mongoCredentialsFromKeyFile = { username: "", password: "" };
try {
  mongoCredentialsFromKeyFile = require("../keys/mongo.json");
} catch (err) {
  console.error("could not read mongo key file");
}

// * Get Database Connection
export function constructMongoConnection(
  dbUserName = mongoCredentialsFromKeyFile.username,
  dbPassword = mongoCredentialsFromKeyFile.password,
  dbName = "customers"
) {
  return `mongodb+srv://${dbUserName}:${dbPassword}@sandbox.9xeet.mongodb.net/${dbName}?retryWrites=true&w=majority`;
}

export async function mongooseConnect() {
  const mongoConnectionString = constructMongoConnection();
  console.log(`Connecting to database`);

  mongoose.connect(
    mongoConnectionString,
    {
      readPreference: "primaryPreferred",
    },
    function (error: any) {
      if (error) {
        console.log("Error!" + error);
      } else {
        console.log("Connected to MongoDB Atlas database");
      }
    }
  );

  // Get the default connection
  const mdb = mongoose.connection;

  console.log(`Connected to mongodb. Returning connection`);
  return mdb;
}
export async function mongooseDisconnect() {
  await mongoose.disconnect();
}
