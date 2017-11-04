import feed from './providers/feed';
import buffer from './steps/1_buffer';
import parse from './steps/2_parse';
import store from './steps/3_store';
import mongo from './stores/mongodb';

export default async () => {
  console.log('Starting app');

  try {
    const db = await mongo();

    if (process.env.CLEAR_DB_ON_STARTUP) {
      console.log('mongo: dropping database');
      await db.dropDatabase();
    }

    const socket = await feed();

    socket.on('data', (chunk) => {
      const packets = buffer(chunk);

      const events = packets.map(packet => parse(packet));

      events.forEach((event) => {
        store(event);
      });
    });
  } catch (e) {
    console.log(e);
  }
};
