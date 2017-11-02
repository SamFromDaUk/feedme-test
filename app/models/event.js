// |38747|update|outcome|1509567274793|a50deecb-df27-4daf-b235-2a51f649261f|9c2d6ac4-0ea2-4b66-bc64-0bea8de5eccd|\|Stan Wawrinka\||9/1|1|0|

export default (chunk) => {
  const arr = chunk.replace(/\\\|/g, ':::').split('|').map(section => section.replace(/:::/g, '|'));

  arr.shift();

  const output = {
    msgId: arr.shift(),
    operation: arr.shift(),
    type: arr.shift(),
    timestamp: arr.shift(),
    data: {},
  };

  if (output.type === 'event') {
    output.data = {
      eventId: arr.shift(),
      category: arr.shift(),
      subCategory: arr.shift(),
      name: arr.shift(),
      startTime: arr.shift(),
      displayed: arr.shift(),
      suspended: arr.shift(),
    };

    return output;
  }

  if (output.type === 'market') {
    output.data = {
      eventId: arr.shift(),
      marketId: arr.shift(),
      name: arr.shift(),
      displayed: arr.shift(),
      suspended: arr.shift(),
    };

    return output;
  }

  if (output.type === 'outcome') {
    output.data = {
      marketId: arr.shift(),
      outcomeId: arr.shift(),
      name: arr.shift(),
      price: arr.shift(),
      displayed: arr.shift(),
      suspended: arr.shift(),
    };

    return output;
  }

  throw new Error(`Unexpected output type: ${output.type}`);
};
