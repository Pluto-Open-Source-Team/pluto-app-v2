import React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '@/hooks/use-auth';
import { GoogleIcon } from '@/assets/svg-icons/GoogleIcon';

interface Props {
  onSidebarOpen: () => void;
  handleOpenAuthDialog: () => void;
}

const Topbar = ({
  onSidebarOpen,
  handleOpenAuthDialog,
}: Props): JSX.Element => {
  const auth = useAuth();

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        color={'primary.dark'}
        component="a"
        href="/"
        sx={{
          textDecoration: 'none',
        }}
      >
        <Box
          component="img"
          sx={{ height: 40 }}
          alt="Pluto Logo"
          src="/assets/images/pluto.png"
        />
        <Typography
          fontWeight={700}
          marginLeft={1}
          sx={{
            display: { xs: 'none', md: 'flex' },
          }}
        >
          Pluto Policy Manager
        </Typography>
      </Box>
      <Box display={'flex'}>
        <Box marginLeft={{ xs: 2, md: 3 }}>
          {auth && auth.isAuthenticated ? (
            <Chip
              variant="outlined"
              color="success"
              icon={<GoogleIcon />}
              label={auth.user.email}
              sx={{
                display: { xs: 'none', md: 'flex' },
                paddingLeft: 1,
              }}
            />
          ) : (
            <Button
              variant="outlined"
              sx={{ display: { xs: 'none', md: 'flex' } }}
              startIcon={<GoogleIcon />}
              onClick={handleOpenAuthDialog}
            >
              Sign in with Google
            </Button>
          )}
        </Box>
        <Box
          sx={{ display: { xs: 'block', md: 'none' } }}
          marginLeft={2}
        >
          <Button
            onClick={() => onSidebarOpen()}
            aria-label="Menu"
            variant={'outlined'}
            sx={{
              borderRadius: 2,
              minWidth: 'auto',
              padding: 1,
              borderColor: alpha('rgba(0, 0, 0, 0.12)', 0.2),
            }}
          >
            <MenuIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
