import { useMemo, useState, useEffect } from 'react';
import {
    Box,
    Typography,
    IconButton,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    MoreVert as MoreIcon,
    ReceiptLong as BillIcon
} from '@mui/icons-material';
import { useMaterialReactTable } from 'material-react-table';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';
import TableComponent from '../../components/TableComponent/TableComponent';
import { TableBottomToolbar, TableHeaderToolbar } from '../../components/TableComponent/TableProps';
import ORDER_SERVICE from '../../api/services/orders';

interface Bill {
    id: string;
    invoiceNumber: string;
    client: string;
    amount: number;
    date: string;
    status: 'paid' | 'pending' | 'overdue';
}



const BillsPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [bills, setBills] = useState<Bill[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const response = await ORDER_SERVICE.GetAllOrders();
                const orders = response.data?.data || response.data || [];
                const mappedBills = orders.map((o: any) => ({
                    id: o.id.toString(),
                    invoiceNumber: `INV-2026-${o.id.toString().padStart(3, '0')}`,
                    client: o.user?.name || 'Unknown Client',
                    amount: o.totalAmount || 0,
                    date: o.createdAt ? new Date(o.createdAt).toISOString().split('T')[0] : '2026-01-01',
                    status: (o.status === 'Completed' || o.status === 'Confirmed') ? 'paid' : 'pending'
                }));
                setBills(mappedBills);
            } catch (error) {
                console.error("Error fetching bills", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBills();
    }, []);

    const getStatusColor = (status?: string) => {
        if (!status) return 'default';
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

    const columns = useMemo(
        () => [
            {
                accessorKey: 'invoiceNumber',
                header: 'Invoice #',
                Cell: ({ row }: any) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                        <BillIcon sx={{ color: 'text.disabled', fontSize: 14 }} />
                        <Typography sx={{ fontWeight: 700, fontSize: '11px', color: 'text.secondary' }}>{row.original.invoiceNumber}</Typography>
                    </Box>
                ),
            },
            {
                accessorKey: 'client',
                header: 'Client / Event',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontWeight: 600, fontSize: '12px', color: 'text.primary' }}>{cell.getValue() as string}</Typography>
                ),
            },
            {
                accessorKey: 'amount',
                header: 'Amount',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontWeight: 800, color: 'text.primary', fontSize: '13px' }}>
                        {formatCurrency(cell.getValue() as number)}
                    </Typography>
                ),
            },
            {
                accessorKey: 'date',
                header: 'Due Date',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '11px' }}>
                        {new Date(cell.getValue() as string).toLocaleDateString()}
                    </Typography>
                ),
            },
            {
                accessorKey: 'status',
                header: 'Status',
                Cell: ({ cell }: any) => (
                    <Typography 
                        sx={{ 
                            fontWeight: 900, 
                            color: `${theme.palette[getStatusColor(cell.getValue() as Bill['status']) as 'success' | 'warning' | 'error' | 'info'].main}`, 
                            textTransform: 'uppercase', 
                            fontSize: '10px',
                            letterSpacing: '0.05em'
                        }}
                    >
                        {cell.getValue() as string || 'Pending'}
                    </Typography>
                ),
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
                ),
            },
        ],
        [theme]
    );

    const [globalFilter, setGlobalFilter] = useState('');
    const [showGlobalFilter, setShowGlobalFilter] = useState(false);

    const table = useMaterialReactTable({
        muiTopToolbarProps: { sx: { p: '14px' } },
        columns,
        data: bills,
        state: {
            isLoading,
            globalFilter,
            showGlobalFilter,
            columnVisibility: {
                invoiceNumber: !isMobile,
                date: !isMobile,
            }
        },
        enableColumnActions: false,
        enableColumnFilters: true,
        enableSorting: true,
        enablePagination: true,
        enableRowSelection: true,
        enableGlobalFilter: true, // Added
        onGlobalFilterChange: setGlobalFilter,
        onShowGlobalFilterChange: setShowGlobalFilter,
        initialState: {
            pagination: { pageSize: 10, pageIndex: 0 },
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
            <Typography 
                variant="h4" 
                sx={{ 
                    mb: 2, 
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                }}
            >
                Bills Management
            </Typography>
            <DashboardCard sx={{ mt: 1, p: 0, overflow: 'hidden' }}>
                <Box sx={{ p: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${theme.dashboard?.glassBorder || 'divider'}`, flexWrap: 'wrap', gap: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Invoices</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <TableHeaderToolbar 
                            table={table} 
                            isSmall 
                            ExcelData={{
                                data: bills,
                                fileName: 'Bills_Export'
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

export default BillsPage;
