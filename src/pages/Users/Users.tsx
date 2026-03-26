import { useMemo } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Button,
    useTheme,
    alpha
} from '@mui/material';
import {
    MoreVert as MoreIcon
} from '@mui/icons-material';
import { useMaterialReactTable } from 'material-react-table';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';
import TableComponent from '../../components/TableComponent/TableComponent';
import { TableBottomToolbar, TableHeaderToolbar } from '../../components/TableComponent/TableProps';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Manager' | 'Staff' | 'Vendor' | 'Client';
    status: 'active' | 'pending' | 'suspended';
    lastSeen: string;
}

const mockUsers: User[] = [
    { id: '1', name: 'Kabir Verma', email: 'kabir@wedspot.com', role: 'Admin', status: 'active', lastSeen: 'Just now' },
    { id: '2', name: 'Ananya Sharma', email: 'ananya@wedspot.com', role: 'Manager', status: 'active', lastSeen: '2 hours ago' },
    { id: '3', name: 'Rahul Gupta', email: 'rahul@vendor.com', role: 'Vendor', status: 'pending', lastSeen: 'Yesterday' },
    { id: '4', name: 'Sneha Reddy', email: 'sneha@client.com', role: 'Client', status: 'active', lastSeen: '5 hours ago' },
    { id: '5', name: 'Vikram Singh', email: 'vikram@wedspot.com', role: 'Staff', status: 'suspended', lastSeen: '3 days ago' },
];

const UsersPage = () => {
    const theme = useTheme();

    const getStatusColor = (status: User['status']) => {
        switch (status) {
            case 'active': return 'success';
            case 'pending': return 'warning';
            case 'suspended': return 'error';
            default: return 'default';
        }
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'User Profile',
                Cell: ({ row }: any) => {
                    const user = row.original;
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box>
                                <Typography sx={{ fontSize: '13px', fontWeight: 800, color: 'text.primary' }}>{user.name}</Typography>
                            </Box>
                        </Box>
                    );
                }
            },
            {
                accessorKey: 'email',
                header: 'Email',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontSize: '12px', color: 'text.secondary', fontWeight: 500 }}>
                        {cell.getValue() as string}
                    </Typography>
                )
            },
            {
                accessorKey: 'role',
                header: 'Role',
                muiTableHeadCellProps: { align: 'center' as const },
                muiTableBodyCellProps: { align: 'center' as const },
                Cell: ({ cell }: any) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                        <Typography sx={{ fontSize: '12px', fontWeight: 600, color: 'text.primary' }}>{cell.getValue() as string}</Typography>
                    </Box>
                )
            },
            {
                accessorKey: 'status',
                header: 'Status',
                muiTableHeadCellProps: { align: 'center' as const },
                muiTableBodyCellProps: { align: 'center' as const },
                Cell: ({ cell }: any) => {
                    const status = cell.getValue() as string;
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'center' }}>
                            <Typography 
                                sx={{ 
                                    fontWeight: 900, 
                                    color: `${theme.palette[getStatusColor(status as any) as 'success' | 'warning' | 'error' | 'info'].main}`, 
                                    fontSize: '10px',
                                    textTransform: 'uppercase', 
                                    letterSpacing: '0.05em'
                                }}
                            >
                                {status}
                            </Typography>
                        </Box>
                    );
                }
            },
            {
                accessorKey: 'lastSeen',
                header: 'Recent Activity',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontSize: '11px', color: 'text.secondary', fontWeight: 500 }}>{cell.getValue() as string}</Typography>
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
        data: mockUsers,
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
                User Management
            </Typography>

            <DashboardCard sx={{ mt: 3, p: 0, overflow: 'hidden' }}>
                <Box sx={{ 
                    p: '14px', 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    alignItems: 'center', 
                    flexWrap: 'wrap', 
                    gap: 2, 
                    borderBottom: `1px solid ${theme.dashboard?.glassBorder || alpha(theme.palette.divider, 0.1)}` 
                }}>
                    <TableHeaderToolbar 
                        table={table} 
                        isSmall 
                        ExcelData={{
                            data: mockUsers,
                            fileName: 'Users_Export'
                        }}
                        actionButton={
                            <Button 
                                variant="contained" 
                                size="small" 
                                sx={{ 
                                    borderRadius: '10px', 
                                    bgcolor: theme.palette.primary.main,
                                    height: '32px',
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    px: 2
                                }}
                            >
                                Add
                            </Button>
                        }
                    />
                </Box>

                <TableComponent table={table} />
                <TableBottomToolbar table={table} />
            </DashboardCard>
        </Box>
    );
};

export default UsersPage;
