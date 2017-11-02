import FeedMe from './providers/Feed';
import StreamHandler from './models/StreamHandler';
import event from './models/FeedItem';
import mongo from './stores/mongodb';

const createItem = async (item) => {
  try {
    const db = await mongo();

    await db.collection(item.meta.type).insertOne(item);
  } catch (e) {
    console.log(e);
  }
};

export default async () => {
  console.log('Starting app');

  try {
    await mongo();

    const socket = await FeedMe();
    const streamHandler = new StreamHandler();

    socket.on('data', (chunk) => {
      streamHandler.onStream(chunk);
    });

    streamHandler.onPacket((packet) => {
      const item = event(packet);

      if (item.meta.operation === 'create') {
        createItem(item);
      }
    });
  } catch (e) {
    console.log(e);
  }
};
