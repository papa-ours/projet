export const NUMBER_OF_BITS_IN_A_BYTE: number = 8;
export const FULL_BYTE: number = 0xFF;

// Bitwise operators are required when working on binary data
/* tslint:disable:no-bitwise */
export const readLittleEndianBytes: (array: Uint8Array, byteCount: number, index: number) => number =
    (array: Uint8Array, byteCount: number, index: number): number => {
        let val: number = 0;
        for (let i: number = 0; i < byteCount; i++) {
            val |= array[index + i] << NUMBER_OF_BITS_IN_A_BYTE * i;
        }

        return val;
};

export const numberToLittleEndinanByteArray: (val: number, byteCount: number) => Uint8Array =
    (val: number, byteCount: number): Uint8Array => {
        const array: Uint8Array = new Uint8Array(byteCount);
        for (let i: number = 0; i < byteCount; i++) {
            array[i] = val & FULL_BYTE;
            val >>= NUMBER_OF_BITS_IN_A_BYTE;
        }

        return array;
};

/* tslint:enable:no-bitwise */
