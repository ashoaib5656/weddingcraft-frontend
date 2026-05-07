import { useMemo, useState, useEffect } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Button,
    alpha,
    useTheme,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import {
    MoreVert as MoreVertIcon,
    Phone as PhoneIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Add as AddIcon,
    Visibility as ViewIcon
} from '@mui/icons-material';
import { useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';
import TableComponent from '../../components/TableComponent/TableComponent';
import { TableBottomToolbar, TableHeaderToolbar } from '../../components/TableComponent/TableProps';
import { useNavigate } from 'react-router-dom';
import USER_SERVICE, { type User } from '../../api/services/users';

const Users = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                const response = await USER_SERVICE.GetAllUsers();
                if (response.data.success) {
                    setUsers(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);


    const columns = useMemo<MRT_ColumnDef<User>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'Name',
                size: 180,
                Cell: ({ row }) => (
                    <Typography sx={{ fontWeight: 600, fontSize: '13px', color: 'text.primary' }}>
                        {row.original.name || 'N/A'}
                    </Typography>
                )
            },
            {
                accessorKey: 'email',
                header: 'Email',
                size: 200,
                Cell: ({ cell }) => (
                    <Typography sx={{ fontWeight: 600, fontSize: '12px', color: 'text.secondary' }}>
                        {cell.getValue() as string}
                    </Typography>
                )
            },
            {
                accessorKey: 'role',
                header: 'Role',
                size: 120,
                Cell: ({ cell }) => (
                    <Typography sx={{ fontWeight: 700, fontSize: '12px', color: 'text.secondary', textTransform: 'uppercase' }}>
                        {cell.getValue() as string}
                    </Typography>
                )
            },
            {
                accessorKey: 'phoneNumber',
                header: 'Contact',
                size: 180,
                Cell: ({ cell }) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                        <PhoneIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography sx={{ fontWeight: 500, fontSize: '13px', color: 'text.primary' }}>
                            {(cell.getValue() as string) || 'Not Provided'}
                        </Typography>
                    </Box>
                )
            },
            {
                accessorKey: 'status',
                header: 'Status',
                size: 140,
                Cell: ({ cell }) => {
                    const status = (cell.getValue() as string) || 'Active';
                    const isActive = status.toLowerCase() === 'active';
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography sx={{ fontWeight: 800, fontSize: '12px', color: isActive ? 'success.main' : 'error.main' }}>
                                {status}
                            </Typography>
                        </Box>
                    );
                }
            },
            {
                accessorKey: 'updatedBy',
                header: 'Modified By',
                size: 150,
                Cell: ({ cell }) => (
                    <Typography sx={{ fontWeight: 600, fontSize: '12px', color: 'text.secondary' }}>
                        {(cell.getValue() as string) || 'Admin'}
                    </Typography>
                )
            },
            {
                accessorKey: 'createdAt',
                header: 'Modified On',
                size: 150,
                Cell: ({ row }) => (
                    <Typography sx={{ fontWeight: 600, fontSize: '12px', color: 'text.secondary' }}>
                        {row.original.createdAt ? new Date(row.original.createdAt).toLocaleDateString() : 'N/A'}
                    </Typography>
                )
            },
            {
                id: 'actions',
                header: 'Actions',
                size: 80,
                muiTableHeadCellProps: { align: 'right' as const },
                muiTableBodyCellProps: { align: 'right' as const },
                Cell: () => {
                    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
                    const open = Boolean(anchorEl);
                    
                    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
                        setAnchorEl(event.currentTarget);
                    };
                    const handleClose = () => {
                        setAnchorEl(null);
                    };

                    return (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton 
                                size="small" 
                                onClick={handleClick}
                                sx={{ 
                                    bgcolor: open ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                                    color: open ? 'primary.main' : 'text.secondary'
                                }}
                            >
                                <MoreVertIcon sx={{ fontSize: 20 }} />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                                        mt: 1,
                                        borderRadius: '10px',
                                        minWidth: 140,
                                        '& .MuiMenuItem-root': {
                                            px: 1.5,
                                            py: 0.6,
                                            borderRadius: '6px',
                                            mx: 0.8,
                                            my: 0.2,
                                            fontSize: '12px',
                                            fontWeight: 600,
                                            gap: 1,
                                            '&:hover': {
                                                bgcolor: alpha(theme.palette.primary.main, 0.05),
                                                color: 'primary.main',
                                                '& .MuiListItemIcon-root': {
                                                    color: 'primary.main',
                                                }
                                            }
                                        }
                                    },
                                }}
                            >
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon sx={{ minWidth: 'auto !important' }}>
                                        <ViewIcon sx={{ fontSize: 16 }} />
                                    </ListItemIcon>
                                    <ListItemText primaryTypographyProps={{ fontSize: '12px', fontWeight: 600 }}>View Details</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon sx={{ minWidth: 'auto !important' }}>
                                        <EditIcon sx={{ fontSize: 16 }} />
                                    </ListItemIcon>
                                    <ListItemText primaryTypographyProps={{ fontSize: '12px', fontWeight: 600 }}>Edit User</ListItemText>
                                </MenuItem>
                                <MenuItem 
                                    onClick={handleClose}
                                    sx={{ 
                                        '&:hover': { 
                                            bgcolor: `${alpha(theme.palette.error.main, 0.05)} !important`,
                                            color: 'error.main !important',
                                            '& .MuiListItemIcon-root': { color: 'error.main' }
                                        } 
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 'auto !important' }}>
                                        <DeleteIcon sx={{ fontSize: 16 }} />
                                    </ListItemIcon>
                                    <ListItemText primaryTypographyProps={{ fontSize: '12px', fontWeight: 600 }}>Delete</ListItemText>
                                </MenuItem>
                            </Menu>
                        </Box>
                    );
                }
            }
        ],
        [theme]
    );

    const table = useMaterialReactTable({
        columns,
        data: users,
        state: { isLoading },
        enableColumnActions: false,
        enableColumnFilters: false,
        enablePagination: true,
        enableGlobalFilter: true,
        muiTablePaperProps: {
            elevation: 0,
            sx: { borderRadius: '12px', border: 'none', overflow: 'hidden' },
        },
    });

    return (
        <Box sx={{ p: 0, maxWidth: 1600, margin: '0 auto' }}>
            <DashboardCard sx={{ p: 0, overflow: 'hidden', border: `1px solid ${alpha(theme.palette.divider, 0.1)}`, borderRadius: '12px' }}>
                <TableHeaderToolbar 
                    title="User Management"
                    table={table} 
                    ExcelData={{
                        data: users,
                        fileName: 'Users_Export'
                    }}
                    actionButton={
                        <Button 
                            variant="contained" 
                            startIcon={<AddIcon />}
                            onClick={() => navigate('/admin/users/add')}
                            sx={{ borderRadius: '10px', fontWeight: 800, px: 2, py: 0.8, textTransform: 'none', boxShadow: 'none' }}
                        >
                            Create User
                        </Button>
                    }
                />
                <TableComponent table={table} />
                <TableBottomToolbar table={table} />
            </DashboardCard>
        </Box>
    );
};

export default Users;
