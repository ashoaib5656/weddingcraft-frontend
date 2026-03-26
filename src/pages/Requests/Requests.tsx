import { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Button,
    alpha,
    useTheme,
    Tabs,
    Tab
} from '@mui/material';
import {
    MoreVert as MoreIcon
} from '@mui/icons-material';
import { useMaterialReactTable } from 'material-react-table';
import { useAuth } from '../../contexts/Auth/useAuth';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';
import TableComponent from '../../components/TableComponent/TableComponent';
import { TableBottomToolbar, TableHeaderToolbar } from '../../components/TableComponent/TableProps';

// Mock data for requests
const mockRequests = [
    { id: 'RQ-101', subject: 'Wedding Venue Inquiry', sender: 'Priya Sharma', category: 'Venue', date: '2024-12-20', status: 'Pending', type: 'Inquiry' },
    { id: 'RQ-102', subject: 'Photography Package', sender: 'Rahul Varma', category: 'Photography', date: '2024-12-21', status: 'In Discussion', type: 'Inquiry' },
    { id: 'RQ-103', subject: 'Custom Floral Decor', sender: 'Anita Roy', category: 'Decoration', date: '2024-12-22', status: 'Accepted', type: 'Booking' },
    { id: 'RQ-104', subject: 'Catering for 200 Guests', sender: 'Suresh Raina', category: 'Catering', date: '2024-12-23', status: 'Pending', type: 'Inquiry' },
    { id: 'RQ-105', subject: 'DJ & Sound Setup', sender: 'Vikram Singh', category: 'Music', date: '2024-12-24', status: 'Rejected', type: 'Booking' },
];

const RequestsPage = () => {
    const theme = useTheme();
    const { role } = useAuth();
    const [tabValue, setTabValue] = useState(0);

    const currentRole = role?.toLowerCase() || 'client';

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'warning';
            case 'in discussion': return 'info';
            case 'accepted': return 'success';
            case 'rejected': return 'error';
            default: return 'default';
        }
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Request ID',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontSize: '11px', color: 'text.secondary', fontWeight: 600 }}>{cell.getValue() as string}</Typography>
                )
            },
            {
                accessorKey: 'subject',
                header: 'Subject',
                Cell: ({ row }: any) => {
                    const request = row.original;
                    return (
                        <Box>
                            <Typography sx={{ fontSize: '13px', fontWeight: 700, color: 'text.primary' }}>{request.subject}</Typography>
                        </Box>
                    );
                }
            },
            {
                id: 'categoryOrSender',
                accessorFn: (row: any) => currentRole === 'client' ? row.category : row.sender,
                header: currentRole === 'client' ? 'Category' : 'Client Name',
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
                accessorKey: 'type',
                header: 'Type',
                Cell: ({ cell }: any) => (
                    <Typography
                        sx={{
                            fontWeight: 900,
                            color: 'primary.main',
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
                        <IconButton size="small">
                            <MoreIcon fontSize="small" />
                        </IconButton>
                    </Box>
                )
            }
        ],
        [currentRole]
    );

    const filteredRequests = useMemo(() => {
        if (tabValue === 1) return mockRequests.filter(r => r.type === 'Inquiry');
        if (tabValue === 2) return mockRequests.filter(r => r.type === 'Booking');
        return mockRequests;
    }, [tabValue]);

    const table = useMaterialReactTable({
        muiTopToolbarProps: { sx: { p: '14px' } },
        columns,
        data: filteredRequests,
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
                Requests Management
            </Typography>
            <DashboardCard sx={{ mt: 3, p: 0, overflow: 'hidden' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2, pt: 1, bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
                    <Tabs
                        value={tabValue}
                        onChange={(_, newValue) => setTabValue(newValue)}
                        sx={{
                            '& .MuiTab-root': { fontWeight: 700, textTransform: 'none', fontSize: '0.95rem' }
                        }}
                    >
                        <Tab label="All Requests" />
                        <Tab label="Inquiries" />
                        <Tab label="Bookings" />
                    </Tabs>
                </Box>

                <Box sx={{ p: '14px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'wrap', gap: 2, borderBottom: `1px solid ${theme.dashboard?.glassBorder || alpha(theme.palette.divider, 0.1)}` }}>
                    <TableHeaderToolbar 
                        table={table} 
                        isSmall 
                        ExcelData={{
                            data: mockRequests,
                            fileName: 'Requests_Export'
                        }}
                        actionButton={
                            currentRole === 'client' && (
                                <Button 
                                    variant="contained" 
                                    size="small" 
                                    sx={{ 
                                        borderRadius: '10px',
                                        textTransform: 'none',
                                        fontWeight: 700,
                                        px: 2
                                    }}
                                >
                                    New Request
                                </Button>
                            )
                        }
                    />
                </Box>

                <TableComponent table={table} />
                <TableBottomToolbar table={table} />
            </DashboardCard>
        </Box>
    );
};

export default RequestsPage;
