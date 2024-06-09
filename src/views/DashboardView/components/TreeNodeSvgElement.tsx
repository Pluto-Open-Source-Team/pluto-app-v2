import React from 'react';
import type { FC } from 'react';
import { useStore } from '@/hooks/use-store';

interface OrgUnitsTreeProps {
  nodeDatum: any;
  toggleNode: any;
  onNodeClick: any;
}

const TreeNodeSvgElement: FC<OrgUnitsTreeProps> = (props) => {
  const { nodeDatum, toggleNode, onNodeClick } = props;

  const { useLivePoliciesCountByOrgUnitId, useLiveDevicesCountByOrgUnitId } =
    useStore();

  const liveStoredPoliciesCount =
    useLivePoliciesCountByOrgUnitId(nodeDatum.orgUnitId) || '--';

  const liveStoredDevicesCount =
    useLiveDevicesCountByOrgUnitId(nodeDatum.orgUnitId) || '--';

  return (
    <React.Fragment>
      <circle
        r={10}
        onClick={toggleNode}
      />
      <g
        className="rd3t-label"
        onClick={onNodeClick}
      >
        <text
          className="rd3t-label__title"
          textAnchor="start"
          y={40}
        >
          {nodeDatum.name}
        </text>
        <text
          className="rd3t-label__attributes"
          x={0}
          y={40}
        >
          {nodeDatum.attributes &&
            Object.entries(nodeDatum.attributes).map(
              ([labelKey, labelValue], i) => {
                if (labelKey === 'policies') {
                  labelValue = liveStoredPoliciesCount;
                }

                if (labelKey === 'devices') {
                  labelValue = liveStoredDevicesCount;
                }
                return (
                  <tspan
                    key={`${labelKey}-${i}`}
                    x={0}
                    dy="1.2em"
                  >
                    {labelKey}: {labelValue as string}
                  </tspan>
                );
              },
            )}
        </text>
      </g>
    </React.Fragment>
  );
};

export default TreeNodeSvgElement;
