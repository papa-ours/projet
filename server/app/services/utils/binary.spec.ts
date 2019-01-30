import { expect } from "chai";
import { readLittleEndianBytes, numberToLittleEndinanByteArray } from "./binary";

describe("binary", () => {
	describe("numberToLittleEndinanByteArray", () => {
		it("should return an array of 0 if the number is 0", () => {
			const val: number = 0;
			const expected: Uint8Array = new Uint8Array(1);
			expected[0] = 0;
			const result = numberToLittleEndinanByteArray(val, 1);
			expect(result).to.deep.equals(expected);
		});
	});
	
	describe("readLittleEndianBytes", () => {
		it("should return 0 if the array contains 0", () => {
			const expected: number = 0;
			const val: Uint8Array = new Uint8Array(1);
			val[0] = 0;
			const result = readLittleEndianBytes(val, 1, 0);
			expect(result).to.equals(expected);
		});
	});
});
