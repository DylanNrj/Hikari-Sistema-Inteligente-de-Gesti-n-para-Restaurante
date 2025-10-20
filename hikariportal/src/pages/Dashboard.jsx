import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Pagination,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import comedor from '../assets/comedor.png';
import { getTables } from '../api/tables'; 

const ITEMS_PER_PAGE = 8;

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '95%',
  padding: theme.spacing(2),
  boxSizing: 'border-box',
  background: theme.palette.mode === 'dark'
    ? 'radial-gradient(circle at center, hsla(220, 25%, 10%, 0.1))'
    : '#ffffff',
  maxWidth: '90%',
}));

const TableCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  width: '100%',
  margin: theme.spacing(2),
  boxShadow: '0 3px 5px 2px rgba(105, 135, 255, .3)',
  transition: 'transform 0.3s',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));


const StatusIcon = styled(Box)(({ theme, status }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: status === 'occupied' 
    ? theme.palette.error.main 
    : status === 'reserved' 
    ? theme.palette.warning.main 
    : theme.palette.success.main,
  marginTop: theme.spacing(1),
}));

const Indicator = styled(Box)(({ theme, label }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: label === 'Cuenta' ? '#FF7043' : '#29B6F6',
  color: '#fff',
  borderRadius: '50%',
  padding: theme.spacing(0.5, 1),
  fontSize: '0.8rem',
  fontWeight: 'bold',
}));


const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(2),
}));

export default function Dashboard() {
  const [tables, setTables] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const navigate = useNavigate();


  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await getTables(); 
        console.log('Response data:', response.data);

        const normalizedData = response.data.map((table) => ({
          ...table,
          status: table.status?.toLowerCase(), 
        }));

        setTables(normalizedData);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };

    fetchTables();
  }, []);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTables = tables.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleCardClick = (tableId) => {
    navigate(`/orders/${tableId}`); 
  };
  
  return (
    <Container>
      <Typography component="h1" variant="h4" gutterBottom>
        Mesas del Restaurante
      </Typography>

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {currentTables.map((table) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={table.id}>
            <TableCard onClick={() => handleCardClick(table.id)}>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={comedor}
                  alt={`Mesa ${table.number}`}
                  sx={{ objectFit: 'cover' }}
                />
                {table.status === 'occupied' && <Indicator label="Cuenta">Cuenta</Indicator>}
                {table.people > 0 && <Indicator label={table.people}>{table.people}</Indicator>}
              </Box>
              <CardContent>
                <Typography variant="h6" textAlign="center">
                  Mesa #{table.number}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Capacidad: {table.capacity} <PeopleIcon fontSize="small" />
                </Typography>
                <StatusIcon status={table.status}>
                  {table.status === 'occupied' ? (
                    <>
                      <CancelIcon fontSize="small" /> Ocupada
                    </>
                  ) : table.status === 'reserved' ? (
                    <>
                      <CancelIcon fontSize="small" /> Reservada
                    </>
                  ) : (
                    <>
                      <CheckCircleIcon fontSize="small" /> Libre
                    </>
                  )}
                </StatusIcon>
              </CardContent>
            </TableCard>
          </Grid>
        ))}
      </Grid>

      <PaginationContainer>
        <Pagination
          count={Math.ceil(tables.length / ITEMS_PER_PAGE)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="medium"
          shape="rounded"
        />
      </PaginationContainer>
    </Container>
  );
}
