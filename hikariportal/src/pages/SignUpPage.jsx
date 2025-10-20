import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ColorModeSelect from "../components/Login/ColorModeSelect";
import { register } from '../api/auth';
import { AppThemeProvider } from '../components/Login/AppThemeProvider'; 

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(240, 100.00%, 99.60%, 0.05) 0px 5px 15px 0px, hsl(0, 0.00%, 100.00%) 0px 15px 35px -5px',
  borderRadius: '16px', 
  color: theme.palette.text.primary,
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.1) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.1) 0px 15px 35px -5px',
    backgroundColor: 'hsla(220, 25%, 10%, 0.1)', 
  }),
}));

const SignUpContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  background: theme.palette.mode === 'dark'
    ? 'radial-gradient(circle at center, hsla(220, 25%, 10%, 0.1))'
    : '#f0f0f0', 
}));

export default function SignUpPage(props) {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateInputs()) {
      const data = new FormData(event.currentTarget);
      const credentials = {
        username: data.get('usuario'),
        password: data.get('password'),
        role: 2, 
      };
      try {
        const response = await register(credentials);
        console.log('Registration successful:', response.data);
        navigate('/'); 
      } catch (error) {
        console.error('Registration failed:', error);
      }
    }
  };

  const validateInputs = () => {
    const usuario = document.getElementById('usuario');
    const password = document.getElementById('password');

    let isValid = true;

    if (!usuario.value) {
      setEmailError(true);
      setEmailErrorMessage('Por favor, ingrese un usuario válido.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <AppThemeProvider {...props}>
      <CssBaseline enableColorScheme />
      <SignUpContainer>
        <Card>
          <Typography variant="h1" color="primary">
            Regístrate
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="usuario">Usuario</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="usuario"
                type="text"
                name="usuario"
                placeholder="Usuario"
                autoComplete="username"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Contraseña</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Regístrate
            </Button>
          </Box>
          <ColorModeSelect sx={{ alignSelf: 'flex-end', marginTop: 2 }} />
        </Card>
      </SignUpContainer>
    </AppThemeProvider>
  );
}