import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Modal } from '@mui/material';
import { styled } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { getPayments } from '../api/payments';
import ColorModeSelect from '../components/Login/ColorModeSelect'; 

const CenteredTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: '20%',
  width: '100%',
  maxWidth: '1200px',
  alignSelf: 'center',
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
}));

const tipoPagoIcon = (tipo) => {
  if (tipo.toLowerCase() === 'cash') return <AttachMoneyIcon />;
  if (tipo.toLowerCase() === 'card') return <CreditCardIcon />;
  return null;
};

export default function PaymentsPage() {
  const [pagosData, setPagosData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await getPayments();
        console.log('API response:', response.data);
        setPagosData(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, []);

  const handleOpenModal = (products) => {
    setSelectedProducts(products || []); 
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProducts([]);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <HeaderContainer>
        <Typography variant="h4">Historial de pagos</Typography>
        <ColorModeSelect /> 
      </HeaderContainer>
      <CenteredTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Mesa</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Tipo de pago</TableCell>
              <TableCell align="center">Fecha</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pagosData.map((pago) => (
              <TableRow key={pago.id}>
                <TableCell align="center">{pago.id}</TableCell>
                <TableCell align="center">{pago.orderId}</TableCell>
                <TableCell align="center">{pago.amount}</TableCell>
                <TableCell align="center">{tipoPagoIcon(pago.paymentMethod)}</TableCell>
                <TableCell align="center">{new Date(pago.createdAt).toLocaleString()}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleOpenModal(pago.products)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CenteredTableContainer>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Productos Consumidos
          </Typography>
          <Box id="modal-description" sx={{ mt: 2 }}>
            {selectedProducts.length > 0 ? (
              <ul>
                {selectedProducts.map((product, index) => (
                  <li key={index}>{product.name} - {product.quantity}</li>
                ))}
              </ul>
            ) : (
              <Typography>No hay productos consumidos.</Typography>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}