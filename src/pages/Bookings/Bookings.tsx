import { useState } from 'react';
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
    Chip,
    IconButton,
    Button,
    Avatar,
    alpha,
    useTheme,
    Grid,
} from '@mui/material';
import {
    CalendarMonth as CalendarIcon,
    List as ListIcon,
    MoreVert as MoreVertIcon,
    Event as EventIcon,
    LocationOn as LocationIcon,
    Person as PersonIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import DashboardHeader from '../../components/Dashboard/DashboardHeader/DashboardHeader';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';

// Mock data for bookings
const mockBookings = [
    { id: 'BK-5001', title: 'Sharma & Varma Wedding', client: 'Priya Sharma', vendor: 'Royal Banquet Hall', date: '2025-02-15', amount: '₹1,50,000', status: 'Confirmed' },
    { id: 'BK-5002', title: 'Engagement Ceremony', client: 'Rahul Varma', vendor: 'Capture Moments', date: '2025-03-02', amount: '₹45,000', status: 'Pending Payment' },
    { id: 'BK-5003', title: 'Corporate Annual Meet', client: 'Tech Corp', vendor: 'Gourmet Treats', date: '2025-01-20', amount: '₹80,000', status: 'Completed' },
    { id: 'BK-5004', title: 'Birthday Bash', client: 'Anita Roy', vendor: 'Elite Sounds', date: '2025-04-10', amount: '₹25,000', status: 'Confirmed' },
];

const BookingsPage = () => {
    const theme = useTheme();
    const { role } = useAuth();
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

    const currentRole = role?.toLowerCase() || 'client';

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'confirmed': return 'success';
            case 'pending payment': return 'warning';
            case 'completed': return 'info';
            default: return 'default';
        }
    };

    return (
        <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 1600, margin: '0 auto' }}>
            <DashboardHeader
                title={currentRole === 'client' ? "My Bookings" : "Bookings Management"}
                subtitle="Keep track of all your scheduled events and confirmations."
                tag="Schedule"
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3, gap: 1 }}>
                <Button
                    startIcon={<ListIcon />}
                    variant={viewMode === 'list' ? 'contained' : 'outlined'}
                    onClick={() => setViewMode('list')}
                    size="small"
                >
                    List View
                </Button>
                <Button
                    startIcon={<CalendarIcon />}
                    variant={viewMode === 'calendar' ? 'contained' : 'outlined'}
                    onClick={() => setViewMode('calendar')}
                    size="small"
                >
                    Calendar
                </Button>
            </Box>

            {viewMode === 'list' ? (
                <DashboardCard>
                    <TableContainer component={Paper} elevation={0} sx={{ bgcolor: 'transparent' }}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                                    <TableCell sx={{ fontWeight: 800 }}>Booking Details</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }}>{currentRole === 'vendor' ? 'Client' : 'Vendor'}</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }}>Date</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }}>Amount</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 800 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mockBookings.map((booking) => (
                                    <TableRow key={booking.id} sx={{ '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.02) } }}>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main' }}>
                                                    <EventIcon fontSize="small" />
                                                </Avatar>
                                                <Box>
                                                    <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{booking.title}</Typography>
                                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>{booking.id}</Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>
                                                {currentRole === 'vendor' ? booking.client : booking.vendor}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="caption" sx={{ fontWeight: 700 }}>{booking.date}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{ fontSize: '0.85rem', fontWeight: 700 }}>{booking.amount}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={booking.status}
                                                size="small"
                                                color={getStatusColor(booking.status) as any}
                                                sx={{ fontWeight: 800, fontSize: '0.7rem' }}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DashboardCard>
            ) : (
                <Grid container spacing={3}>
                    {[1, 2, 3, 4].map(i => (
                        <Grid item xs={12} md={6} lg={4} key={i}>
                            <DashboardCard sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                                <Box sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: 4,
                                    height: '100%',
                                    bgcolor: theme.palette.primary.main
                                }} />
                                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, fontSize: '1rem' }}>
                                    {mockBookings[i - 1]?.title || 'Upcoming Event'}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                    <Typography variant="caption" sx={{ fontWeight: 600 }}>{mockBookings[i - 1]?.date || 'TBD'}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                    <Typography variant="caption" sx={{ fontWeight: 600 }}>Mumbai Palace, Worli</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                    <Typography variant="caption" sx={{ fontWeight: 600 }}>{mockBookings[i - 1]?.client || 'Guest'}</Typography>
                                </Box>
                                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Chip label="Confirmed" size="small" color="success" sx={{ height: 20, fontSize: '0.65rem' }} />
                                    <Button size="small" sx={{ fontSize: '0.7rem', fontWeight: 700 }}>View Details</Button>
                                </Box>
                            </DashboardCard>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

// Mock missing icon
const LocationOnIcon = ({ sx, ...props }: any) => <LocationIcon sx={sx} {...props} />;

export default BookingsPage;
