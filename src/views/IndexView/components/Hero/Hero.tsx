import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

const Hero = (): JSX.Element => {
  return (
    <Box
      id="hero"
      sx={{
        width: '100%',
        backgroundImage: 'linear-gradient(180deg, #CEE5FD, #FFF)',
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 6 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
        >
          <Typography
            component="h5"
            variant="h5"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >
            Welcome to&nbsp;
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: 'primary.main',
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >
            Pluto Policy Manager
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            color="text.secondary"
          >
            A tool that can elevate your experience with ChromeOS policies.
            <br />
            It can simplify the way how Chromebook administrators can manage
            their policies.
          </Typography>
          <Stack
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <Button
              variant="contained"
              color="primary"
              component="a"
              href="/dashboard"
            >
              Start now
            </Button>
          </Stack>
          <Typography
            variant="caption"
            textAlign="center"
            sx={{ opacity: 0.8 }}
          >
            By clicking &quot;Start now&quot; you agree to our&nbsp;
            <Link
              href="#"
              color="primary"
            >
              Terms & Conditions
            </Link>
            .
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Hero;
