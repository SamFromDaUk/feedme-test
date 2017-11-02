import FeedMe from './providers/Feed';
import StreamHandler from './models/StreamHandler';
import event from './models/FeedItem';

export default async () => {
  console.log('Starting app');

  try {
    const socket = await FeedMe();
    const streamHandler = new StreamHandler();

    socket.on('data', (chunk) => {
      streamHandler.onStream(chunk);
    });

    streamHandler.onPacket((packet) => {
      console.log(JSON.stringify(event(packet)));
    });
  } catch (e) {
    console.log(e);
  }
};
