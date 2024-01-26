import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";

import { createBucket } from "./resources/gcp/storage/createBucket";

let buckets = createBucket("tydev-bucket-hello", 1);

// Export the DNS name of the bucket
export const bucketName = buckets;
