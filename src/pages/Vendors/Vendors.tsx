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
    Avatar,
    alpha,
    useTheme
} from '@mui/material';
import {
    Search as SearchIcon,
    FilterList as FilterIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Store as StoreIcon
} from '@mui/icons-material';
import DashboardHeader from '../../components/Dashboard/DashboardHeader/DashboardHeader';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';

// Mock data for vendors
const mockVendors = [
    { id: 'V001', name: 'Royal Banquet Hall', category: 'Venue', contact: 'Manoj Kumar', rating: 4.8, status: 'Active', location: 'Mumbai' },
    { id: 'V002', name: 'Capture Moments', category: 'Photography', contact: 'Anita Roy', rating: 4.9, status: 'Active', location: 'Delhi' },
    { id: 'V003', name: 'Floral Dreams', category: 'Decoration', contact: 'Suresh Raina', rating: 4.5, status: 'On Hold', location: 'Bangalore' },
    { id: 'V004', name: 'Gourmet Treats', category: 'Catering', contact: 'Chef Rahul', rating: 4.7, status: 'Active', location: 'Pune' },
    { id: 'V005', name: 'Elite Sounds', category: 'Music/DJ', contact: 'DJ Sunny', rating: 4.6, status: 'Under Review', location: 'Mumbai' },
];

const VendorsPage = () => {
    const theme = useTheme();
    const [searchTerm, setSearchTerm] = useState('');

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active': return 'success';
            case 'on hold': return 'warning';
            case 'under review': return 'info';
            default: return 'default';
        }
    };

    return (
        <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 1600, margin: '0 auto' }}>
            <DashboardHeader
                title="Vendors Management"
                subtitle="View and manage all registered vendors across WedsPot."
                tag="Administration"
            />

            <DashboardCard>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, gap: 2, flexWrap: 'wrap' }}>
                    <TextField
                        placeholder="Search vendors..."
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
                        <Button startIcon={<FilterIcon />} variant="outlined" size="small" sx={{ borderRadius: '10px' }}>Filter</Button>
                        <Button variant="contained" size="small" sx={{ borderRadius: '10px', bgcolor: theme.palette.primary.main }}>Add Vendor</Button>
                    </Box>
                </Box>

                <TableContainer component={Paper} elevation={0} sx={{ bgcolor: 'transparent' }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                                <TableCell sx={{ fontWeight: 800 }}>Vendor Details</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Category</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Location</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Rating</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 800 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockVendors.filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase())).map((vendor) => (
                                <TableRow key={vendor.id} sx={{ '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.02) } }}>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.1), color: theme.palette.secondary.main }}>
                                                <StoreIcon fontSize="small" />
                                            </Avatar>
                                            <Box>
                                                <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{vendor.name}</Typography>
                                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>ID: {vendor.id} • {vendor.contact}</Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: '0.9rem', fontWeight: 600 }}>{vendor.category}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: '0.9rem', fontWeight: 600 }}>{vendor.location}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={`${vendor.rating} ★`}
                                            size="small"
                                            sx={{ fontWeight: 800, bgcolor: alpha(theme.palette.warning.main, 0.1), color: 'warning.main' }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={vendor.status}
                                            size="small"
                                            color={getStatusColor(vendor.status) as any}
                                            sx={{ fontWeight: 800, fontSize: '0.7rem' }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                                            <IconButton size="small" color="primary"><EditIcon fontSize="small" /></IconButton>
                                            <IconButton size="small" color="error"><DeleteIcon fontSize="small" /></IconButton>
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

export default VendorsPage;
