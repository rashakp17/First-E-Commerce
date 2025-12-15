const {MongoClient} = require('mongodb');
const uri = process.env.Mongodb_uri;

const client = new MongoClient(uri,{ useNewUrlParser: true, useUnifiedTopology: true});

async function connectDB() {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db('mydatabase');
}

module.export = connectDB;