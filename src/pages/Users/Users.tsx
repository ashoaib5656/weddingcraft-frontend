import { useState } from 'react';
import {
    Box,
    Typography,
    Avatar,
    Chip,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    InputAdornment,
    useTheme,
    alpha
} from '@mui/material';
import {
    Search as SearchIcon,
    MoreVert as MoreIcon,
    Mail as MailIcon,
    Shield as ShieldIcon,
    Person as PersonIcon,
    VerifiedUser as VerifyIcon
} from '@mui/icons-material';
import DashboardHeader from '../../components/Dashboard/DashboardHeader/DashboardHeader';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Manager' | 'Staff' | 'Vendor' | 'Client';
    status: 'active' | 'pending' | 'suspended';
    lastSeen: string;
}

const mockUsers: User[] = [
    { id: '1', name: 'Kabir Verma', email: 'kabir@wedspot.com', role: 'Admin', status: 'active', lastSeen: 'Just now' },
    { id: '2', name: 'Ananya Sharma', email: 'ananya@wedspot.com', role: 'Manager', status: 'active', lastSeen: '2 hours ago' },
    { id: '3', name: 'Rahul Gupta', email: 'rahul@vendor.com', role: 'Vendor', status: 'pending', lastSeen: 'Yesterday' },
    { id: '4', name: 'Sneha Reddy', email: 'sneha@client.com', role: 'Client', status: 'active', lastSeen: '5 hours ago' },
    { id: '5', name: 'Vikram Singh', email: 'vikram@wedspot.com', role: 'Staff', status: 'suspended', lastSeen: '3 days ago' },
];

const UsersPage = () => {
    const theme = useTheme();
    const [searchTerm, setSearchTerm] = useState('');

    const getStatusColor = (status: User['status']) => {
        switch (status) {
            case 'active': return 'success';
            case 'pending': return 'warning';
            case 'suspended': return 'error';
            default: return 'default';
        }
    };

    const getRandomColor = (name: string) => {
        const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
        const index = name.length % colors.length;
        return colors[index];
    };

    const filteredUsers = mockUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
            <DashboardHeader
                title="User Intelligence"
                subtitle="Monitor and manage access across the WedsPot ecosystem"
            />

            <DashboardCard sx={{ mt: 3, p: 0 }}>
                <Box sx={{ p: 2.5, borderBottom: `1px solid ${theme.dashboard.glassBorder}` }}>
                    <TextField
                        placeholder="Search by name or email..."
                        size="small"
                        fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            maxWidth: 500,
                            '& .MuiOutlinedInput-root': {
                                bgcolor: alpha(theme.palette.text.primary, 0.03),
                                borderRadius: 3
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" color="disabled" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>User Profile</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Role</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Recent Activity</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700, color: 'text.secondary' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id} sx={{ '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.02) } }}>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar
                                                sx={{
                                                    bgcolor: alpha(getRandomColor(user.name), 0.15),
                                                    color: getRandomColor(user.name),
                                                    fontWeight: 700,
                                                    fontSize: '0.95rem'
                                                }}
                                            >
                                                {user.name.charAt(0)}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>{user.name}</Typography>
                                                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    <MailIcon sx={{ fontSize: 12 }} /> {user.email}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            {user.role === 'Admin' ? <ShieldIcon sx={{ fontSize: 16, color: 'primary.main' }} /> : <PersonIcon sx={{ fontSize: 16, color: 'text.disabled' }} />}
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{user.role}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={user.status}
                                            size="small"
                                            color={getStatusColor(user.status)}
                                            icon={user.status === 'active' ? <VerifyIcon sx={{ fontSize: '14px !important' }} /> : undefined}
                                            sx={{ fontWeight: 700, textTransform: 'capitalize', px: 0.5 }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>{user.lastSeen}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small">
                                            <MoreIcon fontSize="small" />
                                        </IconButton>
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

export default UsersPage;
