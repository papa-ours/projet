export const NUMBER_OF_BITS_IN_A_BYTE = 8;

export function readLittleEndianBytes(array: Uint8Array, byteCount: number, index: number): number {
	let val: number = 0;
	for (let i: number = 0; i < byteCount; i++) {
		val |= array[index + i] << NUMBER_OF_BITS_IN_A_BYTE * i;
	}
	return val;
}

export function numberToLittleEndinanByteArray(val: number, byteCount: number): Uint8Array {
	const array: Uint8Array = new Uint8Array(byteCount);
	for (let i: number = 0; i < byteCount; i++) {
		array[i] = val & 0xFF;
		val >>= NUMBER_OF_BITS_IN_A_BYTE;
	}
	return array;
}