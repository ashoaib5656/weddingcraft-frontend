import { useState, useMemo, useEffect } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Button,
    alpha,
    useTheme,
    Avatar,
    Tooltip,
    Chip
} from '@mui/material';
import {
    CalendarMonth as CalendarIcon,
    List as ListIcon,
    Visibility as ViewIcon,
    CheckCircle as ConfirmedIcon,
    Schedule as PendingIcon,
    Paid as PaidIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/Auth/useAuth';
import { useMaterialReactTable } from 'material-react-table';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';
import TableComponent from '../../components/TableComponent/TableComponent';
import { TableBottomToolbar, TableHeaderToolbar } from '../../components/TableComponent/TableProps';
import PremiumCalendar from '../../components/Calendar/PremiumCalendar';
import ORDER_SERVICE, { type Order } from '../../api/services/orders';

interface MappedBooking {
    id: string;
    title: string;
    client: string;
    clientAvatar?: string;
    vendor: string;
    date: string;
    amount: number;
    status: string;
}

const BookingsPage = () => {
    const theme = useTheme();
    const { role } = useAuth();
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
    const [bookings, setBookings] = useState<MappedBooking[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const currentRole = role?.toLowerCase() || 'client';

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await ORDER_SERVICE.GetAllOrders();
                const orders = response.data.data;
                const mappedBookings: MappedBooking[] = orders.map((o: Order) => ({
                    id: o.id.toString(),
                    title: o.title || `Booking #${o.id}`,
                    client: o.user?.name || 'Unknown Client',
                    clientAvatar: `https://ui-avatars.com/api/?name=${o.user?.name || 'U'}&background=random`,
                    vendor: 'System Vendor',
                    date: o.createdAt ? new Date(o.createdAt).toISOString() : new Date().toISOString(),
                    amount: o.totalAmount || 0,
                    status: o.status || 'Pending'
                }));
                setBookings(mappedBookings);
            } catch (error) {
                console.error("Error fetching bookings", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const getStatusConfig = (status: string) => {
        const s = status?.toLowerCase() || 'pending';
        if (s.includes('confirm')) return { color: 'success', icon: <ConfirmedIcon sx={{ fontSize: 14 }} />, label: 'Confirmed' };
        if (s.includes('pend')) return { color: 'warning', icon: <PendingIcon sx={{ fontSize: 14 }} />, label: 'Pending' };
        if (s.includes('complet')) return { color: 'info', icon: <PaidIcon sx={{ fontSize: 14 }} />, label: 'Completed' };
        return { color: 'default', icon: null, label: status || 'Pending' };
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
                size: 80,
                Cell: ({ cell }: any) => {
                    const id = cell.getValue();
                    return (
                        <Typography sx={{ color: 'text.disabled', fontWeight: 800, fontSize: '11px' }}>
                            #{id ? id.slice(-4) : 'N/A'}
                        </Typography>
                    );
                }
            },
            {
                accessorKey: 'title',
                header: 'Event / Booking',
                size: 250,
                Cell: ({ row }: any) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ 
                            width: 32, height: 32, borderRadius: '10px', 
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'primary.main'
                        }}>
                            <CalendarIcon sx={{ fontSize: 18 }} />
                        </Box>
                        <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>{row.original.title}</Typography>
                    </Box>
                )
            },
            {
                accessorKey: 'client',
                header: currentRole === 'vendor' ? 'Client Name' : 'Vendor',
                Cell: ({ row }: any) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar src={row.original.clientAvatar} sx={{ width: 28, height: 28, border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}` }} />
                        <Typography sx={{ fontWeight: 500, fontSize: '13px' }}>{row.original.client}</Typography>
                    </Box>
                )
            },
            {
                accessorKey: 'date',
                header: 'Booking Date',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontWeight: 500, fontSize: '13px', color: 'text.secondary' }}>
                        {cell.getValue() ? new Date(cell.getValue()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                    </Typography>
                )
            },
            {
                accessorKey: 'amount',
                header: 'Total Value',
                muiTableHeadCellProps: { align: 'right' as const },
                muiTableBodyCellProps: { align: 'right' as const },
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontWeight: 900, color: 'primary.main', fontSize: '15px' }}>
                        ₹{cell.getValue()?.toLocaleString() || '0'}
                    </Typography>
                )
            },
            {
                accessorKey: 'status',
                header: 'Status',
                Cell: ({ cell }: any) => {
                    const config = getStatusConfig(cell.getValue());
                    return (
                        <Chip 
                            label={config.label}
                            size="small"
                            sx={{ 
                                fontWeight: 800, 
                                fontSize: '10px', 
                                height: 24,
                                borderRadius: '8px',
                                textTransform: 'uppercase',
                                bgcolor: alpha(
                                    (theme.palette as any)[config.color === 'default' ? 'grey' : config.color]?.main || theme.palette.primary.main, 
                                    0.1
                                ),
                                color: (theme.palette as any)[config.color === 'default' ? 'grey' : config.color]?.main || theme.palette.primary.main,
                                '& .MuiChip-icon': {
                                    color: 'inherit'
                                }
                            }}
                        />
                    );
                }
            },
            {
                id: 'actions',
                header: '',
                size: 50,
                Cell: () => (
                    <Tooltip title="View Details">
                        <IconButton size="small" sx={{ bgcolor: alpha(theme.palette.divider, 0.05) }}>
                            <ViewIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                    </Tooltip>
                )
            }
        ],
        [currentRole, theme]
    );

    const [globalFilter, setGlobalFilter] = useState('');
    const [showGlobalFilter, setShowGlobalFilter] = useState(false);

    const table = useMaterialReactTable({
        columns,
        data: bookings,
        state: {
            isLoading,
            globalFilter,
            showGlobalFilter,
        },
        enableColumnActions: false,
        enableColumnFilters: true,
        enableSorting: true,
        enablePagination: true,
        enableGlobalFilter: true,
        onGlobalFilterChange: setGlobalFilter,
        onShowGlobalFilterChange: setShowGlobalFilter,
        muiTablePaperProps: {
            elevation: 0,
            sx: { borderRadius: '12px', border: 'none', overflow: 'hidden' },
        },
    });

    return (
        <Box sx={{ p: 0, maxWidth: 1600, margin: '0 auto' }}>
            <DashboardCard sx={{ p: 0, overflow: 'hidden', border: `1px solid ${alpha(theme.palette.divider, 0.1)}`, borderRadius: '12px' }}>
                <TableHeaderToolbar 
                    title="Bookings & Events"
                    table={table} 
                    ExcelData={{
                        data: bookings,
                        fileName: 'Bookings_Export'
                    }}
                    actionButton={
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button 
                                variant={viewMode === 'list' ? 'contained' : 'outlined'}
                                onClick={() => setViewMode('list')}
                                startIcon={<ListIcon />}
                                size="small"
                                sx={{ borderRadius: '10px', fontWeight: 800, textTransform: 'none', boxShadow: 'none' }}
                            >
                                List
                            </Button>
                            <Button 
                                variant={viewMode === 'calendar' ? 'contained' : 'outlined'}
                                onClick={() => setViewMode('calendar')}
                                startIcon={<CalendarIcon />}
                                size="small"
                                sx={{ borderRadius: '10px', fontWeight: 800, textTransform: 'none', boxShadow: 'none' }}
                            >
                                Calendar
                            </Button>
                        </Box>
                    }
                />
                {viewMode === 'list' ? (
                    <>
                        <TableComponent table={table} />
                        <TableBottomToolbar table={table} />
                    </>
                ) : (
                    <PremiumCalendar 
                        bookings={bookings as any} 
                        onDateClick={() => {}}
                    />
                )}
            </DashboardCard>
        </Box>
    );
};

export default BookingsPage;
