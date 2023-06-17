const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;

// middelware
app.use(cors());
app.use(express.json());

const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e5xjxv3.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    app.get("/", async(req, res ) => {
      res.send("mongodb server is running")
    })
    console.log(
      "monogo db contect is this oparations "
    )

    const appointment = client.db("Doctor_protal").collection("appientntment");
    
    app.get("/option", async(req, res) => {
      const query = {}
      const result = await appointment.find(query).toArray();
      res.send(result)  


    })



  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("Hello World, server is ruing");
});

app.listen(port, () => {
  console.log("doctor portals server is ruing  ");
});
