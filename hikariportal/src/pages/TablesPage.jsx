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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { getTables, createTable, updateTable, deleteTable } from '../api/tables';
import ColorModeSelect from '../components/Login/ColorModeSelect';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flexGrow: 1,
  padding: theme.spacing(2),
  boxSizing: 'border-box',
  background: theme.palette.mode === 'dark'
    ? 'radial-gradient(circle at center, hsla(220, 25%, 10%, 0.1))'
    : '#ffffff',
  margin: '0 auto',
  maxWidth: '90%',
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
}));

const CenteredTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: '20%',
  width: '100%',
  maxWidth: '1200px',
  alignSelf: 'center',
}));

const Mesas = () => {
  const [tables, setTables] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [newTable, setNewTable] = useState({ id: 0, number: '', capacity: '', status: 'available' });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [tableToDelete, setTableToDelete] = useState(null);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await getTables();
      const tablesData = response.data.map(table => ({
        ...table,
        status: convertStatusToSpanish(table.status),
      }));
      setTables(tablesData);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  const convertStatusToSpanish = (status) => {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'occupied':
        return 'Ocupada';
      case 'reserved':
        return 'Reservada';
      default:
        return status;
    }
  };

  const convertStatusToEnglish = (status) => {
    switch (status) {
      case 'Disponible':
        return 'available';
      case 'Ocupada':
        return 'occupied';
      case 'Reservada':
        return 'reserved';
      default:
        return status;
    }
  };

  const handleOpenDialog = (table = null) => {
    if (table) {
      setEditMode(true);
      setSelectedTable(table);
      setNewTable({ id: table.id, number: table.number, capacity: table.capacity, status: convertStatusToSpanish(table.status) });
    } else {
      setEditMode(false);
      setNewTable({ id: 0, number: '', capacity: '', status: 'Disponible' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTable(null);
  };

  const handleInputChange = (e) => {
    setNewTable({ ...newTable, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tableData = {
        ...newTable,
        status: convertStatusToEnglish(newTable.status),
      };
      if (editMode) {
        await updateTable(selectedTable.id, tableData);
      } else {
        await createTable(tableData);
      }
      fetchTables();
      handleCloseDialog();
    } catch (error) {
      console.error('Error creating/updating table:', error.response.data);
    }
  };

  const handleOpenDeleteDialog = (table) => {
    setTableToDelete(table);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setTableToDelete(null);
  };

  const handleDelete = async () => {
    try {
      await deleteTable(tableToDelete.id);
      fetchTables();
      handleCloseDeleteDialog();
    } catch (error) {
      console.error('Error deleting table:', error);
    }
  };

  return (
    <Container>
      <HeaderContainer>
        <Typography component="h1" variant="h4">
          Mesas del Restaurante
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            size="small"
            sx={{ mr: 1 }}
          >
            Agregar
          </Button>
          <ColorModeSelect />
        </Box>
      </HeaderContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editMode ? 'Editar Mesa' : 'Agregar Nueva Mesa'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="number"
            label="Número de Mesa"
            type="number"
            fullWidth
            variant="outlined"
            value={newTable.number}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="capacity"
            label="Capacidad"
            type="number"
            fullWidth
            variant="outlined"
            value={newTable.capacity}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="status-label">Estado</InputLabel>
            <Select
              labelId="status-label"
              name="status"
              value={newTable.status}
              onChange={handleInputChange}
              label="Estado"
            >
              <MenuItem value="Disponible">Disponible</MenuItem>
              <MenuItem value="Ocupada">Ocupada</MenuItem>
              <MenuItem value="Reservada">Reservada</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editMode ? 'Actualizar' : 'Agregar'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que quieres eliminar esta mesa?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <CenteredTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Número de Mesa</TableCell>
              <TableCell align="center">Capacidad</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tables.map((table) => (
              <TableRow key={table.id}>
                <TableCell align="center">{table.number}</TableCell>
                <TableCell align="center">{table.capacity}</TableCell>
                <TableCell align="center">
                  {convertStatusToSpanish(table.status)}
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleOpenDialog(table)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleOpenDeleteDialog(table)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CenteredTableContainer>
    </Container>
  );
};

export default Mesas;