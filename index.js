const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongodb = require("mongodb");
const url = "mongodb+srv://srikanth:srikanth@11@cluster0.khcyt.mongodb.net/cluster0?retryWrites=true&w=majority";
const dbName = "cluster0";
const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 3000
const cors = require("cors");

app.use(bodyparser.json());

app.use(cors({
  origin:"*"
}))

app.get("/users", async (req, res) => {
  try {
    let connection = await MongoClient.connect(url);

    let db = connection.db(dbName);

    let users = await db.collection("users").find().toArray();

    
    console.log(users)

    res.json(users);
    connection.close();
  } catch (error) {
    console.log(error);
  }
});

app.post("/user", async (req, res) => {
  try {
    let connection = await MongoClient.connect(url);

    let db = connection.db(dbName);

    await db.collection("users").insertOne(req.body);
  

    connection.close();

    res.json({
      message: "user created",
    });
  } catch (error) {
    console.log(error);
  }
});

app.put("/user/:user_id", async (req, res) => {
  try {
    let connection = await MongoClient.connect(url);

    let db = connection.db(dbName);

    await db
      .collection("users")
      .updateOne(
        { _id: mongodb.ObjectID(req.params.user_id) },
        { $set: { age: 20 } }
      );

    connection.close();

    res.json({
      message: "user updated",
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/user/:user_id", async (req, res) => {
  try {
    let connection = await MongoClient.connect(url);

    let db = connection.db(dbName);

    await db
      .collection("users")
      .deleteOne({ _id: mongodb.ObjectID(req.params.user_id) });

    connection.close();

    res.json({
      message: "user deleted",
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port);
