import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { GoogleIcon } from '@/assets/svg-icons/GoogleIcon';
import { GithubIcon } from '@/assets/svg-icons/GithubIcon';
import { DashboardIcon } from '@/assets/svg-icons/DashboardIcon';
import { ShareIcon } from '@/assets/svg-icons/ShareIcon';
import { SettingsIcon } from '@/assets/svg-icons/SettingsIcon';
import { useAuth } from '@/hooks/use-auth';
import Chip from '@mui/material/Chip';
import Link from 'next/link';

const sideBarItems = [
  {
    title: 'Home',
    href: '/dashboard',
    icon: <DashboardIcon />,
    target: '',
  },
  {
    title: 'Contribute',
    href: 'https://github.com/Pluto-Open-Source-Team/pluto-app-v2',
    icon: <GithubIcon />,
    target: '_blank',
  },
  {
    title: 'Share',
    href: '/',
    icon: <ShareIcon />,
    target: '',
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: <SettingsIcon />,
    target: '',
  },
];

interface Props {
  handleOpenAuthDialog: () => void;
}

const SidebarNav = ({ handleOpenAuthDialog }: Props): JSX.Element => {
  const auth = useAuth();

  return (
    <Box padding={2}>
      {sideBarItems.map((item, i) => (
        <Box
          key={i}
          marginBottom={2}
        >
          <Button
            component={Link}
            href={item.href}
            target={item.target}
            fullWidth
            sx={{
              justifyContent: 'flex-start',
              color: 'text.primary',
            }}
            startIcon={item.icon || null}
          >
            {item.title}
          </Button>
        </Box>
      ))}
      {auth && auth.isAuthenticated ? (
        <Chip
          variant="outlined"
          color="success"
          icon={<GoogleIcon />}
          label={auth.user.email}
          sx={{
            display: { xs: 'flex', md: 'none' },
            paddingLeft: 1,
          }}
        />
      ) : (
        <Button
          variant="outlined"
          fullWidth
          sx={{ display: { xs: 'flex', md: 'none' } }}
          startIcon={<GoogleIcon />}
          onClick={handleOpenAuthDialog}
        >
          Sign in with Google
        </Button>
      )}
    </Box>
  );
};

export default SidebarNav;
