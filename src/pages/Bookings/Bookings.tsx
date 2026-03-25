import { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Button,
    alpha,
    useTheme,
    Grid,
} from '@mui/material';
import {
    CalendarMonth as CalendarIcon,
    List as ListIcon,
    MoreVert as MoreVertIcon,
    LocationOn as LocationIcon,
    Person as PersonIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/Auth/useAuth';
import { useMaterialReactTable } from 'material-react-table';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';
import TableComponent from '../../components/TableComponent/TableComponent';
import { TableBottomToolbar, TableHeaderToolbar } from '../../components/TableComponent/TableProps';

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
                        variant="caption" 
                        sx={{ 
                            color: 'text.secondary', 
                            fontWeight: 700,
                            fontSize: '0.85rem'
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
                                <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{booking.title}</Typography>
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
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>
                        {cell.getValue() as string}
                    </Typography>
                )
            },
            {
                accessorKey: 'date',
                header: 'Date',
                Cell: ({ cell }: any) => (
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>{cell.getValue() as string}</Typography>
                )
            },
            {
                accessorKey: 'amount',
                header: 'Amount',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 700 }}>{cell.getValue() as string}</Typography>
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
                            color: `${theme.palette[getStatusColor(cell.getValue() as string) as 'success' | 'warning' | 'error' | 'info'].main}`, 
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
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>Bookings listing</Typography>            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3, gap: 1 }}>
                <Button
                    startIcon={<ListIcon />}
                    variant={viewMode === 'list' ? 'contained' : 'outlined'}
                    onClick={() => setViewMode('list')}
                    size="small"
                >
                    List View
                </Button>
                <Button
                    startIcon={<CalendarIcon />}
                    variant={viewMode === 'calendar' ? 'contained' : 'outlined'}
                    onClick={() => setViewMode('calendar')}
                    size="small"
                >
                    Calendar
                </Button>
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
                <Grid container spacing={3}>
                    {[1, 2, 3, 4].map(i => (
                        <Grid item xs={12} md={6} lg={4} key={i}>
                            <DashboardCard sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                                <Box sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: 4,
                                    height: '100%',
                                    bgcolor: theme.palette.primary.main
                                }} />
                                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, fontSize: '1rem' }}>
                                    {mockBookings[i - 1]?.title || 'Upcoming Event'}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                    <Typography variant="caption" sx={{ fontWeight: 600 }}>{mockBookings[i - 1]?.date || 'TBD'}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                    <Typography variant="caption" sx={{ fontWeight: 600 }}>Mumbai Palace, Worli</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                    <Typography variant="caption" sx={{ fontWeight: 600 }}>{mockBookings[i - 1]?.client || 'Guest'}</Typography>
                                </Box>
                                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography 
                                        variant="caption" 
                                        sx={{ 
                                            fontWeight: 900, 
                                            color: 'success.main', 
                                            textTransform: 'uppercase', 
                                            fontSize: '0.65rem' 
                                        }}
                                    >
                                        Confirmed
                                    </Typography>
                                    <Button size="small" sx={{ fontSize: '0.7rem', fontWeight: 700 }}>View Details</Button>
                                </Box>
                            </DashboardCard>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

const LocationOnIcon = ({ sx, ...props }: any) => <LocationIcon sx={sx} {...props} />;

export default BookingsPage;
