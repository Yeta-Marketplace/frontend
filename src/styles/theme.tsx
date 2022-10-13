// https://bareynol.github.io/mui-theme-creator/
// https://material.io/inline-tools/color/

import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    fab: {
      position: string;
      bottom: string;
      right: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    fab?: {
      position?: string;
      bottom?: string;
      right?: string;
    };
  }
}


const theme = createTheme({
  palette: {
    primary: {
      main: '#24272E',
    },
    secondary: {
      main: '#f66200',
    },
    error: {
      main: '#ff1d15',
    },
  },
});

theme.fab = {
  position: 'fixed',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  [theme.breakpoints.up('lg')]: {
    top: theme.spacing(15),
    right: theme.spacing(10),
  },
};

export default theme;