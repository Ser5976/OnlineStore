import mongoose from 'mongoose';
const { Schema, model } = mongoose;
//import mongooseFuzzySearching from 'mongoose-fuzzy-searching';

const Device = new Schema({
  name: { type: String, required: true, index: 'text' },
  price: { type: Number, required: true },
  picture: [{ type: String, required: true }],
  description: { type: String, required: true },
  info: [{}],
  typeId: { type: String },
  brandId: { type: String },
});

//Device.plugin(mongooseFuzzySearching, { fields: ['name'] }); // плагин для нечёткого поиска по тексту
//Device.index({ name: 'text'}); это индекс для чёткого(полное слова) поиска по тексту

export default model('Device', Device);
