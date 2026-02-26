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
    TextField,
    InputAdornment,
    Button,
    alpha,
    useTheme,
    Tabs,
    Tab
} from '@mui/material';
import {
    Search as SearchIcon,
    Message as MessageIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    Info as InfoIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/Auth/useAuth';
import DashboardHeader from '../../components/Dashboard/DashboardHeader/DashboardHeader';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';

// Mock data for requests
const mockRequests = [
    { id: 'RQ-101', subject: 'Wedding Venue Inquiry', sender: 'Priya Sharma', category: 'Venue', date: '2024-12-20', status: 'Pending', type: 'Inquiry' },
    { id: 'RQ-102', subject: 'Photography Package', sender: 'Rahul Varma', category: 'Photography', date: '2024-12-21', status: 'In Discussion', type: 'Inquiry' },
    { id: 'RQ-103', subject: 'Custom Floral Decor', sender: 'Anita Roy', category: 'Decoration', date: '2024-12-22', status: 'Accepted', type: 'Booking' },
    { id: 'RQ-104', subject: 'Catering for 200 Guests', sender: 'Suresh Raina', category: 'Catering', date: '2024-12-23', status: 'Pending', type: 'Inquiry' },
    { id: 'RQ-105', subject: 'DJ & Sound Setup', sender: 'Vikram Singh', category: 'Music', date: '2024-12-24', status: 'Rejected', type: 'Booking' },
];

const RequestsPage = () => {
    const theme = useTheme();
    const { role } = useAuth();
    const [tabValue, setTabValue] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const currentRole = role?.toLowerCase() || 'client';

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'warning';
            case 'in discussion': return 'info';
            case 'accepted': return 'success';
            case 'rejected': return 'error';
            default: return 'default';
        }
    };

    return (
        <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 1600, margin: '0 auto' }}>
            <DashboardHeader
                title={currentRole === 'client' ? "My Requests" : "Requests Management"}
                subtitle={currentRole === 'client' ? "Track and manage your service inquiries." : "Review and manage service requests from clients."}
                tag="Communication"
            />

            <DashboardCard>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs
                        value={tabValue}
                        onChange={(_, newValue) => setTabValue(newValue)}
                        sx={{
                            '& .MuiTab-root': { fontWeight: 700, textTransform: 'none', fontSize: '0.95rem' }
                        }}
                    >
                        <Tab label="All Requests" />
                        <Tab label="Inquiries" />
                        <Tab label="Bookings" />
                    </Tabs>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, gap: 2, flexWrap: 'wrap' }}>
                    <TextField
                        placeholder="Search requests..."
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ width: { xs: '100%', sm: 300 } }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <Button variant="outlined" size="small" sx={{ borderRadius: '10px' }}>Export CSV</Button>
                        {currentRole === 'client' && <Button variant="contained" size="small" sx={{ borderRadius: '10px' }}>New Request</Button>}
                    </Box>
                </Box>

                <TableContainer component={Paper} elevation={0} sx={{ bgcolor: 'transparent' }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                                <TableCell sx={{ fontWeight: 800 }}>ID & Subject</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>{currentRole === 'client' ? 'Category' : 'Client Name'}</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Type</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 800 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockRequests.map((request) => (
                                <TableRow key={request.id} sx={{ '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.02) } }}>
                                    <TableCell>
                                        <Box>
                                            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{request.subject}</Typography>
                                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>{request.id}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>
                                            {currentRole === 'client' ? request.category : request.sender}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>{request.date}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={request.type}
                                            size="small"
                                            variant="outlined"
                                            sx={{ fontWeight: 800, fontSize: '0.65rem', height: 20 }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={request.status}
                                            size="small"
                                            color={getStatusColor(request.status) as any}
                                            sx={{ fontWeight: 800, fontSize: '0.7rem' }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                            <Tooltip title="View Details">
                                                <IconButton size="small" color="info"><InfoIcon fontSize="small" /></IconButton>
                                            </Tooltip>
                                            <Tooltip title="Chat">
                                                <IconButton size="small" color="primary"><MessageIcon fontSize="small" /></IconButton>
                                            </Tooltip>
                                            {currentRole !== 'client' && request.status === 'Pending' && (
                                                <>
                                                    <Tooltip title="Accept">
                                                        <IconButton size="small" color="success"><CheckCircleIcon fontSize="small" /></IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Reject">
                                                        <IconButton size="small" color="error"><CancelIcon fontSize="small" /></IconButton>
                                                    </Tooltip>
                                                </>
                                            )}
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DashboardCard>
        </Box>
    );
};

// Tooltip wrapper for convenience
const Tooltip = ({ title, children }: { title: string, children: React.ReactElement }) => {
    const [open, setOpen] = useState(false);
    return (
        <Box
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            sx={{ position: 'relative', display: 'inline-flex' }}
        >
            {children}
            {open && (
                <Box sx={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bgcolor: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.7rem',
                    zIndex: 10,
                    whiteSpace: 'nowrap',
                    mb: 0.5
                }}>
                    {title}
                </Box>
            )}
        </Box>
    );
};

export default RequestsPage;
