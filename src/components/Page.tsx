import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import createTheme from '@/theme';

interface Props {
  children: React.ReactNode;
}

export default function Page({ children }: Props): JSX.Element {
  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <Paper elevation={0}>{children}</Paper>
    </ThemeProvider>
  );
}
