import type { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export const SplashScreen: FC = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </div>
  </div>
);
