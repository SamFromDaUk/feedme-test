import assert from 'assert';
import proxyquire from 'proxyquire';

let mongodb;
let connectStub;

beforeEach(() => {
  mongodb = proxyquire('../../app/stores/mongodb', {
    mongodb: {
      MongoClient: {
        connect: () => connectStub(...arguments),
      },
    },
  });
});

describe('stores/mongodb', () => {
  it('Only tries to connect to mongo once', async () => {
    let counter = 0;

    connectStub = () => {
      counter += 1;

      return {};
    };

    await mongodb.default();
    await mongodb.default();
    await mongodb.default();

    assert.equal(counter, 1);
  });
});
