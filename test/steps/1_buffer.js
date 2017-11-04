import assert from 'assert';
import proxyquire from 'proxyquire';

let buffer;

beforeEach(() => {
  buffer = proxyquire('../../app/steps/1_buffer', {});
});

const testData = {
  lessThanOnePacket: Buffer.from('123|1234|12345'),
  morethanOnePacket: Buffer.from('123|1234|12345\n234|2345|'),
  morethanTwoPacket: Buffer.from('123|1234|12345\n234|2345|23456\n123'),
  separatedPacket: [Buffer.from('123|1234|1234'), Buffer.from('5\n')],
};

describe('steps/1_buffer', () => {
  it('Handles a chunk of less than one packet', () => {
    assert.equal(0, buffer.default(testData.lessThanOnePacket).length);
  });

  it('Handles a chunk of more than one packet', () => {
    assert.equal(1, buffer.default(testData.morethanOnePacket).length);
  });

  it('Handles a chunk of more than two packets', () => {
    assert.equal(2, buffer.default(testData.morethanTwoPacket).length);
  });

  it('Handles a separated packet over 2 separate chunks', () => {
    assert.equal(0, buffer.default(testData.separatedPacket[0]).length);

    const data = buffer.default(testData.separatedPacket[1]);

    assert.equal(1, data.length);
    assert.equal('123|1234|12345', data[0]);
  });
});
