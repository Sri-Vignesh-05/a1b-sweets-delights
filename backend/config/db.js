const mongoose = require('mongoose');


module.exports = async function connectDB() {
try {
const conn = await mongoose.connect(process.env.MONGO_DB_URL, {
dbName: process.env.MONGO_DB_NAME || undefined,
});
console.log(`MongoDB connected: ${conn.connection.host}`);
} catch (err) {
console.error('MongoDB connection error:', err);
process.exit(1);
}
};