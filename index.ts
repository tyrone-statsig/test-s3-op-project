import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";

import { createBucket } from "./resources/gcp/storage/buckets";

let buckets = createBucket("tydev-new-argocd-stck", 3);

// Export the DNS name of the bucket
export const bucketName = buckets;
