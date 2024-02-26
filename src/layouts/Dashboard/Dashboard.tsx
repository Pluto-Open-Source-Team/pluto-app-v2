import React, { useState } from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';

import { Topbar, Sidebar } from '@/layouts/Dashboard/components';

interface Props {
  children: React.ReactNode;
}

const Dashboard = ({ children }: Props): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = (): void => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = (): void => {
    setOpenSidebar(false);
  };

  const open = isMd ? false : openSidebar;

  return (
    <Box>
      <CssBaseline />
      <AppBar
        position={'fixed'}
        sx={{
          backgroundColor: '#ffffff',
          borderBottom: `1px solid ${alpha('rgba(0, 0, 0, 0.12)', 0.1)}`,
        }}
        elevation={0}
      >
        <Box
          maxWidth={1}
          width={1}
          margin={'0 auto'}
          paddingX={2}
          paddingY={{ xs: 1, sm: 1.5 }}
        >
          <Topbar onSidebarOpen={handleSidebarOpen} />
        </Box>
      </AppBar>
      <Sidebar
        onClose={handleSidebarClose}
        open={open}
        variant={isMd ? 'permanent' : 'temporary'}
      />
      <main>
        <Box height={{ xs: 58, sm: 66, md: 71 }} />
        <Box
          display="flex"
          flex="1 1 auto"
          overflow="hidden"
          paddingLeft={{ md: '256px' }}
        >
          <Box
            display="flex"
            flex="1 1 auto"
            overflow="hidden"
          >
            <Box
              flex="1 1 auto"
              height="100%"
              overflow="auto"
            >
              <Box p={4}>{children}</Box>
            </Box>
          </Box>
        </Box>
      </main>
    </Box>
  );
};

export default Dashboard;
