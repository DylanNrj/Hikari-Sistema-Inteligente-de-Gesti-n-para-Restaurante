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
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../api/categories';

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

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ id: null, name: '', description: '', imageUrl: '' });
  const [editMode, setEditMode] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleOpenModal = (category = { id: null, name: '', description: '', imageUrl: '' }) => {
    setCurrentCategory(category);
    setEditMode(!!category.id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentCategory({ id: null, name: '', description: '', imageUrl: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory({ ...currentCategory, [name]: value });
  };

  const handleSaveCategory = async () => {
    try {
      if (editMode) {
        await updateCategory(currentCategory.id, currentCategory);
      } else {
        await createCategory(currentCategory);
      }
      const response = await getCategories();
      setCategories(response.data);
      handleCloseModal();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <Box padding={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Typography variant="h4" sx={{ fontSize: isMobile ? '1.5rem' : '2rem' }}>
          Categorías
        </Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpenModal()} size={isMobile ? 'small' : 'medium'}>
          Nueva Categoría
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ overflowX: 'auto', borderRadius: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Imagen</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <img
                    src={category.imageUrl || 'https://via.placeholder.com/100'}
                    alt={category.name}
                    style={{
                      width: '40px',
                      height: '40px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                    }}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{category.name}</TableCell>
                <TableCell sx={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <Tooltip title={category.description || ''} arrow>
                    <span>{category.description}</span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <IconButton onClick={() => handleOpenModal(category)} color="primary" size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteCategory(category.id)} color="error" size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openModal} onClose={handleCloseModal}>
        <StyledModalBox>
          <Typography variant="h6" marginBottom={2} sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }}>
            {editMode ? 'Editar Categoría' : 'Nueva Categoría'}
          </Typography>
          <TextField
            label="Nombre"
            name="name"
            fullWidth
            value={currentCategory.name}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Descripción"
            name="description"
            fullWidth
            value={currentCategory.description}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="URL de la Imagen"
            name="imageUrl"
            fullWidth
            value={currentCategory.imageUrl}
            onChange={handleInputChange}
            margin="normal"
          />
          <Box marginTop={2} display="flex" justifyContent="flex-end">
            <Button onClick={handleCloseModal} style={{ marginRight: 8 }}>
              Cancelar
            </Button>
            <Button onClick={handleSaveCategory} variant="contained" color="primary">
              {editMode ? 'Actualizar' : 'Crear'}
            </Button>
          </Box>
        </StyledModalBox>
      </Modal>
    </Box>
  );
}