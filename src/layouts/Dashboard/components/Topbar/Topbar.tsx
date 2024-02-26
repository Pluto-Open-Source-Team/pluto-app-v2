import React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
  onSidebarOpen: () => void;
}

const Topbar = ({ onSidebarOpen }: Props): JSX.Element => {
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
          <Button
            variant="outlined"
            sx={{ display: { xs: 'none', md: 'flex' } }}
            startIcon={
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                height="18px"
                viewBox="0 0 48 48"
                className="abcRioButtonSvg"
              >
                <g>
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  ></path>
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  ></path>
                  <path
                    fill="none"
                    d="M0 0h48v48H0z"
                  ></path>
                </g>
              </svg>
            }
          >
            Sign in with Google
          </Button>
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
