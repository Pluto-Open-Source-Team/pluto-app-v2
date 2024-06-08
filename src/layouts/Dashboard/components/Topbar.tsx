import React, { useState } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { useAuth } from '@/hooks/use-auth';
import { GoogleIcon } from '@/assets/svg-icons/GoogleIcon';
import Link from 'next/link';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import useCacheSettings from '@/hooks/use-cache-settings';
import { useStore } from '@/hooks/use-store';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

interface Props {
  onSidebarOpen: () => void;
  handleOpenAuthDialog: () => void;
}

const Topbar = ({
  onSidebarOpen,
  handleOpenAuthDialog,
}: Props): JSX.Element => {
  const auth = useAuth();
  const [cacheSettings] = useCacheSettings();

  const { deleteAllRecords } = useStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openEmailMenu = Boolean(anchorEl);

  const handleClickEmailMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseEmailMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutUser = async () => {
    setAnchorEl(null);

    if (cacheSettings.clearDataOnSignOut) {
      await deleteAllRecords();
    }

    await auth.logout();
  };

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
        component={Link}
        href="/"
        sx={{
          textDecoration: 'none',
        }}
      >
        <Box
          component="img"
          sx={{ height: 40 }}
          alt="Pluto Logo"
          src="/assets/images/pluto-logo.png"
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
            <Tooltip title="Account information">
              <IconButton
                onClick={handleClickEmailMenu}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={openEmailMenu ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openEmailMenu ? 'true' : undefined}
              >
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                >
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                    src={auth.user.picture}
                  />
                </StyledBadge>
              </IconButton>
            </Tooltip>
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

      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={openEmailMenu}
        onClose={handleCloseEmailMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem disabled>
          <Typography
            variant="subtitle2"
            noWrap
          >
            {auth?.user?.name}
          </Typography>
        </MenuItem>
        <MenuItem disabled>
          <Typography
            variant="subtitle2"
            noWrap
          >
            {auth?.user?.email}
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogoutUser}>Sign Out</MenuItem>
      </Menu>
    </Box>
  );
};

export default Topbar;
