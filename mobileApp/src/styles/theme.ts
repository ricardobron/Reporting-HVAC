import { extendTheme } from 'native-base';

export const THEME = extendTheme({
  colors: {
    primary: {
      700: '#F4F5F6',
      600: '#1B1B1F',
    },
    secondary: {
      700: '#FFFFFF',
      600: '#47474D',
    },
    green: {
      500: '#03B252',
    },
    red: {
      500: '#DC1637',
    },
    gray: {
      700: '#29292E',
      600: '#7A7A80',
      500: '#AEAEB3',
      300: '#FDEDEF',
      200: '#EBEBF0',
      100: '#E1E1E6',
    },
  },
  fonts: {
    heading: 'Roboto_700Bold',
    body: 'Roboto_400Regular',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
  },
  sizes: {
    14: 56,
  },
});
