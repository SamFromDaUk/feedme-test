const map = {
  standard: ['msgId', 'operation', 'type', 'timestamp'],
  event: ['eventId', 'category', 'subCategory', 'name', 'startTime', 'displayed', 'suspended'],
  market: ['eventId', 'marketId', 'name', 'displayed', 'suspended'],
  outcome: ['marketId', 'outcomeId', 'name', 'price', 'displayed', 'suspended'],
};

export default (chunk) => {
  const arr = chunk.replace(/\\\|/g, ':::').split('|').map(section => section.replace(/:::/g, '|'));
  const output = {
    data: {},
  };

  arr.shift();

  map.standard.forEach((key) => {
    output[key] = arr.shift();
  });

  if (!['event', 'market', 'outcome'].includes(output.type)) {
    throw new Error(`Unexpected output type: ${output.type}`);
  }

  map[output.type].forEach((key) => {
    output.data[key] = arr.shift();
  });

  return output;
};
