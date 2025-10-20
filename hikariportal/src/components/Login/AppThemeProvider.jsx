import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CssBaseline, Box } from '@mui/material';
import { ColorModeContext } from './ColorModeContext';

export function AppThemeProvider({ children }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState(prefersDarkMode ? 'dark' : 'light');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#1976d2',
          },
        },
        typography: {
          fontFamily: 'Roboto, sans-serif',
          h1: { fontSize: '2.5rem', fontWeight: 700 },
          h2: { fontSize: '2rem', fontWeight: 700 },
          body1: { fontSize: '1rem', fontWeight: 400 },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                background: mode === 'dark'
                  ? 'radial-gradient(circle at center, rgba(18, 24, 38, 0.8) 0%, rgba(11, 15, 26, 1) 40%, rgba(0, 0, 0, 1) 100%)'
                  : '#ffffff',
                color: mode === 'dark' ? '#e0e0e0' : '#000000',
                minHeight: '100vh',
                margin: 0,
                padding: 0,
                overflowX: 'hidden',
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            background: mode === 'dark'
              ? 'radial-gradient(circle at center, rgba(18, 24, 38, 0.8) 0%, rgba(11, 15, 26, 1) 40%, rgba(0, 0, 0, 1) 100%)'
              : '#ffffff',
            minHeight: '100vh',
          }}
        >
          {children}
        </Box>

      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}