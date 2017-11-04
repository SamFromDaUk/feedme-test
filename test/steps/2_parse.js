import assert from 'assert';
import parse from '../../app/steps/2_parse';

const testData = {
  validEventInput: '|2054|create|event|1497359166352|ee4d2439-e1c5-4cb7-98ad-9879b2fd84c2|Football|Sky Bet League Two|\\|Accrington\\| vs \\|Cambridge\\||1497359216693|0|1|',
  validEventOutput: {
    meta: {
      msgId: '2054',
      operation: 'create',
      type: 'event',
      timestamp: '1497359166352',
    },
    id: 'ee4d2439-e1c5-4cb7-98ad-9879b2fd84c2',
    category: 'Football',
    subCategory: 'Sky Bet League Two',
    name: '|Accrington| vs |Cambridge|',
    startTime: '1497359216693',
    displayed: 0,
    suspended: 1,
  },
  validMarketInput: '|69|create|market|1509831534606|ffb15ef2-8717-4e7c-b050-e0e6c9c278b0|91488313-da39-4561-a477-f13ea1cbebde|Goal Handicap (+1)|0|1|',
  validMarketOutput: {
    displayed: '0',
    eventId: 'ffb15ef2-8717-4e7c-b050-e0e6c9c278b0',
    id: '91488313-da39-4561-a477-f13ea1cbebde',
    meta: {
      msgId: '69',
      operation: 'create',
      timestamp: '1509831534606',
      type: 'market',
    },
    name: 'Goal Handicap (+1)',
    suspended: '1',
  },
  validOutcomeInput: '|70|create|outcome|1509831534606|91488313-da39-4561-a477-f13ea1cbebde|f1d09901-dbdf-482d-8f6e-ccc9aa6ef49d|\\|Bristol Rovers\\| +1|6/5|0|1|',
  validOutcomeOutput: {
    displayed: '0',
    id: 'f1d09901-dbdf-482d-8f6e-ccc9aa6ef49d',
    marketId: '91488313-da39-4561-a477-f13ea1cbebde',
    meta: {
      msgId: '70',
      operation: 'create',
      timestamp: '1509831534606',
      type: 'outcome',
    },
    name: '|Bristol Rovers| +1',
    price: '6/5',
    suspended: '1',
  },
  invalidType: '|70|create|garbled|1509831534606|91488313-da39-4561-a477-f13ea1cbebde|f1d09901-dbdf-482d-8f6e-ccc9aa6ef49d|\\|Bristol Rovers\\| +1|6/5|0|1|',
};

describe('steps/2_parse', () => {
  it('Handles an event packet', () => {
    const output = parse(testData.validEventInput);

    assert.deepEqual(output, testData.validEventOutput);
  });

  it('Handles a market packet', () => {
    const output = parse(testData.validMarketInput);

    assert.deepEqual(output, testData.validMarketOutput);
  });

  it('Handles an outcome packet', () => {
    const output = parse(testData.validOutcomeInput);

    assert.deepEqual(output, testData.validOutcomeOutput);
  });

  it('Errors on a unknown packet type', () => {
    try {
      parse(testData.invalidType);
      assert.ok(false, 'Expected to error on invalid type');
    } catch (e) {
      assert.ok(true);
    }
  });
});
