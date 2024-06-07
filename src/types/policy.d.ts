export interface ResolvePoliciesRequestBody {
  policyTargetKey: {
    targetResource: string;
  };
  policySchemaFilter: string;
  pageSize: number;
}

export interface ResolvePoliciesResponseBody {
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
