import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#512da8',
      contrastText: '#b2ff59',
    },
    secondary: {
      main: '#ab47bc',
    },
    divider: '#c5e1a5',
  },
});

export default theme;