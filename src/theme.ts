import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

import { red } from '@mui/material/colors';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const myTheme = {
  palette: {
    primary: {
      main: '#707',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
} as const;

// Create a theme instance.
export const theme = createTheme(myTheme);

/* 
  Declare the theme as const to avoid type errors when using the theme in
  styled components. See https://mui.com/styles/advanced/#typescript-usage
*/

export default theme;
