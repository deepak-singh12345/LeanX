import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max_length:512
    },
    description: {
        type: String,
        required: true,
        max_length:1024
    },
    price: {
        type: Number,
        required: true,
        min:10
    },
    duration:{
        type:String,
        required: true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Service = mongoose.model('Service', serviceSchema);
export default Service
