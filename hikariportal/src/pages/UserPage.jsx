import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Modal,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getUsers, updateUser, deleteUser } from '../api/users';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(4),
  width: '100%',
  maxWidth: '1200px',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: theme.shadows[3],
}));

const StyledModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%', 
  maxWidth: '500px',
  bgcolor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
  maxHeight: '80vh', 
  overflowY: 'auto', 
}));

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: null, username: '', password: '', role: '' });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleOpenModal = (user = null) => {
    if (user) {
      setCurrentUser({
        id: user.id,
        username: user.username,
        password: '',
        role: user.role === 1 ? 'admin' : 'user',
      });
      setEditMode(true);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentUser({ id: null, username: '', password: '', role: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleSaveUser = async () => {
    try {
      if (editMode) {
        const updatedUser = { ...currentUser, role: currentUser.role === 'admin' ? 1 : 2 };
        if (!updatedUser.password) {
          delete updatedUser.password; 
        }
        await updateUser(currentUser.id, updatedUser);
      }
      const response = await getUsers();
      setUsers(response.data);
      handleCloseModal();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Usuarios</Typography>

      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Nombre de Usuario</TableCell>
              <TableCell align="center">Rol</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell align="center">{user.id}</TableCell>
                <TableCell align="center">{user.username}</TableCell>
                <TableCell align="center">{user.role === 1 ? 'admin' : 'user'}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleOpenModal(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteUser(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      <Modal open={openModal} onClose={handleCloseModal}>
        <StyledModalBox>
          <Typography variant="h6">{editMode ? 'Editar Usuario' : 'Ver Usuario'}</Typography>
          <TextField
            label="Nombre de Usuario"
            name="username"
            fullWidth
            value={currentUser.username}
            onChange={handleInputChange}
            margin="normal"
            disabled={!editMode}
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            fullWidth
            value={currentUser.password}
            onChange={handleInputChange}
            margin="normal"
            disabled={!editMode}
            placeholder={editMode ? 'Dejar en blanco para mantener la contraseña actual' : ''}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Rol</InputLabel>
            <Select
              name="role"
              value={currentUser.role}
              onChange={handleInputChange}
              disabled={!editMode}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
          </FormControl>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={handleCloseModal} style={{ marginRight: 8 }}>
              Cerrar
            </Button>
            {editMode && (
              <Button onClick={handleSaveUser} variant="contained" color="primary">
                Guardar
              </Button>
            )}
          </Box>
        </StyledModalBox>
      </Modal>
    </Box>
  );
}