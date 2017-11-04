import assert from 'assert';
import proxyquire from 'proxyquire';

let store;
let insertOneStub = async () => {};
let updateOneStub = async () => {};

beforeEach(() => {
  store = proxyquire('../../app/steps/3_store', {
    '../stores/mongodb': {
      default: async () => ({
        collection: () => ({
          insertOne: insertOneStub,
          updateOne: updateOneStub,
        }),
      }),
    },
  });
});

describe('steps/3_store', () => {
  it('A create event stores the data passed and the created_at time', async () => {
    let hasCalled = false;

    insertOneStub = async (data) => {
      hasCalled = true;
      assert.equal(data.meta.operation, 'create');
      assert.ok(data.created_at instanceof Date);
    };

    try {
      await store.default({
        meta: {
          operation: 'create',
        },
        test: true,
      });

      assert.ok(hasCalled);
    } catch (e) {
      assert.ok(false, e);
    }
  });

  it('A update event stores the data passed and the updated_at time', async () => {
    let hasCalled = false;

    updateOneStub = async (filter, data) => {
      hasCalled = true;
      assert.equal(data.$set.meta.operation, 'update');
      assert.ok(data.$set.updated_at instanceof Date);
    };

    try {
      await store.default({
        meta: {
          operation: 'update',
        },
        test: true,
      });

      assert.ok(hasCalled);
    } catch (e) {
      assert.ok(false, e);
    }
  });
});
