function findRootNode(data: OrgUnitsProps[]): OrgUnitsProps | undefined {
  return data.find((orgUnit) => orgUnit.orgUnitPath === '/');
}

function formatOrgChartNode(orgUnit: OrgUnitsProps): OrgChartNodeProps {
  return {
    name: orgUnit.name,
    orgUnitId: orgUnit.orgUnitId,
    description: orgUnit.description,
    orgUnitPath: orgUnit.orgUnitPath,
    attributes: {
      users: '--',
      devices: '--',
      policies: '--',
    },
  };
}

function buildOrgChartTree(
  data: OrgUnitsProps[],
  parentId: string,
): OrgChartNodeProps[] {
  const children = data.filter(
    (orgUnit) => orgUnit.parentOrgUnitId === parentId,
  );

  if (children.length === 0) return [];

  return children.map((orgUnit) => {
    const node = formatOrgChartNode(orgUnit);
    node.children = buildOrgChartTree(data, orgUnit.orgUnitId);
    return node;
  });
}

export const makeOrgUnitsTreeData = (
  data: OrgUnitsProps[],
): OrgChartNodeProps => {
  const rootNode = findRootNode(data);

  if (rootNode) {
    return {
      name: rootNode.name,
      orgUnitId: rootNode.orgUnitId,
      description: rootNode.description,
      orgUnitPath: rootNode.orgUnitPath,
      attributes: {
        users: '--',
        devices: '--',
        policies: '--',
      },
      children: buildOrgChartTree(data, rootNode.orgUnitId),
    };
  } else {
    return { description: '', orgUnitPath: '', name: '', orgUnitId: '' };
  }
};
