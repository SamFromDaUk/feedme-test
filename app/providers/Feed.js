import net from 'net';

let socket = null;

export default async () => {
  if (!socket) {
    socket = net.createConnection({
      port: process.env.FEEDME_PORT,
      host: process.env.FEEDME_HOST,
    });

    socket.on('connect', () => {
      console.log('telnet:connected');
    });

    socket.on('end', () => {
      console.log('telnet:ended');
      socket = null;
    });
  }

  return socket;
};
