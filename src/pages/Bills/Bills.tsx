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
    Button,
    Tooltip,
    useTheme,
    alpha
} from '@mui/material';
import {
    ReceiptLong as BillIcon,
    Download as DownloadIcon,
    Visibility as ViewIcon,
    CreditCard as PayIcon
} from '@mui/icons-material';
import DashboardHeader from '../../components/Dashboard/DashboardHeader/DashboardHeader';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';

interface Bill {
    id: string;
    invoiceNumber: string;
    client: string;
    amount: number;
    date: string;
    status: 'paid' | 'pending' | 'overdue';
}

const mockBills: Bill[] = [
    { id: '1', invoiceNumber: 'INV-2024-001', client: 'Arjun & Sneha', amount: 450000, date: '2024-03-15', status: 'paid' },
    { id: '2', invoiceNumber: 'INV-2024-002', client: 'Meera & Rohan', amount: 250000, date: '2024-03-18', status: 'pending' },
    { id: '3', invoiceNumber: 'INV-2024-003', client: 'Priya & Vikram', amount: 680000, date: '2024-03-20', status: 'overdue' },
    { id: '4', invoiceNumber: 'INV-2024-004', client: 'Amit & Ritu', amount: 125000, date: '2024-03-22', status: 'pending' },
];

const BillsPage = () => {
    const theme = useTheme();

    const getStatusColor = (status: Bill['status']) => {
        switch (status) {
            case 'paid': return 'success';
            case 'pending': return 'warning';
            case 'overdue': return 'error';
            default: return 'default';
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
            <DashboardHeader
                title="Financial Ledger"
                subtitle="Track invoices, payments, and financial protocols"
            />

            <DashboardCard sx={{ mt: 3, p: 0 }}>
                <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${theme.dashboard.glassBorder}` }}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>Invoices</Typography>
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<DownloadIcon />}
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 700,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: 'primary.main',
                            boxShadow: 'none',
                            '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2), boxShadow: 'none' }
                        }}
                    >
                        Export All
                    </Button>
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Invoice #</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Client / Event</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Amount</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Due Date</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Status</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700, color: 'text.secondary' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockBills.map((bill) => (
                                <TableRow key={bill.id} sx={{ '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.02) } }}>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <BillIcon sx={{ color: 'text.disabled', fontSize: 18 }} />
                                            <Typography variant="body2" sx={{ fontWeight: 700 }}>{bill.invoiceNumber}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>{bill.client}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ fontWeight: 800, color: 'text.primary' }}>
                                            {formatCurrency(bill.amount)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>{bill.date}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={bill.status}
                                            size="small"
                                            variant="outlined"
                                            color={getStatusColor(bill.status)}
                                            sx={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.65rem' }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="View Details">
                                            <IconButton size="small" sx={{ color: 'primary.main' }}>
                                                <ViewIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Pay Now">
                                            <IconButton size="small" sx={{ color: 'success.main', ml: 0.5 }}>
                                                <PayIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Download PDF">
                                            <IconButton size="small" sx={{ color: 'text.secondary', ml: 0.5 }}>
                                                <DownloadIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
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

export default BillsPage;
