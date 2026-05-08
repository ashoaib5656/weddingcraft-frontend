import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Container,
    Chip,
    Button,
    Stack,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';
import {
    CheckCircle as ApproveIcon,
    Cancel as RejectIcon,
    Person as PersonIcon,
} from '@mui/icons-material';
import DashboardCard from '../../../components/Dashboard/DashboardCard/DashboardCard';
import BOOKING_SERVICE from '../../../api/services/bookings';
import { BookingStatus } from '../../../Types/booking';
import type { Booking } from '../../../Types/booking';
import { useSnackbar } from '../../../contexts/SnackbarContext';
import Loader from '../../../components/Common/Loader';

const VendorBookingDashboard: React.FC = () => {
    const { success, error: showError } = useSnackbar();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [actionDialog, setActionDialog] = useState<{ open: boolean; type: 'Approve' | 'Reject' | 'Modification'; bookingId: number | null }>({
        open: false,
        type: 'Approve',
        bookingId: null,
    });
    const [actionNotes, setActionNotes] = useState('');

    const fetchBookings = async () => {
        try {
            const response = await BOOKING_SERVICE.getVendorBookings();
            setBookings(response.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleAction = async () => {
        if (!actionDialog.bookingId) return;
        
        try {
            if (actionDialog.type === 'Approve') {
                await BOOKING_SERVICE.approveBooking(actionDialog.bookingId, actionNotes);
                success('Booking approved and reserved!');
            } else if (actionDialog.type === 'Reject') {
                await BOOKING_SERVICE.rejectBooking(actionDialog.bookingId, actionNotes);
                success('Booking rejected.');
            } else {
                await BOOKING_SERVICE.requestModification(actionDialog.bookingId, actionNotes);
                success('Modification request sent!');
            }
            setActionDialog({ ...actionDialog, open: false });
            fetchBookings();
        } catch (err) {
            showError('Failed to process action.');
        }
    };

    if (isLoading) return <Loader fullScreen message="Loading requests..." />;

    return (
        <Box sx={{ py: 4, minHeight: '100vh', bgcolor: '#f8fafc' }}>
            <Container maxWidth="lg">
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 900, color: '#1e293b' }}>Booking Requests</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>Manage your incoming event bookings and service requests</Typography>
                </Box>

                <Stack spacing={3}>
                    {bookings.map((booking) => (
                        <DashboardCard key={booking.id} sx={{ p: 3 }}>
                            <Grid container spacing={3} alignItems="center">
                                <Grid item xs={12} md={3}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <Box sx={{ width: 44, height: 44, borderRadius: '12px', bgcolor: 'primary.main', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <PersonIcon />
                                        </Box>
                                        <Box>
                                            <Typography sx={{ fontWeight: 800 }}>{booking.customerName}</Typography>
                                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700 }}>REF: {booking.bookingReference}</Typography>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} md={5}>
                                    <Stack direction="row" spacing={3}>
                                        <Box>
                                            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', display: 'block' }}>EVENT DATE</Typography>
                                            <Typography sx={{ fontWeight: 700 }}>{new Date(booking.eventDate).toLocaleDateString()}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', display: 'block' }}>LOCATION</Typography>
                                            <Typography sx={{ fontWeight: 700 }}>{booking.location}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', display: 'block' }}>GUESTS</Typography>
                                            <Typography sx={{ fontWeight: 700 }}>{booking.guestCount}</Typography>
                                        </Box>
                                    </Stack>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Box sx={{ display: 'flex', gap: 1.5, justifyContent: { md: 'flex-end' } }}>
                                        {booking.status === BookingStatus.Pending ? (
                                            <>
                                                <Button 
                                                    variant="contained" 
                                                    color="success" 
                                                    startIcon={<ApproveIcon />}
                                                    onClick={() => setActionDialog({ open: true, type: 'Approve', bookingId: booking.id })}
                                                    sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 800 }}
                                                >
                                                    Approve
                                                </Button>
                                                <Button 
                                                    variant="outlined" 
                                                    color="info" 
                                                    onClick={() => setActionDialog({ open: true, type: 'Modification', bookingId: booking.id })}
                                                    sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 800 }}
                                                >
                                                    Modify
                                                </Button>
                                                <Button 
                                                    variant="outlined" 
                                                    color="error" 
                                                    startIcon={<RejectIcon />}
                                                    onClick={() => setActionDialog({ open: true, type: 'Reject', bookingId: booking.id })}
                                                    sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 800 }}
                                                >
                                                    Reject
                                                </Button>
                                            </>
                                        ) : (
                                            <Chip 
                                                label={BookingStatus[booking.status]} 
                                                color={booking.status === BookingStatus.Booked ? 'success' : 'default'}
                                                sx={{ fontWeight: 800, borderRadius: '8px' }}
                                            />
                                        )}
                                    </Box>
                                </Grid>
                            </Grid>
                        </DashboardCard>
                    ))}
                </Stack>

                <Dialog open={actionDialog.open} onClose={() => setActionDialog({ ...actionDialog, open: false })} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: '20px' } }}>
                    <DialogTitle sx={{ fontWeight: 900 }}>{actionDialog.type} Booking</DialogTitle>
                    <DialogContent>
                        <Typography sx={{ mb: 2, color: 'text.secondary' }}>
                            {actionDialog.type === 'Approve' 
                                ? 'Are you sure you want to approve this booking? This will reserve the date in your calendar.' 
                                : 'Please provide a reason for rejecting this booking request.'}
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Notes / Reason"
                            value={actionNotes}
                            onChange={(e) => setActionNotes(e.target.value)}
                            sx={{ mt: 1, '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                        />
                    </DialogContent>
                    <DialogActions sx={{ p: 3 }}>
                        <Button onClick={() => setActionDialog({ ...actionDialog, open: false })} sx={{ fontWeight: 800 }}>Cancel</Button>
                        <Button 
                            variant="contained" 
                            color={actionDialog.type === 'Approve' ? 'success' : 'error'}
                            onClick={handleAction}
                            sx={{ borderRadius: '10px', px: 4, fontWeight: 800 }}
                        >
                            Confirm {actionDialog.type}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
};

export default VendorBookingDashboard;
