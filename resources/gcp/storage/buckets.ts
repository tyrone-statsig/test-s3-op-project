// Create a GCP resource (Storage Bucket)
import * as gcp from "@pulumi/gcp";

import { CustomResourceOptions, Output } from "@pulumi/pulumi";

import { BucketArgs } from "@pulumi/gcp/storage";
import { GCPEntity } from "../GCPEntity";

export class StorageBucket extends GCPEntity {
  bucketSchema: gcp.storage.BucketArgs;
  customResourceOptions: CustomResourceOptions | undefined;
  // create a constructor that takes in the bucket name and the bucket schema
  constructor(
    name: string,
    schema: BucketArgs,
    customResourceOptions?: CustomResourceOptions
  ) {
    super();
    this.bucketSchema = schema;
    this.customResourceOptions = customResourceOptions;
  }
}

function validateBucketConfig() {
  // TODO
}

function getBucketsPerEnv(buckets: StorageBucket[], env: string) {
  return buckets.filter((bucket) => bucket.env.includes(env));
}

export function createBucket(name: string, count: number): Output<string>[] {
  const buckets: Output<string>[] = []; // Fix: Initialize as an empty array of type string[]
  for (let i = 0; i < count; i++) {
    const bucket = new gcp.storage.Bucket(`${name}-pulumi-demo-${i}`, {
      location: "US",
      project: "statsig-services",
    });
    buckets.push(bucket.name);
  }
  return buckets;
}
