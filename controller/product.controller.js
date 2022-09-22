const { ObjectId } = require("mongodb");
const dbConnect = require("../utils/dbConnect");
const { getDb } = require("../utils/dbConnect");


module.exports.getAllProducts = async (req, res, next) => {
    try {
        const { limit, page } = req.query
        const db = getDb();
        const product = await db.collection("products").find().toArray()

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
        console.log(product);


        const result = await db.collection("products").insertOne(product);
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

module.exports.updateProduct = async (req, res, next) => {

    try {
        const db = getDb()
        // console.log(req.body);
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "ID is not valid" })
        }
        const tool = await db.collection("products").updateOne({ _id: ObjectId(id) }, { $set: req.body });

        if (!tool.modifiedCount) {
            return res.status(400).json({ success: false, error: "Couldn't update product" })
        }

        res.status(200)
            .json({ success: true, message: "updated product" })

    }
    catch (error) {
        next(error)
    }

}

module.exports.deleteProduct = async (req, res) => {
    try {
        const db = getDb()
        const { id } = req.params;
        console.log(id);
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "ID is not valid" })
        }
        const tool = await db.collection("products").deleteOne({ _id: ObjectId(id) });

        if (!tool.deletedCount) {
            return res.status(400).json({ success: false, error: "Couldn't delete tool" })
        }

        res.status(200)
            .json({ success: true, message: " Successfully deleted the tool" })

    }
    catch (error) {
        next(error)
    }

};

