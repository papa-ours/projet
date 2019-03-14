import * as aws from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
import { S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY } from "../../../../common/communication/constants";

export class AWSFilesUtil {
    public static async readFile(fileName: string): Promise<PromiseResult<aws.S3.GetObjectOutput, aws.AWSError>> {
        aws.config.update({
            accessKeyId: S3_ACCESS_KEY_ID,
            secretAccessKey: S3_SECRET_ACCESS_KEY,
        });
        const s3: aws.S3 = new aws.S3();

        return s3.getObject({Bucket: "uploads-diffs", Key: fileName}).promise();
    }

    public static async writeFile(fileName: string, data: Buffer): Promise<PromiseResult<aws.S3.PutObjectOutput, aws.AWSError>> {
        aws.config.update({
            accessKeyId: S3_ACCESS_KEY_ID,
            secretAccessKey: S3_SECRET_ACCESS_KEY,
        });
        const s3: aws.S3 = new aws.S3();

        return s3.putObject({
            Bucket: "uploads-diffs",
            Key: fileName,
            Body: data,
            ACL: "public-read",
        }).promise();
    }
}
