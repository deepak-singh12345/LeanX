import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    accountType:{
        type: String,
        enum: ['Athlete', 'Company', 'Customer', 'Engineer'],
        required: true
    },
    profileImage: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    bio:{
        type: String,
        maxLength: 1200,
    },
    socialLinks:{
        type:Map,
        of:String
    },
    isVerified: {
        type:Boolean,
        default:false
    }
});


// // Add account-specific fields for Athlete, Company, Customer, and Engineer
// userSchema.path('additionalInfo').validate(function(value) {
//     if (this.accountType === 'Athlete') {
//       return value?.sport || 'Sport is required for athletes';
//     }
//     if (this.accountType === 'Company') {
//       return value?.industry || 'Industry is required for companies';
//     }
//     return true;
//   }, 'Validation error for account type fields.');

const User = mongoose.model('User', userSchema);

export default User
