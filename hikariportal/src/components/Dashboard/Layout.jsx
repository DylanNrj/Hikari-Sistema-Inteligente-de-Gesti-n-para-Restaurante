import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Drawer, List, ListItem, ListItemIcon,
  ListItemText, Divider, IconButton, AppBar, Toolbar, useMediaQuery,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import PeopleIcon from '@mui/icons-material/People';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const drawerWidth = 240;

const MainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '100vh', 
  background: theme.palette.mode === 'dark' ? '#121826' : '#ffffff',
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    background: theme.palette.mode === 'dark' ? '#121826' : '#f5f5f5',
    color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#000',
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? '#121826' : '#f5f5f5',
  color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#000',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    minHeight: '10px',
  },
}));

export default function Layout() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  const menuItems = [
    { text: 'Pedidos', icon: <HomeIcon />, path: '/dashboard' },
    { text: 'Historial de pagos', icon: <HistoryIcon />, path: '/payments' },
    { text: 'Categorías', icon: <CategoryIcon />, path: '/categories' },
    { text: 'Productos', icon: <ShoppingCartIcon />, path: '/products' },
    { text: 'Mesas', icon: <TableRestaurantIcon />, path: '/tables' },
    { text: 'Usuarios', icon: <PeopleIcon />, path: '/users' }, 
  ];

  const drawerContent = (
    <>
      <Typography variant="h6" sx={{ m: 2, fontWeight: 'bold' }}>
        Gestor de Restaurante
      </Typography>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} onClick={() => navigate(item.path)}>
            <ListItemIcon sx={{ color: '#1976d2' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListItem button onClick={handleLogout}>
        <ListItemIcon sx={{ color: '#d32f2f' }}>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Cerrar sesión" />
      </ListItem>
    </>
  );

  return (
    <MainContainer>
      <StyledAppBar position="fixed" sx={{ ml: { sm: `${drawerWidth}px` }, display: { sm: 'none' } }}>
        <StyledToolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Gestor de Restaurante
          </Typography>
        </StyledToolbar>
      </StyledAppBar>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        {isMobile ? (
          <StyledDrawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }}>
            {drawerContent}
          </StyledDrawer>
        ) : (
          <StyledDrawer variant="permanent" open>
            {drawerContent}
          </StyledDrawer>
        )}
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, height: '100vh', overflow: 'auto' }}>
        <StyledToolbar /> {}
        <Outlet />
      </Box>
    </MainContainer>
  );
}