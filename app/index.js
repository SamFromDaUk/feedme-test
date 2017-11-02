import FeedMe from './providers/FeedMe';
import StreamHandler from './models/StreamHandler';
import event from './models/event';

export default async () => {
  console.log('Starting app');

  try {
    const socket = await FeedMe();
    const streamHandler = new StreamHandler();

    socket.on('data', (chunk) => {
      streamHandler.onStream(chunk);
    });

    streamHandler.onChunk((packet) => {
      console.log(JSON.stringify(event(packet)));
    });
  } catch (e) {
    console.log(e);
  }
};
