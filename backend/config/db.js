const mongoose = require('mongoose');

const connectDB = async () => {
  // Try MongoDB Atlas first, fallback to local if not available
  const atlasUri = process.env.MONGO_URI;
  const localUri = 'mongodb://127.0.0.1:27017/srida_dev';
  const uri = atlasUri || localUri;
  
  console.log('Attempting to connect to MongoDB...');
  console.log(`Using ${uri.includes('mongodb+srv') ? 'MongoDB Atlas' : 'local MongoDB'}`);

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('MongoDB connected successfully! 🎉');
    return;
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    if (atlasUri && uri === atlasUri) {
      console.log('Falling back to local MongoDB...');
      try {
        await mongoose.connect(localUri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 5000,
        });
        console.log('Connected to local MongoDB successfully! 🎉');
        return;
      } catch (localErr) {
        console.error('Local MongoDB connection error:', localErr.message);
      }
    }
    throw err;
  }
};

module.exports = connectDB;
