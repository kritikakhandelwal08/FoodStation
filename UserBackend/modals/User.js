import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define the User Schema
const UserSchema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      unique: true, // Ensures uniqueness
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      sparse: true, // Add this to prevent unique constraint for null values
      match: /^[0-9]{10}$/, // Validates a 10-digit phone number
    },
    
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      pinCode: { type: String, match: /^[0-9]{6}$/ }, // Validates a 6-digit pin code
      country: { type: String },
    },
  },
  { timestamps: true }
);

// Pre-save middleware to hash passwords
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Compile the schema into a model
const User = mongoose.model('User', UserSchema);

export default User;
