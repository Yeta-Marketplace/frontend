// https://bareynol.github.io/mui-theme-creator/
// https://material.io/inline-tools/color/

import { createTheme } from '@mui/material/styles';


const theme = createTheme({
    palette: {
        primary: {
            main: '#f66200',
        },
        secondary: {
            main: '#0063c3',
            dark: '#0044a4',
        },
        error: {
            main: '#ff1d15',
        },
        background: {
            default: "#24272E",
        }
    },
});

export default theme;