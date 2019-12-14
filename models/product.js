const mongoose =  require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title:{
        type: String,
        required:true
    },
    postedBy:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: false //TODO true if needed
    },
    imageUrl: {
        type: String
    },
    images:[{
        type: String
    }],
    price:{
        type: Number,
        required: true
    },
    availableQuantity:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Product", productSchema);