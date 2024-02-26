import type { Theme } from '@mui/material';
import {
  createTheme as createMuiTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import { createOptions as createBaseOptions } from './base/create-options';

const createTheme = (): Theme => {
  return responsiveFontSizes(createMuiTheme(createBaseOptions()));
};

export default createTheme;
