const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const directUri = process.env.MONGODB_DIRECT_URI;

if (!uri) {
  console.error('MONGODB_URI is not set. Create a .env file inside the backend directory.');
}

let activeClient = null;

async function connectWith(selectedUri, label) {
  const candidate = new MongoClient(selectedUri, { serverSelectionTimeoutMS: 30000 });
  await candidate.connect();
  console.log(`You successfully connected to MongoDB (${label})!`);
  return candidate;
}

async function connectToMongoDB() {
  if (activeClient) return activeClient;
  try {
    activeClient = await connectWith(uri, 'MONGODB_URI');
  } catch (err) {
    // SRV (querySrv) resolution is refused on some networks; fall back to a direct URI.
    if (directUri && err.code === 'ECONNREFUSED' && /querySrv/.test(err.message)) {
      console.log('SRV lookup refused by the network, retrying with the direct (non-SRV) URI...');
      activeClient = await connectWith(directUri, 'MONGODB_DIRECT_URI');
    } else {
      console.dir(err);
      throw err;
    }
  }
  return activeClient;
}

function getDatabase() {
  if (!activeClient) throw new Error('Not connected to MongoDB. Call connectToMongoDB() first.');
  return activeClient.db(process.env.DB_NAME || 'popularpersons');
}

async function disconnectFromMongoDB() {
  if (activeClient) {
    await activeClient.close();
    activeClient = null;
  }
}

module.exports = { connectToMongoDB, getDatabase, disconnectFromMongoDB };