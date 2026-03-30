import { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Button,
    alpha,
    useTheme
} from '@mui/material';
import {
    CalendarMonth as CalendarIcon,
    List as ListIcon,
    MoreVert as MoreVertIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/Auth/useAuth';
import { useMaterialReactTable } from 'material-react-table';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';
import TableComponent from '../../components/TableComponent/TableComponent';
import { TableBottomToolbar, TableHeaderToolbar } from '../../components/TableComponent/TableProps';
import PremiumCalendar from '../../components/Calendar/PremiumCalendar';

// Mock data for bookings
const mockBookings = [
    { id: 'BK-5001', title: 'Sharma & Varma Wedding', client: 'Priya Sharma', vendor: 'Royal Banquet Hall', date: '2025-02-15', amount: '₹1,50,000', status: 'Confirmed' },
    { id: 'BK-5002', title: 'Engagement Ceremony', client: 'Rahul Varma', vendor: 'Capture Moments', date: '2025-03-02', amount: '₹45,000', status: 'Pending Payment' },
    { id: 'BK-5003', title: 'Corporate Annual Meet', client: 'Tech Corp', vendor: 'Gourmet Treats', date: '2025-01-20', amount: '₹80,000', status: 'Completed' },
    { id: 'BK-5004', title: 'Birthday Bash', client: 'Anita Roy', vendor: 'Elite Sounds', date: '2025-04-10', amount: '₹25,000', status: 'Confirmed' },
];

const BookingsPage = () => {
    const theme = useTheme();
    const { role } = useAuth();
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

    const currentRole = role?.toLowerCase() || 'client';

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'confirmed': return 'success';
            case 'pending payment': return 'warning';
            case 'completed': return 'info';
            default: return 'default';
        }
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Booking ID',
                Cell: ({ cell }: any) => (
                    <Typography 
                        sx={{ 
                            color: 'text.secondary', 
                            fontWeight: 600,
                            fontSize: '11px'
                        }}
                    >
                        {cell.getValue() as string}
                    </Typography>
                )
            },
            {
                accessorKey: 'title',
                header: 'Booking Details',
                Cell: ({ row }: any) => {
                    const booking = row.original;
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box>
                            <Typography sx={{ fontWeight: 700, fontSize: '13px', color: 'text.primary' }}>{booking.title}</Typography>
                        </Box>
                        </Box>
                    );
                }
            },
            {
                id: 'clientOrVendor',
                accessorFn: (row: any) => currentRole === 'vendor' ? row.client : row.vendor,
                header: currentRole === 'vendor' ? 'Client' : 'Vendor',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontSize: '12px', fontWeight: 600, color: 'text.primary' }}>
                        {cell.getValue() as string}
                    </Typography>
                )
            },
            {
                accessorKey: 'date',
                header: 'Date',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.secondary' }}>{cell.getValue() as string}</Typography>
                )
            },
            {
                accessorKey: 'amount',
                header: 'Amount',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontWeight: 800, fontSize: '13px', color: 'text.primary' }}>{cell.getValue() as string}</Typography>
                )
            },
            {
                accessorKey: 'status',
                header: 'Status',
                Cell: ({ cell }: any) => (
                    <Typography 
                        sx={{ 
                            fontWeight: 900, 
                            color: `${theme.palette[getStatusColor(cell.getValue() as string) as 'success' | 'warning' | 'error' | 'info'].main}`, 
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
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
                        <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
                    </Box>
                )
            }
        ],
        [currentRole, theme]
    );

    const table = useMaterialReactTable({
        muiTopToolbarProps: { sx: { p: '14px' } },
        columns,
        data: mockBookings,
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography 
                    variant="h4" 
                    sx={{ 
                        fontWeight: 900, 
                        letterSpacing: '-0.02em',
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        display: 'inline-block'
                    }}
                >
                    Bookings Management
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        startIcon={<ListIcon />}
                        variant={viewMode === 'list' ? 'contained' : 'outlined'}
                        onClick={() => setViewMode('list')}
                        size="small"
                        sx={{ borderRadius: '12px', textTransform: 'none', fontWeight: 700 }}
                    >
                        List View
                    </Button>
                    <Button
                        startIcon={<CalendarIcon />}
                        variant={viewMode === 'calendar' ? 'contained' : 'outlined'}
                        onClick={() => setViewMode('calendar')}
                        size="small"
                        sx={{ borderRadius: '12px', textTransform: 'none', fontWeight: 700 }}
                    >
                        Calendar
                    </Button>
                </Box>
            </Box>

            {viewMode === 'list' ? (
                <DashboardCard sx={{ p: 0, overflow: 'hidden' }}>
                    <Box sx={{ p: '14px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: `1px solid ${theme.dashboard?.glassBorder || alpha(theme.palette.divider, 0.1)}` }}>
                        <TableHeaderToolbar 
                            table={table} 
                            isSmall 
                            ExcelData={{
                                data: mockBookings,
                                fileName: 'Bookings_Report'
                            }}
                        />
                    </Box>
                    <TableComponent table={table} />
                    <TableBottomToolbar table={table} />
                </DashboardCard>
            ) : (
                <PremiumCalendar bookings={mockBookings as any} />
            )}
        </Box>
    );
};

export default BookingsPage;
