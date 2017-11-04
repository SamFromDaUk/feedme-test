const map = {
  standard: ['msgId', 'operation', 'type', 'timestamp'],
  event: ['id', 'category', 'subCategory', 'name', 'startTime', 'displayed', 'suspended'],
  market: ['eventId', 'id', 'name', 'displayed', 'suspended'],
  outcome: ['marketId', 'id', 'name', 'price', 'displayed', 'suspended'],
};

export default (packet) => {
  // @todo refactor this (handle escaped pipes)
  const arr = packet
    .replace(/\\\|/g, ':::')
    .split('|')
    .map(section => section.replace(/:::/g, '|'));

  const output = {
    meta: {},
  };

  arr.shift();

  map.standard.forEach((key) => {
    output.meta[key] = arr.shift();
  });

  if (!['event', 'market', 'outcome'].includes(output.meta.type)) {
    throw new Error(`Unexpected output type: ${output.meta.type}`);
  }

  map[output.meta.type].forEach((key) => {
    output[key] = arr.shift();
  });

  return output;
};
