import { expect } from "chai";
import { DeepCloner } from "./deep-cloner";

describe("DeepCloner", () => {
    it("should make a deep copy of an object", () => {
        const originalObject: String = "Hello";
        let modifiedObject: String = DeepCloner.clone(originalObject);
        modifiedObject = "test";
        expect(originalObject).to.not.deep.equal(modifiedObject);
    });

});
