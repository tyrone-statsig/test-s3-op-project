// // import { StorageBucket } from "./buckets";

// let bucketConfig = {
//   latest: [
//     new StorageBucket("statsig-services/log-event-latest", {
//       lifecycleRules: [
//         {
//           action: {
//             type: "Delete",
//           },
//           condition: {
//             age: 14,
//             withState: "ANY",
//           },
//         },
//       ],
//       location: "US-WEST1",
//       name: "log-event-latest",
//       project: "statsig-services",
//       publicAccessPrevention: "enforced",
//       uniformBucketLevelAccess: true,
//     }),
//   ],
//   staging: [],
//   prod: [
//     new StorageBucket("statsig-services/statsig-spark-lib", {
//       location: "US-WEST1",
//       name: "statsig-spark-lib",
//       project: "statsig-services",
//       publicAccessPrevention: "enforced",
//       uniformBucketLevelAccess: true,
//     }),
//     new StorageBucket(
//       "statsig-services/dataproc-temp-us-west1-1026503415486-cgylpcpd",
//       {
//         lifecycleRules: [
//           {
//             action: {
//               type: "Delete",
//             },
//             condition: {
//               age: 90,
//               withState: "ANY",
//             },
//           },
//         ],
//         location: "US-WEST1",
//         name: "dataproc-temp-us-west1-1026503415486-cgylpcpd",
//         project: "statsig-services",
//         publicAccessPrevention: "inherited",
//       }
//     ),
//   ],
//   dev: [
//     new StorageBucket("statsig-services/processed-events-test", {
//       location: "US-WEST1",
//       name: "processed-events-test",
//       project: "statsig-services",
//       publicAccessPrevention: "enforced",
//       uniformBucketLevelAccess: true,
//     }),
//   ],
// };
