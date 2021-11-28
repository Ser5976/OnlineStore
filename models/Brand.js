import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const Brand = new Schema({
  name: { type: String, required: true },
});

export default model('Brand', Brand);
