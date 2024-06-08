import React, { useRef, useEffect, useState } from 'react';
import type { FC } from 'react';
import dynamic from 'next/dynamic';
import TreeNodeSvgElement from '@/views/DashboardView/components/TreeNodeSvgElement';

const DynamicTree = dynamic(() => import('react-d3-tree'), { ssr: false });

interface OrgUnitsTreeProps {
  data: any;
  openOUDetailsDrawer: (ouDetails: any) => any;
}

const OrgUnitsTree: FC<OrgUnitsTreeProps> = (props) => {
  const { data, openOUDetailsDrawer } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState<number>(0);

  useEffect(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      const newTranslateY = containerHeight / 2;
      setTranslateY(newTranslateY);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%' }}
    >
      <DynamicTree
        data={data}
        translate={{ x: 100, y: translateY }}
        depthFactor={300}
        initialDepth={1}
        renderCustomNodeElement={(rd3tProps) => (
          <TreeNodeSvgElement
            nodeDatum={rd3tProps.nodeDatum}
            toggleNode={rd3tProps.toggleNode}
            onNodeClick={() => openOUDetailsDrawer(rd3tProps.nodeDatum)}
          />
        )}
      />
    </div>
  );
};

export default OrgUnitsTree;
