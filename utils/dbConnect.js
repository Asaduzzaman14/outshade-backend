// const { MongoClient } = require("mongodb");
// const connectionString = process.env.ATLAS_URI;
// const client = new MongoClient(connectionString, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://outshade:gBNX2DghzDUlYBOf@cluster0.lu4d88g.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




let dbConnection;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            if (err || !db) {
                return callback(err);
            }

            dbConnection = db.db("productCollection");
            console.log("Successfully connected to MongoDB.");

            return callback();
        });
    },

    getDb: function () {
        return dbConnection;
    },
};