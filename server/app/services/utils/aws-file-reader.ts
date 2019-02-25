import * as aws from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";

export class S3FileReader {
    public static s3: aws.S3 = new aws.S3();

    public static async readFile(fileName: string): Promise<PromiseResult<aws.S3.GetObjectOutput, aws.AWSError>> {
        return S3FileReader.s3.getObject({Bucket: "uploads-diffs", Key: fileName}).promise();
    }
}
