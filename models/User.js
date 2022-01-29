import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const User = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  basket: [
    {
      name: String,
      price: Number,
      picture: [],
      description: String,
      id: String,
      quantity: Number,
    },
  ],
  role: { type: String, default: 'USER' },
});

export default model('User', User);
