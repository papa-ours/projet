import * as aws from "aws-sdk";

export class S3FileReader {
    public s3: aws.S3;

    public constructor() {
        this.s3 = new aws.S3();
    }
}
