import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import { Topbar, Footer } from '@/layouts/Landing/components';

interface Props {
  children: React.ReactNode;
}

const Landing = ({ children }: Props): JSX.Element => {
  return (
    <Box>
      <CssBaseline />
      <Topbar />
      <main>{children}</main>
      <Container>
        <Footer />
      </Container>
    </Box>
  );
};

export default Landing;
