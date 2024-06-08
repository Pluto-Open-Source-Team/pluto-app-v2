export interface PolicyProps {
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
}

export interface PolicyTableProps extends PolicyProps {
  id?: string;
  orgUnitId: string;
  namespace: string;
  cachedAt: string;
}

export interface ResolvePoliciesRequestBody {
  policyTargetKey: {
    targetResource: string;
  };
  policySchemaFilter: string;
  pageSize: number;
}

export interface ResolvePoliciesResponseBody {
  resolvedPolicies: PolicyProps[];
  nextPageToken: string;
}
