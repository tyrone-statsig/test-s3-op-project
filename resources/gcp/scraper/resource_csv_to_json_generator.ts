import * as csvParser from "csv-parser";
import * as fs from "fs";

// Define the type for each row in the CSV
interface CsvRow {
  Name: string;
  "Resource type": string;
  "Project Id": string;
  "Display name": string;
  Status: string;
  Folders: string;
  Organization: string;
  "Parent asset type": string;
  "Parent full resource name": string;
  "KMS keys": string;
  "Direct tags": string;
  Description: string;
  Location: string;
  Labels: string;
  "Network tags": string;
  "Additional attributes": string;
}

const gcp_resources = {
  "artifactregistry.Repository":
    "gcp:artifactregistry/repositoryIamBinding:RepositoryIamBinding",
  "bigquery.Dataset": "gcp:bigquery/dataset:Dataset",
  "bigquery.Table": "gcp:bigquery/table:Table",
  "compute.Address": "gcp:compute/address:Address",
  "compute.BackendService": "gcp:compute/backendService:BackendService",
  "compute.Disk": "gcp:compute/disk:Disk",
  "compute.Firewall": "gcp:compute/firewall:Firewall",
  "compute.FirewallPolicy": "gcp:compute/firewallPolicy:FirewallPolicy",
  "compute.ForwardingRule": "gcp:compute/forwardingRule:ForwardingRule",
  "compute.HealthCheck": "gcp:compute/healthCheck:HealthCheck",
  "compute.Instance": "gcp:compute/instance:Instance",
  "compute.InstanceGroup": "gcp:compute/instanceGroup:InstanceGroup",
  "compute.InstanceGroupManager":
    "gcp:compute/instanceGroupManager:InstanceGroupManager",
  "compute.InstanceTemplate": "gcp:compute/instanceTemplate:InstanceTemplate",
  "compute.Network": "gcp:compute/network:Network",
  "compute.NetworkEndpointGroup":
    "gcp:compute/networkEndpointGroup:NetworkEndpointGroup",
  "compute.Route": "gcp:compute/route:Route",
  "compute.Router": "gcp:compute/router:Router",
  "compute.SslCertificate": "gcp:compute/sSLCertificate:SSLCertificate",
  "compute.SslPolicy": "gcp:compute/sSLPolicy:SSLPolicy",
  "compute.Subnetwork": "gcp:compute/subnetwork:Subnetwork",
  "compute.TargetHttpProxy": "gcp:compute/targetHttpProxy:TargetHttpProxy",
  "compute.TargetHttpsProxy": "gcp:compute/targetHttpsProxy:TargetHttpsProxy",
  "compute.TargetVpnGateway": "gcp:compute/vPNGateway:VPNGateway",
  "compute.UrlMap": "gcp:compute/uRLMap:URLMap",
  "compute.VpnTunnel": "gcp:compute/vPNTunnel:VPNTunnel",
  "container.Cluster": "gcp:container/cluster:Cluster",
  "container.NodePool": "gcp:container/nodePool:NodePool",
  "dataproc.AutoscalingPolicy":
    "gcp:dataproc/autoscalingPolicy:AutoscalingPolicy",
  "dataproc.Cluster": "", // DOES NOT SUPPORT IMPORT.
  "dataproc.Job": "", // DOES NOT SUPPORT IMPORT.
  "dns.ManagedZone": "gcp:dns/managedZone:ManagedZone",
  "gkehub.Feature": "gcp:gkehub/feature:Feature",
  "gkehub.Fleet": "gcp:gkehub/fleet:Fleet",
  "gkehub.Membership": "gcp:gkehub/membership:Membership",
  "iam.ServiceAccount": "gcp:serviceaccount/account:Account",
  "iam.ServiceAccountKey": "", // Does not support import
  "logging.LogBucket": "gcp:logging/folderBucketConfig:FolderBucketConfig",
  "logging.LogMetric": "gcp:logging/metric:Metric",
  "logging.LogSink": "gcp:logging/billingAccountSink:BillingAccountSink",
  "networkmanagement.ConnectivityTest":
    "gcp:networkmanagement/connectivityTest:ConnectivityTest",
  "pubsub.Subscription": "gcp:pubsub/subscription:Subscription",
  "pubsub.Topic": "gcp:pubsub/topic:Topic",
  "redis.Instance": "gcp:redis/instance:Instance",
  "secretmanager.Secret": "gcp:secretmanager/secret:Secret",
  "secretmanager.SecretVersion":
    "gcp:secretmanager/secretVersion:SecretVersion",
  "servicedirectory.Endpoint": "gcp:servicedirectory/endpoint:Endpoint",
  "servicedirectory.Namespace": "gcp:servicedirectory/namespace:Namespace",
  "servicedirectory.Service": "gcp:servicedirectory/service:Service",
  "serviceusage.Service": "", // None
  "sqladmin.Instance": "", //None,
  "storage.Bucket": "gcp:storage/bucket:Bucket",
};

// Array to store extracted information
const extractedData: { type: string; name: string; id: string }[] = [];

// Read the CSV file and extract information
fs.createReadStream("cloud_resources.csv")
  .pipe(csvParser())
  .on("data", (row: CsvRow) => {
    // Extract the required information (Display name and Project Id)

    const name_struct = {
      type: "gcp:storage/bucket:Bucket",
      name: `${row["Project Id"]}/${row["Display name"]}`,
      id: `${row["Display name"]}`,
    };

    // Add the extracted information to the array
    extractedData.push(name_struct);
  })
  .on("end", () => {
    // Print or use the extracted data
    let json_formated_data = {
      resources: extractedData,
    };
    fs.writeFile(
      "bucket_import.json",
      JSON.stringify(json_formated_data),
      (error) => {
        if (error) throw error;
      }
    );
  });
