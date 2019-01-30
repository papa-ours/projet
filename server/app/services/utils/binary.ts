export const NUMBER_OF_BITS_IN_A_BYTE = 8;

export function readLittleEndianBytes(array: Uint8Array, index: number, byteCount: number): number {
	let val: number = 0;
	for (let i: number = 0; i < byteCount; i++) {
		val |= array[index + i] << NUMBER_OF_BITS_IN_A_BYTE * (byteCount - i);
	}
	return val;
}

export function numberToLittleEndinanByteArray(val: number, byteCount: number): Uint8Array {
	const array: Uint8Array = new Uint8Array(byteCount);
	for (let i: number = 0; i < byteCount; i++) {
		array[i] = (val >> NUMBER_OF_BITS_IN_A_BYTE * (byteCount - i)) & 0xFF;
	}
	return array;
}