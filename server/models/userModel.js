import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  accountType: {
    type: String,
    enum: ['athlete', 'business', 'customer', 'engineer'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // Optional: add specific properties based on account type
  profile: {
    bio: String
  },
  athleteInfo: {
    sport: String,
    achievements: [String],
  },
  businessInfo: {
    companyName: String,
    businessType: String,
  },
  engineerInfo: {
    expertise: [String],
    certifications: [String],
  }
});


const User = mongoose.model('User', userSchema);

export default User;
