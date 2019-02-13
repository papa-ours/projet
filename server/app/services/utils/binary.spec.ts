import { expect } from "chai";
import { numberToLittleEndinanByteArray, readLittleEndianBytes } from "../../../../common/images/binary";

/* tslint:disable:no-magic-numbers */
describe("binary", () => {
    describe("numberToLittleEndinanByteArray", () => {
        it("should return an array of 0 if the number is 0", () => {
            const val: number = 0;
            const expected: Uint8Array = new Uint8Array([0]);
            const result: Uint8Array = numberToLittleEndinanByteArray(val, 1);
            expect(result).to.deep.equals(expected);
        });

        it("should return an array containing 3, 2, 1 if the input is 0x010203", () => {
            const byteCount: number = 3;
            const val: number = 0x010203;
            const expected: Uint8Array = new Uint8Array([3, 2, 1]);
            const result: Uint8Array = numberToLittleEndinanByteArray(val, byteCount);
            expect(result).to.deep.equals(expected);
        });

        it("should return an array containing 4, 3, 2, 1 if the input is 0x01020304", () => {
            const byteCount: number = 4;
            const val: number = 0x01020304;
            const expected: Uint8Array = new Uint8Array([4, 3, 2, 1]);
            const result: Uint8Array = numberToLittleEndinanByteArray(val, byteCount);
            expect(result).to.deep.equals(expected);
        });
    });

    describe("readLittleEndianBytes", () => {
        it("should return 0 if the array contains 0", () => {
            const expected: number = 0;
            const val: Uint8Array = new Uint8Array([0]);
            const result: number = readLittleEndianBytes(val, 1, 0);
            expect(result).to.equals(expected);
        });

        it("should return 0x030201 if the array contains 1, 2, 3", () => {
            const byteCount: number = 3;
            const expected: number = 0x030201;
            const val: Uint8Array = new Uint8Array([1, 2, 3]);
            const result: number = readLittleEndianBytes(val, byteCount, 0);
            expect(result).to.equals(expected);
        });

        it("should return 0x04030201 if the array contains 1, 2, 3, 4", () => {
            const byteCount: number = 4;
            const expected: number = 0x04030201;
            const val: Uint8Array = new Uint8Array([1, 2, 3, 4]);
            const result: number = readLittleEndianBytes(val, byteCount, 0);
            expect(result).to.equals(expected);
        });

        it("should not read bytes after byteCount", () => {
            const byteCount: number = 4;
            const expected: number = 0x04030201;
            const val: Uint8Array = new Uint8Array([1, 2, 3, 4, 255, 255]);
            const result: number = readLittleEndianBytes(val, byteCount, 0);
            expect(result).to.equals(expected);
        });

        it("should not read bytes before offset", () => {
            const byteCount: number = 4;
            const offset: number = 2;
            const expected: number = 0x04030201;
            const val: Uint8Array = new Uint8Array([255, 255, 1, 2, 3, 4]);
            const result: number = readLittleEndianBytes(val, byteCount, offset);
            expect(result).to.equals(expected);
        });

        it("should not read bytes before offset or after byteCount + offset", () => {
            const byteCount: number = 4;
            const offset: number = 2;
            const expected: number = 0x04030201;
            const val: Uint8Array = new Uint8Array([255, 255, 1, 2, 3, 4, 255, 255]);
            const result: number = readLittleEndianBytes(val, byteCount, offset);
            expect(result).to.equals(expected);
        });
    });
});
