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
    Chip,
    IconButton,
    TextField,
    InputAdornment,
    useTheme,
    alpha
} from '@mui/material';
import {
    Search as SearchIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    FilterList as FilterIcon,
    Add as AddIcon,
    Inventory as InventoryIcon
} from '@mui/icons-material';
import DashboardHeader from '../../components/Dashboard/DashboardHeader/DashboardHeader';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';

interface InventoryItem {
    id: string;
    name: string;
    category: 'decor' | 'catering' | 'technical' | 'safety';
    stock: number;
    unit: string;
    status: 'available' | 'low' | 'out';
    lastUpdated: string;
}

const mockInventory: InventoryItem[] = [
    { id: '1', name: 'Premium Velvet Chair Covers', category: 'decor', stock: 450, unit: 'pcs', status: 'available', lastUpdated: '2024-03-20' },
    { id: '2', name: 'Industrial Smoke Machines', category: 'technical', stock: 12, unit: 'units', status: 'available', lastUpdated: '2024-03-19' },
    { id: '3', name: 'Silk Table Linens (Gold)', category: 'decor', stock: 15, unit: 'pcs', status: 'low', lastUpdated: '2024-03-21' },
    { id: '4', name: 'Emergency Power Backup', category: 'safety', stock: 5, unit: 'units', status: 'available', lastUpdated: '2024-03-15' },
    { id: '5', name: 'Organic Floral Centerpieces', category: 'decor', stock: 0, unit: 'pcs', status: 'out', lastUpdated: '2024-03-22' },
];

const InventoryPage = () => {
    const theme = useTheme();
    const [searchTerm, setSearchTerm] = useState('');

    const getStatusColor = (status: InventoryItem['status']) => {
        switch (status) {
            case 'available': return 'success';
            case 'low': return 'warning';
            case 'out': return 'error';
            default: return 'default';
        }
    };

    const filteredItems = mockInventory.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
            <DashboardHeader
                title="Inventory Matrix"
                subtitle="Manage assets and logistics across all wedding protocols"
            />

            <DashboardCard sx={{ mt: 3, p: 0 }}>
                <Box sx={{ p: 2.5, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', borderBottom: `1px solid ${theme.dashboard.glassBorder}` }}>
                    <TextField
                        placeholder="Search assets..."
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            flexGrow: 1,
                            maxWidth: 400,
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
                    <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
                        <IconButton sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', borderRadius: 2 }}>
                            <FilterIcon />
                        </IconButton>
                        <IconButton sx={{ bgcolor: 'secondary.main', color: 'white', borderRadius: 2, '&:hover': { bgcolor: 'secondary.dark' } }}>
                            <AddIcon />
                        </IconButton>
                    </Box>
                </Box>

                <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Asset Name</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Category</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Stock Level</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Last Updated</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700, color: 'text.secondary' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredItems.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.02) } }}
                                >
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <Box sx={{
                                                p: 1,
                                                borderRadius: 2,
                                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                                color: 'primary.main',
                                                display: 'flex'
                                            }}>
                                                <InventoryIcon fontSize="small" />
                                            </Box>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.name}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption" sx={{ textTransform: 'uppercase', fontWeight: 700, color: 'text.disabled' }}>
                                            {item.category}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                            {item.stock} <Typography component="span" variant="caption" sx={{ color: 'text.secondary' }}>{item.unit}</Typography>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={item.status}
                                            size="small"
                                            color={getStatusColor(item.status)}
                                            sx={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.65rem' }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>{item.lastUpdated}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" sx={{ mr: 0.5, color: 'primary.main' }}>
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" sx={{ color: 'error.main' }}>
                                            <DeleteIcon fontSize="small" />
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

export default InventoryPage;
