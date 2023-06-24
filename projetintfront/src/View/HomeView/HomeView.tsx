import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { ReservationService } from '../../services/ReservationService';

function HomeView() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    FetchUserReservations(user.id);
  }, []);

  const fetchReservations = async () => {
    const reservationsService = new ReservationService()
    const reservations = await FetchUserReservations(user.id);
    setReservations(reservations);
  };

  function FetchUserReservations(userId) {
    const reservationsService = new ReservationService()
    return reservationsService.FetchReservations().then(reservations => 
      reservations.filter(reservation =>
        reservation.user1_id === userId ||
        reservation.user2_id === userId ||
        reservation.user3_id === userId ||
        reservation.user4_id === userId
      )
    );
  }

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {user.email}
        </Typography>
        <Box sx={{ my: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ p: 2, minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <Typography variant="h6" component="h2" gutterBottom>
                    Your Reservations
                  </Typography>
                  <Typography variant="body1">
                    {reservations.length ? reservations.map((reservation, index) => 
                      <div key={index}>{reservation.date}</div>
                    ) : "No reservations yet."}
                  </Typography>
                </div>
                <div>
                  <Button variant="contained" color={user.isAdmin ? 'secondary' : 'primary'} onClick={() => navigate('/reservations')}>
                    Reserve a Court
                  </Button>
                </div>
              </Paper>
            </Grid>
            {user.isAdmin == true && (
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{ p: 2, minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <Typography variant="h6" component="h2" gutterBottom>
                      User Management
                    </Typography>
                    <Typography variant="body1">
                      View and manage users.
                    </Typography>
                  </div>
                  <div>
                    <Button variant="contained" color={user.isAdmin ? 'secondary' : 'primary'} onClick={() => navigate('/users')}>
                      Manage Users
                    </Button>
                  </div>
                </Paper>
              </Grid>
            )}
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ p: 2, minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <Typography variant="h6" component="h2" gutterBottom>
                    Your Profile
                  </Typography>
                  <Typography variant="body1">
                    Name: {user.firstName} {user.lastName} <br />
                    Email: {user.email} <br />
                    Role: {user.isAdmin ? "Admin" : "User"}
                  </Typography>
                </div>
                <div>
                  <Button variant="contained" color={user.isAdmin ? 'secondary' : 'primary'} onClick={() => navigate('/profile')}>
                    Edit Profile
                  </Button>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default HomeView;
