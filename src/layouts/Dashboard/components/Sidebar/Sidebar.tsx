import React from 'react';
import Drawer from '@mui/material/Drawer';
import { SidebarNav } from './components';

interface Props {
  onClose: () => void;
  open: boolean;
  variant: 'permanent' | 'persistent' | 'temporary' | undefined;
  handleOpenAuthDialog: () => void;
}

const Sidebar = ({
  open,
  variant,
  onClose,
  handleOpenAuthDialog,
}: Props): JSX.Element => {
  return (
    <Drawer
      anchor="left"
      onClose={() => onClose()}
      open={open}
      variant={variant}
      sx={{
        '& .MuiPaper-root': {
          width: '100%',
          maxWidth: 256,
          top: { xs: 0, md: 71 },
          height: { xs: '100%', md: 'calc(100% - 71px)' },
          background: '#f7faff',
        },
      }}
    >
      <SidebarNav handleOpenAuthDialog={handleOpenAuthDialog} />
    </Drawer>
  );
};

export default Sidebar;
