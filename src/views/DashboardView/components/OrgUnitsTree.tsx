import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { FC } from 'react';
import dynamic from 'next/dynamic';
import TreeNodeSvgElement from '@/views/DashboardView/components/TreeNodeSvgElement';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Tooltip from '@mui/material/Tooltip';

const DynamicTree = dynamic(() => import('react-d3-tree'), { ssr: false });

interface TreeParams {
  treeKey: number;
  toggleTree: boolean | undefined;
  initialDepth: number | undefined;
  translate: {
    x: number;
    y: number;
  };
}

interface OrgUnitsTreeProps {
  data: any;
  openOUDetailsDrawer: (ouDetails: any) => any;
}

const OrgUnitsTree: FC<OrgUnitsTreeProps> = (props) => {
  const { data, openOUDetailsDrawer } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState<number>(0);

  const [treeParams, setTreeParams] = useState<TreeParams>({
    treeKey: 1,
    toggleTree: undefined,
    initialDepth: 1,
    translate: {
      x: 100,
      y: translateY,
    },
  });

  const handleTreeTranslate = useCallback(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      const newTranslateY = containerHeight / 2;
      setTranslateY(newTranslateY);
      setTreeParams((_preValues) => ({
        ..._preValues,
        translate: {
          x: 100,
          y: newTranslateY,
        },
      }));
    }
  }, [containerRef]);

  const handleRefreshTree = () => {
    setTreeParams((_preValues) => ({
      ..._preValues,
      treeKey: _preValues.treeKey + 1,
    }));
  };

  const handleToggleTree = (isCollapsed: boolean | undefined) => {
    setTreeParams((_preValues) => ({
      ..._preValues,
      initialDepth: undefined,
      toggleTree: !isCollapsed,
    }));
    handleRefreshTree();
  };

  const handleResetDiagram = () => {
    setTreeParams((_preValues) => ({
      ..._preValues,
      toggleTree: undefined,
      initialDepth: 1,
    }));
    handleRefreshTree();
  };

  useEffect(() => {
    handleTreeTranslate();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <DynamicTree
        key={treeParams.treeKey}
        data={data}
        translate={treeParams.translate}
        depthFactor={300}
        initialDepth={treeParams.initialDepth}
        renderCustomNodeElement={(rd3tProps) => {
          if (treeParams.toggleTree != undefined) {
            rd3tProps.nodeDatum.__rd3t.collapsed = treeParams.toggleTree;
          }

          return (
            <TreeNodeSvgElement
              nodeDatum={rd3tProps.nodeDatum}
              toggleNode={rd3tProps.toggleNode}
              onNodeClick={() => openOUDetailsDrawer(rd3tProps.nodeDatum)}
            />
          );
        }}
      />
      <Tooltip
        placement="left-start"
        title={treeParams.toggleTree ? 'Expand all' : 'Collapse all'}
      >
        <Fab
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
          color="primary"
          aria-label="toggle"
          onClick={() => handleToggleTree(treeParams.toggleTree)}
          size="small"
        >
          {treeParams.toggleTree ? <AddIcon /> : <RemoveIcon />}
        </Fab>
      </Tooltip>
      <Tooltip
        placement="left-start"
        title="Reset diagram"
      >
        <Fab
          sx={{
            position: 'absolute',
            bottom: 64,
            right: 16,
            zIndex: 1000,
          }}
          color="primary"
          aria-label="toggle"
          onClick={handleResetDiagram}
          size="small"
        >
          <RestartAltIcon />
        </Fab>
      </Tooltip>
    </div>
  );
};

export default OrgUnitsTree;
