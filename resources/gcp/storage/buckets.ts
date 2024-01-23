// Create a GCP resource (Storage Bucket)
import * as gcp from "@pulumi/gcp";

import { Bucket } from "@pulumi/gcp/storage";

export function createBucket(name: string, count: number) {
  const buckets = [];
  for (let i = 0; i < count; i++) {
    const bucket = new gcp.storage.Bucket(`${name}-pulumi-demo-${i}`, {
      location: "US",
      project: "statsig-services",
    });
    buckets.push(bucket.name);
  }
  return buckets;
}
