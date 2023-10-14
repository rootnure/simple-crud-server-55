const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

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

        // Connect to the "usersDB" database and access its "users" collection
        const userCollection = client.db('usersDB').collection('users');

        // Read Many user operation [ GET ]
        app.get('/users', async (req, res) => {
            const cursor = userCollection.find(); // must user cursor
            const result = await cursor.toArray(); // if data with more that one document (objects or array of objects)
            res.send(result);
        })

        // Read Single user operation [ GET ]
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            console.log('get data for', id);
            // must use ObjectId and 'new' keyword to set query
            const query = { _id: new ObjectId(id) };
            const user = await userCollection.findOne(query);
            res.send(user);
        })

        // Create operation [ POST ]
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log('new user', user);

            // Insert the defined document into the "users" collection
            const result = await userCollection.insertOne(user);
            res.send(result);
        })

        // Update data [ PUT ] ==> If data exists, will update; it doesn't exists, will add
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const user = req.body;
            console.log(id, user);

            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedUser = {
                $set: {
                    name: user.name,
                    email: user.email
                }
            }

            const result = await userCollection.updateOne(filter, updatedUser, options);
            res.send(result);
        })

        // Delete operation [ DELETE ]
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            console.log('please delete from db', id);
            // must use ObjectId and 'new' keyword to set query
            const query = { _id: new ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })




        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally {
        // Ensures that the client will close when you finish/error
        // await client.close(); // comment-out to establish stable connection
    }
}

run().catch(console.log);




app.get('/', (req, res) => {
    res.send('SIMPLE CRUD IS RUNNING')
})

app.listen(port, () => {
    console.log(`SIMPLE CRUD is running on port ${port}`)
})