import React from 'react';
import Box from '@mui/material/Box';

import Dashboard from '@/layouts/Dashboard';

const DashboardView = (): JSX.Element => {
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
          }}
        />
      </Dashboard>
    </Box>
  );
};

export default DashboardView;
