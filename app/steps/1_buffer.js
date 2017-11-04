let buffer = '';

export default (data) => {
  buffer += data.toString('utf8');

  const packets = [];
  let remaining = true;

  while (remaining) {
    const separator = buffer.indexOf('\n');

    if (separator < 0) {
      remaining = false;

      break;
    }

    packets.push(buffer.slice(0, separator));
    buffer = buffer.substring(separator + 1);
  }

  return packets;
};
