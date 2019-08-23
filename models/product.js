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
    imageUrl: {
        type: String
    }
})

module.exports = mongoose.model("Product", productSchema);