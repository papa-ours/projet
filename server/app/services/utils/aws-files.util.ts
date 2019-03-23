import * as aws from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
import { S3Util } from "./s3.util";

export class AWSFilesUtil {
    private static s3Util: S3Util = new S3Util();

    public static async readFile(fileName: string): Promise<PromiseResult<aws.S3.GetObjectOutput, aws.AWSError>> {
        return this.s3Util.s3.getObject({Bucket: "uploads-diffs", Key: fileName}).promise();
    }

    public static async writeFile(fileName: string, data: Buffer): Promise<PromiseResult<aws.S3.PutObjectOutput, aws.AWSError>> {
        return this.s3Util.s3.putObject({
            Bucket: "uploads-diffs",
            Key: fileName,
            Body: data,
            ACL: "public-read",
        }).promise();
    }
}
