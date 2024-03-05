import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Dashboard from '@/layouts/Dashboard';
import OrgUnitsTree from '@/views/DashboardView/components/OrgUnitsTree';
import { useAuth } from '@/hooks/use-auth';

const DashboardView = (): JSX.Element => {
  const auth = useAuth();

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
          display="flex"
          justifyContent="center"
          alignItems="center"
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
          {auth && auth.isAuthenticated ? (
            <div
              id="treeWrapper"
              style={{ width: '100em', height: '50em' }}
            >
              <OrgUnitsTree data={orgChart} />
            </div>
          ) : (
            <Box
              width={1}
              height={1}
              data-aos={'fade-up'}
            >
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                <Typography
                  variant={'h6'}
                  gutterBottom
                  sx={{ fontWeight: 500 }}
                  align={'center'}
                >
                  You are not connected with your Google Admin
                </Typography>
                <Typography
                  align={'center'}
                  color="text.secondary"
                >
                  Login with your Google Admin Account to continue
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Dashboard>
    </Box>
  );
};

export default DashboardView;
