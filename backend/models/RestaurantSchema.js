const mongoose = require('mongoose');
const {Schema}=require('mongoose');

const RestaurantSchema = new Schema({ 
    restaurant_name: {
        type: String,
        required:true
    },
    details:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    image:{
        type: Array,
        required:true
    },
    booked_dates:{
        type: Array,
        required:true
    },
    location:{
        type: String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    reviews:{
        type:Array,
        required:true
    },
    vendor_id:{
        type:String,
        required:true
    }
    });
module.exports= mongoose.model('Restaurant', RestaurantSchema);
