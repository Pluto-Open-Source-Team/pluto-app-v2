import React from 'react';
import Box from '@mui/material/Box';

import Dashboard from '@/layouts/Dashboard';
import OrgUnitsTree from '@/views/DashboardView/components/OrgUnitsTree';

const DashboardView = (): JSX.Element => {
  const orgChart = {
    name: 'Test Root',
    children: [
      {
        name: 'Test 001',
        attributes: {
          users: '12',
          devices: '22',
        },
        children: [
          {
            name: 'This is a long name test 002',
            attributes: {
              users: '12',
              devices: '22',
            },
            children: [
              {
                name: 'Child 001',
              },
            ],
          },
          {
            name: 'Test 003',
            attributes: {
              users: '12',
              devices: '22',
            },
            children: [
              {
                name: 'Child 002',
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <Dashboard>
        <Box
          width={1}
          height={1}
          minHeight={800}
          borderRadius={2}
          border={`2px solid rgba(0, 0, 0, 0.12)`}
          sx={{
            borderStyle: 'dashed',
            overflow: 'auto',
          }}
        >
          <div
            id="treeWrapper"
            style={{ width: '100em', height: '50em' }}
          >
            <OrgUnitsTree data={orgChart} />
          </div>
        </Box>
      </Dashboard>
    </Box>
  );
};

export default DashboardView;
