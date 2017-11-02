import mongodb from 'mongodb';

const client = mongodb.MongoClient;
let instance = null;


export default async () => {
  if (!instance) {
    instance = await client.connect(process.env.MONGODB_SERVER);
  }

  return instance;
};
