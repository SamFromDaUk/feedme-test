export default class {
  constructor() {
    this.buffer = '';
    this.fn = () => {};

    this.getPacket();
  }

  onStream(data) {
    this.buffer += data.toString('utf8');
  }

  getPacket() {
    const separator = this.buffer.indexOf('\n');

    if (separator < 0) {
      this.checkBuffer();
      return;
    }

    this.fn(this.buffer.slice(0, separator));
    this.buffer = this.buffer.substring(separator + 1);

    if (this.buffer.length) {
      this.getPacket();

      return;
    }

    this.checkBuffer();
  }

  // Once the buffer is exhausted wait 100ms before checking again
  checkBuffer() {
    setTimeout(() => {
      this.getPacket();
    }, 100);
  }

  onPacket(fn) {
    this.fn = fn;
  }
}
