import { StorageBucket } from "./buckets";

let buckets: StorageBucket[] = [
  new StorageBucket("tydev-bucket-hello", {
    project: "statsig-services",
    location: "US",
  }),
];

let bucketConfig = {
  latest: [
    new StorageBucket("statsig-services/log-event-latest", {
      lifecycleRules: [
        {
          action: {
            type: "Delete",
          },
          condition: {
            age: 14,
            withState: "ANY",
          },
        },
      ],
      location: "US-WEST1",
      name: "log-event-latest",
      project: "statsig-services",
      publicAccessPrevention: "enforced",
      uniformBucketLevelAccess: true,
    }),
  ],
  staging: [],
  prod: {},
};
