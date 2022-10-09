// https://bareynol.github.io/mui-theme-creator/
// https://material.io/inline-tools/color/

import { createTheme } from '@mui/material/styles';


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

export default theme;