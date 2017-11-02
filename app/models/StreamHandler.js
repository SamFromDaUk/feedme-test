export default class {
  constructor() {
    this.buffer = '';
    this.fn = () => {};

    setInterval(() => {
      this.getPacket();
    }, 500);
  }

  onStream(data) {
    this.buffer += data.toString('utf8');
  }

  getPacket() {
    const separator = this.buffer.indexOf('\n');

    if (separator < 0) {
      return;
    }

    this.fn(this.buffer.slice(0, separator));
    this.buffer = this.buffer.substring(separator + 1);

    if (this.buffer.length) {
      this.getPacket();
    }
  }

  onChunk(fn) {
    this.fn = fn;
  }
}
