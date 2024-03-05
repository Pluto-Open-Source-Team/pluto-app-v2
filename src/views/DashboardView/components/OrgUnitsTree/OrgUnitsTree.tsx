import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const DynamicTree = dynamic(() => import('react-d3-tree'), { ssr: false });

interface OrgUnitsTreeProps {
  data: any;
}

const OrgUnitsTree = ({ data }: OrgUnitsTreeProps): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState<number>(0);

  useEffect(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      const newTranslateY = containerHeight / 2;
      setTranslateY(newTranslateY);
    }
  }, []);

  const PureSvgNodeElement = ({ nodeDatum, toggleNode, onNodeClick }) => (
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
              ([labelKey, labelValue], i) => (
                <tspan
                  key={`${labelKey}-${i}`}
                  x={0}
                  dy="1.2em"
                >
                  {labelKey}: {labelValue as string}
                </tspan>
              ),
            )}
        </text>
      </g>
    </React.Fragment>
  );

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%' }}
    >
      <DynamicTree
        data={data}
        translate={{ x: 100, y: translateY }}
        depthFactor={300}
        renderCustomNodeElement={(rd3tProps) => (
          <PureSvgNodeElement
            nodeDatum={rd3tProps.nodeDatum}
            toggleNode={rd3tProps.toggleNode}
            onNodeClick={() => {
              console.log(rd3tProps.nodeDatum);
            }}
          />
        )}
      />
    </div>
  );
};

export default OrgUnitsTree;
