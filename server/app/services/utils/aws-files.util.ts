import * as aws from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";

export class S3FileReader {
    private static s3: aws.S3 = new aws.S3();

    public static async readFile(fileName: string): Promise<PromiseResult<aws.S3.GetObjectOutput, aws.AWSError>> {
        return this.s3.getObject({Bucket: "uploads-diffs", Key: fileName}).promise();
    }

    public static async writeFile(fileName: string, data: Buffer): Promise<PromiseResult<aws.S3.PutObjectOutput, aws.AWSError>> {
        return this.s3.putObject({
            Bucket: "uploads-diffs",
            Key: fileName,
            Body: data,
            ACL: "public-read",
        }).promise();
    }
}
