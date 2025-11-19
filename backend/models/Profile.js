const mongoose2 = require('mongoose');

const ProfileSchema = new mongoose2.Schema({
  _id: { type: mongoose2.Schema.Types.ObjectId, required: true }, // map to auth user id externally
  name: { type: String },
  phone: { type: String },
  address: { type: String },
  alternate_phone: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

ProfileSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

ProfileSchema.pre('findOneAndUpdate', function (next) {
  if (!this._update) this._update = {};
  this._update.updated_at = Date.now();
  next();
});

module.exports = mongoose2.models.Profile || mongoose2.model('Profile', ProfileSchema);