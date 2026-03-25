import { useMemo } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Button,
    Avatar,
    alpha,
    useTheme
} from '@mui/material';
import {
    MoreVert as MoreVertIcon,
    Email as EmailIcon,
    Phone as PhoneIcon
} from '@mui/icons-material';
import { useMaterialReactTable } from 'material-react-table';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';
import TableComponent from '../../components/TableComponent/TableComponent';
import { TableBottomToolbar, TableHeaderToolbar } from '../../components/TableComponent/TableProps';

// Mock data for staff
const mockStaff = [
    { id: 'S001', name: 'Alia Bhatt', role: 'Wedding Coordinator', status: 'Available', email: 'alia@coordinator.com', phone: '+91 99999 00010' },
    { id: 'S002', name: 'Ranbir Kapoor', role: 'Support Specialist', status: 'Busy', email: 'ranbir@support.com', phone: '+91 99999 00011' },
    { id: 'S003', name: 'Katrina Kaif', role: 'Venue Liaison', status: 'On Leave', email: 'katrina@liaison.com', phone: '+91 99999 00012' },
    { id: 'S004', name: 'Vicky Kaushal', role: 'Vendor Relations', status: 'Available', email: 'vicky@relations.com', phone: '+91 99999 00013' },
];

const Staff = () => {
    const theme = useTheme();

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'available': return 'success';
            case 'busy': return 'error';
            case 'on leave': return 'warning';
            default: return 'default';
        }
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Staff Name',
                Cell: ({ row }: any) => {
                    const member = row.original;
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.1), color: theme.palette.secondary.main, fontWeight: 700 }}>
                                {member.name.charAt(0)}
                            </Avatar>
                            <Box>
                                <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{member.name}</Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>ID: {member.id}</Typography>
                            </Box>
                        </Box>
                    );
                }
            },
            {
                accessorKey: 'role',
                header: 'Role',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600 }}>{cell.getValue() as string}</Typography>
                )
            },
            {
                id: 'contact',
                header: 'Contact Info',
                accessorFn: (row: any) => `${row.email} ${row.phone}`,
                Cell: ({ row }: any) => {
                    const member = row.original;
                    return (
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <EmailIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                                <Typography variant="caption" sx={{ fontWeight: 600 }}>{member.email}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PhoneIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                                <Typography variant="caption" sx={{ fontWeight: 600 }}>{member.phone}</Typography>
                            </Box>
                        </Box>
                    );
                }
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
                        <IconButton size="small">
                            <MoreVertIcon fontSize="small" />
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
        data: mockStaff,
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
                Staff Management
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
                            data: mockStaff,
                            fileName: 'Staff_Export'
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
                                Add Staff Member
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

export default Staff;
