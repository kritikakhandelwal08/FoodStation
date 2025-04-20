import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const KitchenSchema = new mongoose.Schema({
  kitchenName: { type: String, required: true },
  ownerName: { type: String, required: true },
  ownerEmail: { type: String, required: true, unique: true }, // Added unique constraint
  contactNumber: { type: String, required: true },
  kitchenAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  password: { type: String, required: true },
});


// Hash the password before saving
KitchenSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare passwords
KitchenSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Kitchen = mongoose.model('Kitchen', KitchenSchema);

export default Kitchen;
