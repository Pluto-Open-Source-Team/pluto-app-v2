import type { ThemeOptions } from '@mui/material';
import { createTypography } from './create-typography';
import { createComponents } from './create-components';

export const createOptions = (): ThemeOptions => {
  return {
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1440,
      },
    },
    components: createComponents(),
    direction: 'ltr',
    shape: {
      borderRadius: 8,
    },
    typography: createTypography(),
  };
};
