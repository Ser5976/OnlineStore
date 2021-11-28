import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const Type = new Schema({
  name: { type: String, required: true },
  brands: [{ type: Schema.Types.ObjectId, ref: 'Brand' }],
});

export default model('Type', Type);
