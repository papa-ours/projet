import * as aws from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";

export class S3FileReader {
    public s3: aws.S3;

    public constructor() {
        this.s3 = new aws.S3();
    }

    public async readFile(fileName: string): Promise<PromiseResult<aws.S3.GetObjectOutput, aws.AWSError>> {
        return this.s3.getObject({Bucket: "uploads-diffs", Key: fileName}).promise();
    }
}
