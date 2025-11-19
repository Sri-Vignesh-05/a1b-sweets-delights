const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://kalathmikas_db_user:Shibu@cluster0.klaubrd.mongodb.net/a1b_store?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

module.exports = client;
