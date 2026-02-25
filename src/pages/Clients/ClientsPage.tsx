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
    IconButton,
    TextField,
    InputAdornment,
    Avatar,
    alpha,
    useTheme,
    Button
} from '@mui/material';
import {
    Search as SearchIcon,
    Message as MessageIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    MoreVert as MoreVertIcon
} from '@mui/icons-material';
import DashboardHeader from '../../components/Dashboard/DashboardHeader/DashboardHeader';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';

// Mock data for clients
const mockClients = [
    { id: 'C001', name: 'Amitabh Bachchan', email: 'amitabh@legend.com', phone: '+91 99999 00001', activity: 'Viewed Venue "Royal Palace"', status: 'Active' },
    { id: 'C002', name: 'Shah Rukh Khan', email: 'srk@king.com', phone: '+91 99999 00002', activity: 'Booked Photographer "Capture Moments"', status: 'Active' },
    { id: 'C003', name: 'Deepika Padukone', email: 'deepika@star.com', phone: '+91 99999 00003', activity: 'Inquired about "Floral Dreams"', status: 'New' },
    { id: 'C004', name: 'Ranbir Kapoor', email: 'ranbir@actor.com', phone: '+91 99999 00004', activity: 'Updated Profile', status: 'Inactive' },
];

const ClientsPage = () => {
    const theme = useTheme();
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 1600, margin: '0 auto' }}>
            <DashboardHeader
                title="Clients Directory"
                subtitle="Manage and support all registered clients on the platform."
                tag="Support"
            />

            <DashboardCard>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, gap: 2, flexWrap: 'wrap' }}>
                    <TextField
                        placeholder="Search clients..."
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
                    <Button variant="contained" size="small" sx={{ borderRadius: '10px' }}>Add New Client</Button>
                </Box>

                <TableContainer component={Paper} elevation={0} sx={{ bgcolor: 'transparent' }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                                <TableCell sx={{ fontWeight: 800 }}>Client Name</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Contact Info</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Recent Activity</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 800 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockClients.map((client) => (
                                <TableRow key={client.id} sx={{ '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.02) } }}>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.1), color: 'secondary.main', fontWeight: 700 }}>
                                                {client.name.charAt(0)}
                                            </Avatar>
                                            <Box>
                                                <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{client.name}</Typography>
                                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>ID: {client.id}</Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <EmailIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                                                <Typography variant="caption" sx={{ fontWeight: 600 }}>{client.email}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <PhoneIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                                                <Typography variant="caption" sx={{ fontWeight: 600 }}>{client.phone}</Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'text.secondary' }}>{client.activity}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontWeight: 800,
                                                color: client.status === 'Active' ? 'success.main' : client.status === 'New' ? 'info.main' : 'text.disabled'
                                            }}
                                        >
                                            {client.status.toUpperCase()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                            <IconButton size="small" color="primary"><MessageIcon fontSize="small" /></IconButton>
                                            <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
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

export default ClientsPage;
