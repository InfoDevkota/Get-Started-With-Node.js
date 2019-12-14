const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cart:{
        type: Schema.Types.ObjectId,
        ref: "Cart"
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    address:{
        type: String,
        required: true
    },
    phoneNo:{
        type: String,
        required: true
    },
    blocked:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("User", userSchema);