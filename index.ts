import * as gcp from "@pulumi/gcp";

// Create a GCP resource (Storage Bucket)

const name = [];
for (let i = 0; i < 10; i++) {
  const bucket = new gcp.storage.Bucket(`tydev-my-bucket-${i}`, {
    location: "US",
    project: "statsig-services",
  });
  name.push(bucket.id);
}

// Export the DNS name of the bucket
export const bucketName = name;
