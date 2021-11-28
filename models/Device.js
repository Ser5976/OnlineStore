import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const Device = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  picture: [{ type: String, required: true }],
  info: [{ title: String, description: String }],
  typeId: { type: String },
  brandId: { type: String },
});

export default model('Device', Device);
