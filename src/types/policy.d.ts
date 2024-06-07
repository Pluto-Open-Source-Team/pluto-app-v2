interface ResolvePoliciesRequestBody {
  policyTargetKey: {
    targetResource: string;
  };
  policySchemaFilter: string;
  pageSize: number;
}

interface ResolvePoliciesResponseBody {
  resolvedPolicies: {
    targetKey: {
      targetResource: string;
    };
    value: {
      policySchema: string;
      value: any;
    };
    sourceKey: {
      targetResource: string;
    };
  }[];
  nextPageToken: string;
}
