import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Modal, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { useParams } from 'react-router-dom'; 
import { getOrderById, updateOrder } from '../api/order'; 
import { getProducts } from '../api/products'; 
import { styled } from '@mui/system'; 

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(2),
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: 600,
  marginTop: theme.spacing(2),
}));

export default function Orders() {
  const { tableId } = useParams(); 
  const [order, setOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [products, setProducts] = useState([]); 
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrderById(tableId); 
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchOrder();
    fetchProducts();
  }, [tableId]); 
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleAddProduct = async () => {
    if (!selectedProduct) {
      alert('Por favor selecciona un producto.');
      return;
    }

    if (!order || !order.id) {
      alert('La orden no está disponible. Intenta nuevamente.');
      return;
    }

    try {
      const product = products.find(p => p.id === selectedProduct);
      if (!product) {
        alert('Producto no encontrado');
        return;
      }

      const updatedOrder = {
        tableId: order.tableId,
        userId: order.userId,
        status: order.status,
        updatedAt: new Date().toISOString(),
        products: [
          ...(order.products || []),
          { name: product.name, quantity, price: product.price, image: product.image },
        ],
      };

      const response = await updateOrder(order.id, updatedOrder); 
      setOrder(response.data); 
      setSelectedProduct(''); 
      setQuantity(1);
      handleCloseModal(); 
    } catch (error) {
      console.error('Error adding product to order:', error);
      alert('Hubo un problema al añadir el producto a la orden.');
    }
  };

  const handleGenerateBill = async () => {
    try {
      const total = (order.products || []).reduce(
        (sum, product) => sum + product.quantity * product.price, 
        0
      );
      const updatedOrder = {
        ...order,
        status: 'completed', 
        total,
      };
      const response = await updateOrder(order.id, updatedOrder); 
      setOrder(response.data); 
      alert(`Cuenta generada: $${total}`); 
    } catch (error) {
      console.error('Error generating bill:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Mesa #{tableId}
      </Typography>

      <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Imagen</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Precio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(order?.products || []).map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  <img src={product.image} alt={product.name} width={50} height={50} />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>${product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ButtonContainer>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Añadir al Pedido
        </Button>
        <Button variant="contained" color="secondary" onClick={handleGenerateBill}>
          Generar Cuenta
        </Button>
      </ButtonContainer>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Añadir Producto
          </Typography>

          <FormControl fullWidth margin="normal">
            <InputLabel>Producto</InputLabel>
            <Select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              label="Producto"
            >
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name} - ${product.price}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Cantidad"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleAddProduct}
          >
            Añadir
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}
