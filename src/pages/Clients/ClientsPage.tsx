import { useMemo, useState } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Avatar,
    alpha,
    useTheme,
    Button
} from '@mui/material';
import {
    Phone as PhoneIcon,
    Email as EmailIcon,
    MoreVert as MoreVertIcon
} from '@mui/icons-material';
import { useMaterialReactTable } from 'material-react-table';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';
import TableComponent from '../../components/TableComponent/TableComponent';
import { TableBottomToolbar, TableHeaderToolbar } from '../../components/TableComponent/TableProps';

// Mock data for clients
const mockClients = [
    { id: 'C001', name: 'Amitabh Bachchan', email: 'amitabh@legend.com', phone: '+91 99999 00001', activity: 'Viewed Venue "Royal Palace"', status: 'Active' },
    { id: 'C002', name: 'Shah Rukh Khan', email: 'srk@king.com', phone: '+91 99999 00002', activity: 'Booked Photographer "Capture Moments"', status: 'Active' },
    { id: 'C003', name: 'Deepika Padukone', email: 'deepika@star.com', phone: '+91 99999 00003', activity: 'Inquired about "Floral Dreams"', status: 'New' },
    { id: 'C004', name: 'Ranbir Kapoor', email: 'ranbir@actor.com', phone: '+91 99999 00004', activity: 'Updated Profile', status: 'Inactive' },
];

const ClientsPage = () => {
    const theme = useTheme();

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Client Name',
                Cell: ({ row }: any) => {
                    const client = row.original;
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.1), color: 'secondary.main', fontWeight: 700 }}>
                                {client.name.charAt(0)}
                            </Avatar>
                            <Box>
                                <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{client.name}</Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>ID: {client.id}</Typography>
                            </Box>
                        </Box>
                    );
                }
            },
            {
                id: 'contact',
                accessorFn: (row: any) => `${row.email} ${row.phone}`,
                header: 'Contact Info',
                Cell: ({ row }: any) => {
                    const client = row.original;
                    return (
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <EmailIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                                <Typography variant="caption" sx={{ fontWeight: 600 }}>{client.email}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PhoneIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                                <Typography variant="caption" sx={{ fontWeight: 600 }}>{client.phone}</Typography>
                            </Box>
                        </Box>
                    );
                }
            },
            {
                accessorKey: 'activity',
                header: 'Recent Activity',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'text.secondary' }}>{cell.getValue() as string}</Typography>
                )
            },
            {
                accessorKey: 'status',
                header: 'Status',
                Cell: ({ cell }: any) => {
                    const status = cell.getValue() as string;
                    return (
                        <Typography
                            variant="caption"
                            sx={{
                                fontWeight: 900,
                                color: status === 'Active' ? 'success.main' : status === 'New' ? 'info.main' : 'text.disabled',
                                textTransform: 'uppercase',
                                fontSize: '0.65rem'
                            }}
                        >
                            {status}
                        </Typography>
                    );
                }
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
                            <MoreVertIcon fontSize="small" />
                        </IconButton>
                    </Box>
                )
            }
        ],
        [theme]
    );

    const [globalFilter, setGlobalFilter] = useState('');
    const [showGlobalFilter, setShowGlobalFilter] = useState(false);

    const table = useMaterialReactTable({
        muiTopToolbarProps: { sx: { p: '14px' } },
        columns,
        data: mockClients,
        enableColumnActions: false,
        enableColumnFilters: true,
        enableSorting: true,
        enablePagination: true,
        enableRowSelection: true,
        enableGlobalFilter: true,
        onGlobalFilterChange: setGlobalFilter,
        onShowGlobalFilterChange: setShowGlobalFilter,
        initialState: {
            pagination: { pageSize: 10, pageIndex: 0 },
        },
        state: {
            globalFilter,
            showGlobalFilter,
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
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>Client Management</Typography>
            <DashboardCard sx={{ mt: 3, p: 0, overflow: 'hidden' }}>
                <Box sx={{ p: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, borderBottom: `1px solid ${theme.dashboard?.glassBorder || alpha(theme.palette.divider, 0.1)}` }}>
                    <Button variant="contained" size="small" sx={{ borderRadius: '10px' }}>Add New Client</Button>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <TableHeaderToolbar 
                            table={table} 
                            isSmall 
                            ExcelData={{
                                data: mockClients,
                                fileName: 'Clients_Export'
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

export default ClientsPage;
