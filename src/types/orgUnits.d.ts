interface OrgUnitsProps {
  kind: string;
  name: string;
  description: string;
  etag: string;
  blockInheritance: string;
  orgUnitId: string;
  orgUnitPath: string;
  parentOrgUnitId: string;
  parentOrgUnitPath: string;
}

interface OrgUnitsResponseProps {
  kind: string;
  etag: string;
  organizationUnits: OrgUnitsProps[];
}

interface OrgChartNodeProps {
  name: string;
  orgUnitId: string;
  description: string;
  orgUnitPath: string;
  attributes?: {
    users?: string;
    devices?: string;
    policies?: string;
  };
  children?: OrgChartNodeProps[];
}
