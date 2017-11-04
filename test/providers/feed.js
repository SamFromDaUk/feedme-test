import assert from 'assert';
import proxyquire from 'proxyquire';

let feed;
let createConnectionStub = () => {};

beforeEach(() => {
  feed = proxyquire('../../app/providers/feed', {
    net: {
      createConnection: () => { // eslint-disable-line arrow-body-style
        return createConnectionStub(...arguments);
      },
    },
  });
});

describe('providers/feed', () => {
  it('Returns the a net socket', async () => {
    const mockSocket = { test: true, on: () => {} };

    createConnectionStub = () => mockSocket;

    const socket = await feed.default();

    assert.deepEqual(mockSocket, socket);
  });

  it('Doesnt create multiple sockets if called multiple times', async () => {
    const mockSocket = { on: () => {} };
    let counter = 0;

    createConnectionStub = () => {
      counter += 1;

      return mockSocket;
    };

    await feed.default();
    await feed.default();
    await feed.default();

    assert.equal(counter, 1);
  });

  it('Removes the socket reference if the socket ends', async () => {
    let counter = 0;
    let removeSocketFn;

    const mockSocket = {
      on: (name, fn) => {
        if (name === 'end') {
          removeSocketFn = fn;
        }
      },
    };

    createConnectionStub = () => {
      counter += 1;

      return mockSocket;
    };

    await feed.default();

    removeSocketFn();

    await feed.default();

    assert.equal(counter, 2);
  });
});
