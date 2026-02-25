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
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Email as EmailIcon,
    Phone as PhoneIcon
} from '@mui/icons-material';
import DashboardHeader from '../../components/Dashboard/DashboardHeader/DashboardHeader';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';

// Mock data for staff
const mockStaff = [
    { id: 'S001', name: 'Alia Bhatt', role: 'Wedding Coordinator', status: 'Available', email: 'alia@coordinator.com', phone: '+91 99999 00010' },
    { id: 'S002', name: 'Ranbir Kapoor', role: 'Support Specialist', status: 'Busy', email: 'ranbir@support.com', phone: '+91 99999 00011' },
    { id: 'S003', name: 'Katrina Kaif', role: 'Venue Liaison', status: 'On Leave', email: 'katrina@liaison.com', phone: '+91 99999 00012' },
    { id: 'S004', name: 'Vicky Kaushal', role: 'Vendor Relations', status: 'Available', email: 'vicky@relations.com', phone: '+91 99999 00013' },
];

const Staff = () => {
    const theme = useTheme();
    const [searchTerm, setSearchTerm] = useState('');

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'available': return 'success';
            case 'busy': return 'error';
            case 'on leave': return 'warning';
            default: return 'default';
        }
    };

    return (
        <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 1600, margin: '0 auto' }}>
            <DashboardHeader
                title="My Team (Staff)"
                subtitle="Manage and coordinate with your team of support staff and wedding experts."
                tag="Management"
            />

            <DashboardCard>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, gap: 2, flexWrap: 'wrap' }}>
                    <TextField
                        placeholder="Search staff members..."
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
                    <Button variant="contained" size="small" sx={{ borderRadius: '10px' }}>Add Staff Member</Button>
                </Box>

                <TableContainer component={Paper} elevation={0} sx={{ bgcolor: 'transparent' }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                                <TableCell sx={{ fontWeight: 800 }}>Staff Name</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Role</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Contact Info</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 800 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockStaff.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((member) => (
                                <TableRow key={member.id} sx={{ '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.02) } }}>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.1), color: theme.palette.secondary.main, fontWeight: 700 }}>
                                                {member.name.charAt(0)}
                                            </Avatar>
                                            <Box>
                                                <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{member.name}</Typography>
                                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>ID: {member.id}</Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: '0.9rem', fontWeight: 600 }}>{member.role}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <EmailIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                                                <Typography variant="caption" sx={{ fontWeight: 600 }}>{member.email}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <PhoneIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                                                <Typography variant="caption" sx={{ fontWeight: 600 }}>{member.phone}</Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={member.status}
                                            size="small"
                                            color={getStatusColor(member.status) as any}
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

export default Staff;
