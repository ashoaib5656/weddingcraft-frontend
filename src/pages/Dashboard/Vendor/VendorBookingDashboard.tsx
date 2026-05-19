import React, { useState, useMemo, useEffect } from 'react';
import {
    Box,
    Typography,
    Container,
    alpha,
    useTheme,
    Chip,
    IconButton,
    Tooltip,
} from '@mui/material';
import {
    CheckCircle as ApproveIcon,
    Cancel as RejectIcon,
    AutoFixHigh as ModificationIcon,
    Person as PersonIcon,
} from '@mui/icons-material';
import { useMaterialReactTable } from 'material-react-table';
import DashboardCard from '../../../components/Dashboard/DashboardCard/DashboardCard';
import TableComponent from '../../../components/TableComponent/TableComponent';
import { TableBottomToolbar, TableHeaderToolbar } from '../../../components/TableComponent/TableProps';
import BOOKING_SERVICE from '../../../api/services/bookings';
import { BookingStatus } from '../../../Types/booking';
import type { Booking } from '../../../Types/booking';
import { useSnackbar } from '../../../contexts/SnackbarContext';
import Loader from '../../../components/Common/Loader';

const VendorBookingDashboard: React.FC = () => {
    const theme = useTheme();
    const { success, error: showError } = useSnackbar();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            const response = await BOOKING_SERVICE.getVendorBookings();
            const data = response.data?.data || [];
            setBookings(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch vendor bookings:", err);
            setBookings([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleAction = async (id: number, type: 'Approve' | 'Reject' | 'Modification') => {
        try {
            if (type === 'Approve') {
                await BOOKING_SERVICE.approveBooking(id);
                success('Booking approved!');
            } else if (type === 'Reject') {
                await BOOKING_SERVICE.rejectBooking(id);
                success('Booking rejected.');
            } else {
                await BOOKING_SERVICE.requestModification(id);
                success('Modification request sent!');
            }
            fetchBookings();
        } catch (err) {
            showError('Failed to process action.');
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
                accessorKey: 'customerName',
                header: 'Customer',
                size: 200,
                Cell: ({ row }: any) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ 
                            width: 32, height: 32, borderRadius: '10px', 
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'primary.main'
                        }}>
                            <PersonIcon sx={{ fontSize: 18 }} />
                        </Box>
                        <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>{row.original.customerName}</Typography>
                    </Box>
                )
            },
            {
                accessorKey: 'serviceName',
                header: 'Service Requested',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontWeight: 600, fontSize: '13px' }}>{cell.getValue()}</Typography>
                )
            },
            {
                accessorKey: 'eventDate',
                header: 'Event Date',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontWeight: 500, fontSize: '13px', color: 'text.secondary' }}>
                        {cell.getValue() ? new Date(cell.getValue()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                    </Typography>
                )
            },
            {
                accessorKey: 'guestCount',
                header: 'Guests',
                size: 100,
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontWeight: 700, fontSize: '13px' }}>{cell.getValue()}</Typography>
                )
            },
            {
                accessorKey: 'status',
                header: 'Status',
                Cell: ({ cell }: any) => {
                    const status = cell.getValue();
                    return (
                        <Chip 
                            label={BookingStatus[status] || 'Pending'}
                            size="small"
                            sx={{ 
                                fontWeight: 800, 
                                fontSize: '10px', 
                                height: 24,
                                borderRadius: '8px',
                                textTransform: 'uppercase',
                                bgcolor: alpha(status === BookingStatus.Booked ? theme.palette.success.main : theme.palette.primary.main, 0.1),
                                color: status === BookingStatus.Booked ? theme.palette.success.main : theme.palette.primary.main,
                            }}
                        />
                    );
                }
            },
            {
                id: 'actions',
                header: 'Actions',
                size: 150,
                Cell: ({ row }: any) => (
                    row.original.status === BookingStatus.Pending ? (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Tooltip title="Approve">
                                <IconButton 
                                    size="small" 
                                    color="success" 
                                    onClick={() => handleAction(row.original.id, 'Approve')}
                                    sx={{ bgcolor: alpha(theme.palette.success.main, 0.05) }}
                                >
                                    <ApproveIcon sx={{ fontSize: 18 }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Modify">
                                <IconButton 
                                    size="small" 
                                    color="info" 
                                    onClick={() => handleAction(row.original.id, 'Modification')}
                                    sx={{ bgcolor: alpha(theme.palette.info.main, 0.05) }}
                                >
                                    <ModificationIcon sx={{ fontSize: 18 }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Reject">
                                <IconButton 
                                    size="small" 
                                    color="error" 
                                    onClick={() => handleAction(row.original.id, 'Reject')}
                                    sx={{ bgcolor: alpha(theme.palette.error.main, 0.05) }}
                                >
                                    <RejectIcon sx={{ fontSize: 18 }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    ) : null
                )
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

    if (isLoading) return <Loader fullScreen message="Loading requests..." />;

    return (
        <Box sx={{ p: 0, maxWidth: 1600, margin: '0 auto', minHeight: '100vh' }}>
            <Box sx={{ py: 2 }}>
                <DashboardCard sx={{ p: 0, overflow: 'hidden', border: `1px solid ${alpha(theme.palette.divider, 0.1)}`, borderRadius: '12px' }}>
                    <TableHeaderToolbar 
                        title="Booking Requests"
                        table={table} 
                        ExcelData={{
                            data: bookings,
                            fileName: 'Vendor_Bookings_Export'
                        }}
                    />
                    <TableComponent table={table} />
                    <TableBottomToolbar table={table} />
                </DashboardCard>
            </Box>
        </Box>
    );
};

export default VendorBookingDashboard;
