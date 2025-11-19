const ProfileModel = require('../models/Profile');


exports.getProfile = async function (req, res) {
const userId = req.userId || req.query.user_id;
if (!userId) return res.status(400).json({ message: 'user id required' });
try {
const profile = await ProfileModel.findById(userId);
if (!profile) return res.status(404).json({});
res.json(profile);
} catch (err) {
res.status(500).json({ message: err.message });
}
};


exports.createOrUpdateProfile = async function (req, res) {
const userId = req.userId || req.body.user_id;
if (!userId) return res.status(400).json({ message: 'user id required' });
try {
const data = Object.assign({}, req.body);
delete data.user_id;
const profile = await ProfileModel.findOneAndUpdate({ _id: userId }, data, { upsert: true, new: true, setDefaultsOnInsert: true });
res.json(profile);
} catch (err) {
res.status(500).json({ message: err.message });
}
};