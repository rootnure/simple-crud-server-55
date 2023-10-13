const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())

// nurdiu2791
// KzEiqPUcssdfajud


const uri = "mongodb+srv://nurdiu2791:KzEiqPUcssdfajud@cluster0.3al0nc5.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // Connect to the "usersDB" database and access its "userCollection" collection
        const usersDatabase = client.db("usersDB");
        const userCollection = usersDatabase.collection("users");

        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log('new user', user);

            // Insert the defined document into the "haiku" collection
            const result = await userCollection.insertOne(user);
            res.send(result)

        })




        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.log);




app.get('/', (req, res) => {
    res.send('SIMPLE CRUD IS RUNNING')
})

app.listen(port, () => {
    console.log(`SIMPLE CRUD is running on port ${port}`)
})