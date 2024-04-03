import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import Footer from '@/layouts/Landing/components/Footer';
import Topbar from '@/layouts/Landing/components/Topbar';

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
