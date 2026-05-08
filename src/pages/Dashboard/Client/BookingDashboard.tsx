import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Container,
    Grid,
    Chip,
    Button,
    Stack,
    alpha,
    useTheme,
} from '@mui/material';
import {
    CalendarMonth as CalendarIcon,
    LocationOn as LocationIcon,
    CheckCircle as SuccessIcon,
    Error as ErrorIcon,
    Payment as PaymentIcon,
    AccessTime as PendingIcon,
} from '@mui/icons-material';
import DashboardCard from '../../../components/Dashboard/DashboardCard/DashboardCard';
import BOOKING_SERVICE from '../../../api/services/bookings';
import { BookingStatus } from '../../../Types/booking';
import type { Booking } from '../../../Types/booking';
import Loader from '../../../components/Common/Loader';

const BookingDashboard: React.FC = () => {
    const theme = useTheme();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await BOOKING_SERVICE.getMyBookings();
                setBookings(response.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const getStatusConfig = (status: BookingStatus) => {
        switch (status) {
            case BookingStatus.Pending:
                return { label: 'Pending Approval', color: 'warning', icon: <PendingIcon sx={{ fontSize: 16 }} /> };
            case BookingStatus.Confirmed:
                return { label: 'Approved', color: 'info', icon: <SuccessIcon sx={{ fontSize: 16 }} /> };
            case BookingStatus.PaymentPending:
                return { label: 'Awaiting Payment', color: 'primary', icon: <PaymentIcon sx={{ fontSize: 16 }} /> };
            case BookingStatus.Booked:
                return { label: 'Booked', color: 'success', icon: <SuccessIcon sx={{ fontSize: 16 }} /> };
            case BookingStatus.Rejected:
                return { label: 'Rejected', color: 'error', icon: <ErrorIcon sx={{ fontSize: 16 }} /> };
            default:
                return { label: BookingStatus[status], color: 'default', icon: undefined };
        }
    };

    if (isLoading) return <Loader fullScreen message="Fetching your bookings..." />;

    return (
        <Box sx={{ py: 4, minHeight: '100vh', bgcolor: '#f8fafc' }}>
            <Container maxWidth="lg">
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 900, color: '#1e293b' }}>My Bookings</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>Track your wedding service requests and payments</Typography>
                    </Box>
                </Box>

                {bookings.length === 0 ? (
                    <DashboardCard sx={{ p: 8, textAlign: 'center' }}>
                        <CalendarIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                        <Typography variant="h6" sx={{ fontWeight: 800 }}>No bookings yet</Typography>
                        <Typography sx={{ color: 'text.secondary', mb: 4 }}>Ready to start planning your big day?</Typography>
                        <Button variant="contained" href="/customer/vendors" sx={{ borderRadius: '10px' }}>Browse Vendors</Button>
                    </DashboardCard>
                ) : (
                    <Stack spacing={3}>
                        {bookings.map((booking) => {
                            const status = getStatusConfig(booking.status);
                            return (
                                <DashboardCard key={booking.id} sx={{ p: 0, overflow: 'hidden', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 30px rgba(0,0,0,0.06)' } }}>
                                    <Grid container>
                                        <Grid item xs={12} md={3} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 3, borderRight: `1px solid ${theme.palette.divider}` }}>
                                            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase' }}>Ref: {booking.bookingReference}</Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 900, mt: 1 }}>{booking.vendorName}</Typography>
                                            <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 700 }}>{booking.serviceName}</Typography>
                                        </Grid>
                                        
                                        <Grid item xs={12} md={6} sx={{ p: 3 }}>
                                            <Stack direction="row" spacing={4}>
                                                <Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                                        <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary' }}>DATE</Typography>
                                                    </Box>
                                                    <Typography sx={{ fontWeight: 700 }}>{new Date(booking.eventDate).toLocaleDateString()}</Typography>
                                                </Box>
                                                <Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                                        <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary' }}>LOCATION</Typography>
                                                    </Box>
                                                    <Typography sx={{ fontWeight: 700 }}>{booking.location}</Typography>
                                                </Box>
                                            </Stack>
                                        </Grid>

                                        <Grid item xs={12} md={3} sx={{ p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: { md: 'flex-end' } }}>
                                            <Chip 
                                                label={status.label} 
                                                color={status.color as any} 
                                                icon={status.icon}
                                                sx={{ fontWeight: 800, borderRadius: '8px', mb: 2 }}
                                            />
                                            {booking.status === BookingStatus.Confirmed && (
                                                <Button 
                                                    variant="contained" 
                                                    size="small"
                                                    startIcon={<PaymentIcon />}
                                                    sx={{ borderRadius: '8px', fontWeight: 800, textTransform: 'none' }}
                                                >
                                                    Pay Now
                                                </Button>
                                            )}
                                        </Grid>
                                    </Grid>
                                </DashboardCard>
                            );
                        })}
                    </Stack>
                )}
            </Container>
        </Box>
    );
};

export default BookingDashboard;
