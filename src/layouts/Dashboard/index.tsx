import React, { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';

import AuthDialog from '@/layouts/Dashboard/components/AuthDialog';
import Topbar from '@/layouts/Dashboard/components/Topbar';
import Sidebar from '@/layouts/Dashboard/components/Sidebar';

interface Props {
  children: React.ReactNode;
}

const Dashboard = ({ children }: Props): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [openAuthDialog, setOpenAuthDialog] = useState<boolean>(false);

  const handleSidebarOpen = (): void => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = (): void => {
    setOpenSidebar(false);
  };

  const handleOpenAuthDialog = useCallback((): void => {
    setOpenAuthDialog(true);
  }, []);

  const handleCloseAuthDialog = useCallback((): void => {
    setOpenAuthDialog(false);
  }, []);

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
          <Topbar
            onSidebarOpen={handleSidebarOpen}
            handleOpenAuthDialog={handleOpenAuthDialog}
          />
        </Box>
      </AppBar>
      <Sidebar
        onClose={handleSidebarClose}
        open={open}
        variant={isMd ? 'permanent' : 'temporary'}
        handleOpenAuthDialog={handleOpenAuthDialog}
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
      {openAuthDialog && (
        <AuthDialog
          onClose={handleCloseAuthDialog}
          open={openAuthDialog}
        />
      )}
    </Box>
  );
};

export default Dashboard;
