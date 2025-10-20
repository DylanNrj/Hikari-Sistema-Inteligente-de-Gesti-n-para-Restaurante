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
  Container,
  Modal,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/products';
import { getCategories } from '../api/categories';

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

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ id: null, name: '', description: '', price: '', categoryId: '', imageUrl: '', isActive: true });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleOpenModal = (product = null) => {
    if (product) {
      setCurrentProduct({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.categoryId,
        imageUrl: product.imageUrl || '',
        isActive: product.isActive,
      });
      setEditMode(true);
    } else {
      setCurrentProduct({ id: null, name: '', description: '', price: '', categoryId: '', imageUrl: '', isActive: true });
      setEditMode(false);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentProduct({ id: null, name: '', description: '', price: '', categoryId: '', imageUrl: '', isActive: true });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const handleSaveProduct = async () => {
    try {
      const productData = {
        ...currentProduct,
        price: parseFloat(currentProduct.price),
        isActive: currentProduct.isActive ? true : false,
      };

      if (editMode) {
        await updateProduct(currentProduct.id, productData);
      } else {
        await createProduct(productData);
      }
      const response = await getProducts();
      setProducts(response.data);
      handleCloseModal();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Productos</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
          Nuevo Producto
        </Button>
      </Box>

      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Imagen</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    src={product.imageUrl || 'https://via.placeholder.com/100'}
                    alt={product.name}
                    style={{
                      width: '40px',
                      height: '40px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                    }}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{product.name}</TableCell>
                <TableCell sx={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <Tooltip title={product.description || ''} arrow>
                    <span>{product.description}</span>
                  </Tooltip>
                </TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>
                  {categories.find((category) => category.id === product.categoryId)?.name || 'Sin categoría'}
                </TableCell>
                <TableCell>
                  {product.isActive ? (
                    <CheckCircleIcon style={{ color: 'green' }} />
                  ) : (
                    <CancelIcon style={{ color: 'red' }} />
                  )}
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <IconButton color="primary" onClick={() => handleOpenModal(product)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteProduct(product.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      <Modal open={openModal} onClose={handleCloseModal}>
        <StyledModalBox>
          <Typography variant="h6">{editMode ? 'Editar Producto' : 'Nuevo Producto'}</Typography>
          <TextField
            label="Nombre"
            name="name"
            fullWidth
            value={currentProduct.name}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Descripción"
            name="description"
            fullWidth
            value={currentProduct.description}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Precio"
            name="price"
            fullWidth
            type="number"
            value={currentProduct.price}
            onChange={handleInputChange}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Categoría</InputLabel>
            <Select
              name="categoryId"
              value={currentProduct.categoryId}
              onChange={handleInputChange}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="URL de la Imagen"
            name="imageUrl"
            fullWidth
            value={currentProduct.imageUrl}
            onChange={handleInputChange}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Estado</InputLabel>
            <Select
              name="isActive"
              value={currentProduct.isActive ? 1 : 0}
              onChange={(e) => handleInputChange({ target: { name: 'isActive', value: e.target.value === 1 } })}
            >
              <MenuItem value={1}>Activo</MenuItem>
              <MenuItem value={0}>Inactivo</MenuItem>
            </Select>
          </FormControl>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={handleCloseModal} style={{ marginRight: 8 }}>
              Cancelar
            </Button>
            <Button onClick={handleSaveProduct} variant="contained" color="primary">
              {editMode ? 'Actualizar' : 'Crear'}
            </Button>
          </Box>
        </StyledModalBox>
      </Modal>
    </Container>
  );
}