export class BufferedWriter {
	#buffer: Buffer = Buffer.alloc(30000);
	#index: number = 0;

	constructor() {}
	writeByte(v: number) {
		this.#buffer.writeUInt8(v, this.#index++);
	}
	writeShort(v: number) {
		this.#buffer.writeUInt16LE(v, this.#index);
		this.#index += 2;
	}
	writeString(str: string) {
		this.writeShort(str.length);
		for (let i = 0; i < str.length; i++) {
			this.#buffer.writeUInt8(str.charCodeAt(i));
		}
	}
	getBuffer() {
		return this.#buffer.subarray(0, this.#index);
	}
}
