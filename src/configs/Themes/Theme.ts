import { createTheme } from "@mui/material";

const CustomTheme = createTheme({

  palette: {
    mode: 'dark',
    primary: {
      main: '#0B1132',
    },
    // secondary: {
    //   main: '#040720',
    // },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1400,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: [
      'Poppins',
      'Orbitron'
    ].join(','),
  }
});

export default CustomTheme