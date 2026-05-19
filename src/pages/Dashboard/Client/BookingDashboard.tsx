import React, { useState, useMemo, useEffect } from 'react';
import {
    Box,
    Typography,
    alpha,
    useTheme,
    Chip,
} from '@mui/material';
import {
    CalendarMonth as CalendarIcon,
    LocationOn as LocationIcon,
    Payment as PaymentIcon,
    AccessTime as PendingIcon,
    CheckCircle as SuccessIcon,
    Error as ErrorIcon,
} from '@mui/icons-material';
import { useMaterialReactTable } from 'material-react-table';
import DashboardCard from '../../../components/Dashboard/DashboardCard/DashboardCard';
import TableComponent from '../../../components/TableComponent/TableComponent';
import { TableBottomToolbar, TableHeaderToolbar } from '../../../components/TableComponent/TableProps';
import BOOKING_SERVICE from '../../../api/services/bookings';
import { BookingStatus } from '../../../Types/booking';
import type { Booking } from '../../../Types/booking';
import Loader from '../../../components/Common/Loader';

const BookingDashboard: React.FC = () => {
    const theme = useTheme();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await BOOKING_SERVICE.getMyBookings();
                const data = response.data?.data || [];
                setBookings(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Failed to fetch bookings:", err);
                setBookings([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const getStatusConfig = (status: BookingStatus) => {
        switch (status) {
            case BookingStatus.Pending:
                return { label: 'Pending', color: 'warning', icon: <PendingIcon sx={{ fontSize: 14 }} /> };
            case BookingStatus.Confirmed:
                return { label: 'Approved', color: 'info', icon: <SuccessIcon sx={{ fontSize: 14 }} /> };
            case BookingStatus.PaymentPending:
                return { label: 'Payment Pending', color: 'primary', icon: <PaymentIcon sx={{ fontSize: 14 }} /> };
            case BookingStatus.Booked:
                return { label: 'Booked', color: 'success', icon: <SuccessIcon sx={{ fontSize: 14 }} /> };
            case BookingStatus.Rejected:
                return { label: 'Rejected', color: 'error', icon: <ErrorIcon sx={{ fontSize: 14 }} /> };
            default:
                return { label: 'Processing', color: 'default', icon: <PendingIcon sx={{ fontSize: 14 }} /> };
        }
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
                size: 80,
                Cell: ({ cell }: any) => (
                    <Typography sx={{ color: 'text.disabled', fontWeight: 800, fontSize: '11px' }}>
                        #{cell.getValue()?.toString().slice(-4) || 'N/A'}
                    </Typography>
                )
            },
            {
                accessorKey: 'vendorName',
                header: 'Vendor / Service',
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
                        <Box>
                            <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>{row.original.vendorName}</Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700 }}>{row.original.serviceName}</Typography>
                        </Box>
                    </Box>
                )
            },
            {
                accessorKey: 'eventDate',
                header: 'Booking Date',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontWeight: 500, fontSize: '13px', color: 'text.secondary' }}>
                        {cell.getValue() ? new Date(cell.getValue()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                    </Typography>
                )
            },
            {
                accessorKey: 'location',
                header: 'Location',
                Cell: ({ cell }: any) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                        <LocationIcon sx={{ fontSize: 16 }} />
                        <Typography sx={{ fontWeight: 500, fontSize: '13px' }}>{cell.getValue()}</Typography>
                    </Box>
                )
            },
            {
                accessorKey: 'totalAmount',
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
                                bgcolor: alpha((theme.palette as any)[config.color]?.main || theme.palette.grey[500], 0.1),
                                color: (theme.palette as any)[config.color]?.main || theme.palette.grey[700],
                            }}
                        />
                    );
                }
            }
        ],
        [theme]
    );

    const table = useMaterialReactTable({
        columns,
        data: bookings,
        state: { isLoading },
        enableColumnActions: false,
        enableColumnFilters: true,
        enableSorting: true,
        enablePagination: true,
        enableGlobalFilter: true,
        muiTablePaperProps: {
            elevation: 0,
            sx: { borderRadius: '12px', border: 'none', overflow: 'hidden' },
        },
        renderEmptyRowsFallback: () => (
            <Box sx={{ p: 10, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.secondary', mb: 1 }}>No results found</Typography>
                <Typography variant="body2" sx={{ color: 'text.disabled', fontWeight: 600 }}>Try adjusting your filters or search query</Typography>
            </Box>
        ),
    });

    if (isLoading) return <Loader fullScreen message="Fetching your bookings..." />;

    return (
        <Box sx={{ p: 0, maxWidth: 1600, margin: '0 auto', minHeight: '100vh' }}>
            <Box sx={{ py: 2 }}>
                <DashboardCard sx={{ p: 0, overflow: 'hidden', border: `1px solid ${alpha(theme.palette.divider, 0.1)}`, borderRadius: '12px' }}>
                    <TableHeaderToolbar 
                        title="Bookings & Events"
                        table={table} 
                        ExcelData={{
                            data: bookings,
                            fileName: 'Bookings_Export'
                        }}
                    />
                    <TableComponent table={table} />
                    <TableBottomToolbar table={table} />
                </DashboardCard>
            </Box>
        </Box>
    );
};

export default BookingDashboard;
