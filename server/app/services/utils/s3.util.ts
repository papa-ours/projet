import * as aws from "aws-sdk";
import { S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY } from "../../../../common/communication/constants";

export class S3Util {
    public s3: aws.S3;

    public constructor() {
        aws.config.update({
            accessKeyId: S3_ACCESS_KEY_ID,
            secretAccessKey: S3_SECRET_ACCESS_KEY,
        });
        this.s3 = new aws.S3();
    }
}
