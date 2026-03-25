import { useMemo } from 'react';
import {
    Box,
    Typography,
    Grid,
    alpha,
    useTheme,
    IconButton,
    Button
} from '@mui/material';
import {
    MoreVert as MoreIcon,
    Wallet as WalletIcon,
    TrendingUp as TrendingUpIcon,
    AccountBalance as BankIcon,
    Download as DownloadIcon,
    ArrowUpward as ArrowUpIcon
} from '@mui/icons-material';
import { useMaterialReactTable } from 'material-react-table';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';
import TableComponent from '../../components/TableComponent/TableComponent';
import { TableBottomToolbar, TableHeaderToolbar } from '../../components/TableComponent/TableProps';

const EarningsPage = () => {
    const theme = useTheme();

    const stats = [
        { label: 'Total Earnings', value: '₹4,85,000', change: '+15%', icon: <WalletIcon />, color: '#7c3aed' },
        { label: 'Pending Payouts', value: '₹52,000', change: '3 Pending', icon: <TrendingUpIcon />, color: '#f59e0b' },
        { label: 'Next Payout', value: '₹28,500', change: 'Jan 30', icon: <BankIcon />, color: '#0ea5e9' },
    ];

    const transactions = [
        { id: 'TXN-901', client: 'Priya Sharma', event: 'Wedding Venue', amount: '₹1,20,000', status: 'Paid', date: '2025-01-15' },
        { id: 'TXN-902', client: 'Rahul Varma', event: 'Engagement', amount: '₹35,000', status: 'Pending', date: '2025-01-18' },
        { id: 'TXN-903', client: 'Anita Roy', event: 'Birthday Decor', amount: '₹15,000', status: 'Processing', date: '2025-01-19' },
    ];

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Transaction ID',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: 'text.secondary' }}>{cell.getValue() as string}</Typography>
                )
            },
            {
                id: 'clientEvent',
                accessorFn: (row: any) => `${row.client} ${row.event}`,
                header: 'Client & Event',
                Cell: ({ row }: any) => {
                    const txn = row.original;
                    return (
                        <Box>
                            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{txn.client}</Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>{txn.event}</Typography>
                        </Box>
                    );
                }
            },
            {
                accessorKey: 'amount',
                header: 'Amount',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 800 }}>{cell.getValue() as string}</Typography>
                )
            },
            {
                accessorKey: 'date',
                header: 'Date',
                Cell: ({ cell }: any) => (
                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>{cell.getValue() as string}</Typography>
                )
            },
            {
                accessorKey: 'status',
                header: 'Status',
                Cell: ({ cell }: any) => (
                    <Typography 
                        variant="caption" 
                        sx={{ 
                            fontWeight: 900, 
                            color: `${theme.palette[cell.getValue() === 'Paid' ? 'success' : cell.getValue() === 'Pending' ? 'warning' : 'info'].main}`, 
                            textTransform: 'uppercase', 
                            fontSize: '0.65rem' 
                        }}
                    >
                        {cell.getValue() as string}
                    </Typography>
                )
            },
            {
                accessorKey: 'actions',
                header: 'Actions',
                muiTableHeadCellProps: { align: 'center' as const },
                muiTableBodyCellProps: { align: 'center' as const },
                enableColumnFilter: false,
                enableSorting: false,
                Cell: () => (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton size="small">
                            <MoreIcon fontSize="small" />
                        </IconButton>
                    </Box>
                )
            }
        ],
        [theme]
    );

    const table = useMaterialReactTable({
        muiTopToolbarProps: { sx: { p: '14px' } },
        columns,
        data: transactions,
        enableColumnActions: false,
        enableColumnFilters: true,
        enableSorting: true,
        enablePagination: true,
        enableRowSelection: true,
        enableGlobalFilter: true,
        initialState: {
            pagination: { pageSize: 10, pageIndex: 0 },
            showGlobalFilter: false,
        },
        muiTablePaperProps: {
            elevation: 0,
            sx: {
                borderRadius: '0',
                border: 'none',
            },
        },
    });

    return (
        <Box sx={{ p: 0, maxWidth: 1600, margin: '0 auto' }}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>Earnings listing</Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                        <DashboardCard>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                                <Box sx={{
                                    p: 1.5,
                                    borderRadius: 3,
                                    bgcolor: alpha(stat.color, 0.1),
                                    color: stat.color,
                                    display: 'flex'
                                }}>
                                    {stat.icon}
                                </Box>
                                <Box>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block' }}>
                                        {stat.label}
                                    </Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5 }}>
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'success.main', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <ArrowUpIcon sx={{ fontSize: 12 }} /> {stat.change}
                                    </Typography>
                                </Box>
                            </Box>
                        </DashboardCard>
                    </Grid>
                ))}
            </Grid>

            <DashboardCard sx={{ mt: 3, p: 0, overflow: 'hidden' }}>
                <Box sx={{ p: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, borderBottom: `1px solid ${theme.dashboard?.glassBorder || alpha(theme.palette.divider, 0.1)}` }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography sx={{ fontWeight: 800 }}>Recent Transactions</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button startIcon={<DownloadIcon />} variant="outlined" size="small" sx={{ borderRadius: '10px', fontWeight: 700 }}>Download Statement</Button>
                        <TableHeaderToolbar 
                            table={table} 
                            isSmall 
                            ExcelData={{
                                data: transactions,
                                fileName: 'Earnings_Report'
                            }}
                        />
                    </Box>
                </Box>

                <TableComponent table={table} />
                <TableBottomToolbar table={table} />
            </DashboardCard>
        </Box>
    );
};

export default EarningsPage;
