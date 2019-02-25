import * as aws from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";

export class S3FileReader {
    public static async readFile(fileName: string): Promise<PromiseResult<aws.S3.GetObjectOutput, aws.AWSError>> {
        aws.config.update({
            accessKeyId: "AKIAI23N35EM3WRJXQRA",
            secretAccessKey: "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",
        });

        const s3: aws.S3 = new aws.S3();

        return s3.getObject({Bucket: "uploads-diffs", Key: fileName}).promise();
    }

    public static async writeFile(fileName: string, data: Buffer): Promise<PromiseResult<aws.S3.PutObjectOutput, aws.AWSError>> {
        aws.config.update({
            accessKeyId: "AKIAI23N35EM3WRJXQRA",
            secretAccessKey: "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",
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
