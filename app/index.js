import FeedMe from './providers/feedme';

export default async () => {
  console.log('Starting app');

  try {
    const socket = await FeedMe();

    socket.on('data', (chunk) => {
      console.log(chunk.toString('utf8'));
    });
  } catch (e) {
    console.log(e);
  }
}
