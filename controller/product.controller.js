const { ObjectId } = require("mongodb");
const dbConnect = require("../utils/dbConnect");
const { getDb } = require("../utils/dbConnect");


module.exports.getAllProducts = async (req, res) => {
    try {
        const { limit, page } = req.query
        const db = getDb();
        const product = await db.collection("users").find().toArray()

        res.status(200)
            .json({ success: true, data: product })
    }
    catch (error) {
        next(error)
    }
}


// post method 
module.exports.saveProduct = async (req, res, next) => {
    try {
        const db = getDb()
        const product = req.body;
        const result = await db.collection("users").insertOne(product);
        console.log(result);
        if (result.insertedId) {
            res.send({ success: true, message: `product added with id : ${result.insertedId}` })
        }
        if (!result.insertedId) {
            return res.status(400).send({ status: false, error: "something wrong" })
        }
    } catch (err) {
        next(err)
    }
}
