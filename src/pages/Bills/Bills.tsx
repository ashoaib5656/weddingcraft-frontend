import { useMemo } from 'react';
import {
    Box,
    Typography,
    IconButton,
    useTheme,
} from '@mui/material';
import {
    MoreVert as MoreIcon,
    ReceiptLong as BillIcon
} from '@mui/icons-material';
import { useMaterialReactTable } from 'material-react-table';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';
import TableComponent from '../../components/TableComponent/TableComponent';
import { TableBottomToolbar, TableHeaderToolbar } from '../../components/TableComponent/TableProps';

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
    { id: '5', invoiceNumber: 'INV-2024-001', client: 'Arjun & Sneha', amount: 450000, date: '2024-03-15', status: 'paid' },
    { id: '6', invoiceNumber: 'INV-2024-002', client: 'Meera & Rohan', amount: 250000, date: '2024-03-18', status: 'pending' },
    { id: '7', invoiceNumber: 'INV-2024-003', client: 'Priya & Vikram', amount: 680000, date: '2024-03-20', status: 'overdue' },
    { id: '8', invoiceNumber: 'INV-2024-004', client: 'Amit & Ritu', amount: 125000, date: '2024-03-22', status: 'pending' },
    { id: '9', invoiceNumber: 'INV-2024-001', client: 'Arjun & Sneha', amount: 450000, date: '2024-03-15', status: 'paid' },
    { id: '10', invoiceNumber: 'INV-2024-002', client: 'Meera & Rohan', amount: 250000, date: '2024-03-18', status: 'pending' },
    { id: '11', invoiceNumber: 'INV-2024-003', client: 'Priya & Vikram', amount: 680000, date: '2024-03-20', status: 'overdue' },
    { id: '12', invoiceNumber: 'INV-2024-004', client: 'Amit & Ritu', amount: 125000, date: '2024-03-22', status: 'pending' },
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
                    <Typography sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '11px' }}>{cell.getValue() as string}</Typography>
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
                        {cell.getValue() as string}
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

    const table = useMaterialReactTable({
        muiTopToolbarProps: { sx: { p: '14px' } },
        columns,
        data: mockBills,
        enableColumnActions: false,
        enableColumnFilters: true,
        enableSorting: true,
        enablePagination: true,
        enableRowSelection: true,
        enableGlobalFilter: true, // Added
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
            <Typography 
                variant="h4" 
                sx={{ 
                    fontWeight: 900, 
                    mb: 4, 
                    letterSpacing: '-0.02em',
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                }}
            >
                Bills Management
            </Typography>            <DashboardCard sx={{ mt: 3, p: 0, overflow: 'hidden' }}>
                <Box sx={{ p: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${theme.dashboard.glassBorder}` }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Invoices</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <TableHeaderToolbar 
                            table={table} 
                            isSmall 
                            ExcelData={{
                                data: mockBills,
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
