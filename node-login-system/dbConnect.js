import mongoose from "mongoose";
import MongoMemoryServer from "mongodb-memory-server-core";

export default async function connect() {
  // to create new mongoDB server instance whenever you start server
  //   const mongod = await MongoMemoryServer.create();
  //   const getURI = mongod.getUri();

  // mongoose.set("strictQuery", true);
  await mongoose
    .connect(process.env.MONGOURI)
    .then((db) => {
      console.log("Database connected...");
      return db;
    })
    .catch((err) => {
      console.log(err);
    });
}
//dfs
