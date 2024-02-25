import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import Main from '@/layouts/Landing';
import Hero from '@/views/IndexView/components/Hero';
import Namespaces from '@/views/IndexView/components/Namespaces';
import FAQ from '@/views/IndexView/components/FAQ';

const IndexView = (): JSX.Element => {
  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <Main>
        <Hero />
        <Divider />
        <Namespaces />
        <Divider />
        <FAQ />
      </Main>
    </Box>
  );
};

export default IndexView;
