import { useMemo, useState, useEffect } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Button,
    alpha,
    useTheme,
    Avatar,
    Chip
} from '@mui/material';
import {
    MoreVert as MoreVertIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Add as AddIcon,
    Work as WorkIcon,
    FiberManualRecord as StatusIcon
} from '@mui/icons-material';
import { useMaterialReactTable } from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';
import TableComponent from '../../components/TableComponent/TableComponent';
import { TableBottomToolbar, TableHeaderToolbar } from '../../components/TableComponent/TableProps';
import USER_SERVICE, { type User } from '../../api/services/users';

const Staff = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [staff, setStaff] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const response = await USER_SERVICE.GetAllUsers();
                const allUsers = response.data.data || [];
                setStaff(allUsers.filter((u: User) => u.role === 'Staff'));
            } catch (error) {
                console.error("Error fetching staff", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStaff();
    }, []);

    const getStatusConfig = (status?: string) => {
        const s = status?.toLowerCase() || 'available';
        switch (s) {
            case 'available': return { color: 'success', label: 'Available' };
            case 'busy': return { color: 'error', label: 'Busy' };
            case 'on leave': return { color: 'warning', label: 'On Leave' };
            default: return { color: 'success', label: 'Available' };
        }
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Staff ID',
                size: 100,
                Cell: ({ cell }: any) => {
                    const id = cell.getValue();
                    return (
                        <Typography sx={{ fontWeight: 800, fontSize: '11px', color: 'text.disabled' }}>
                            #{id ? id.slice(-4).toUpperCase() : 'N/A'}
                        </Typography>
                    );
                }
            },
            {
                accessorKey: 'name',
                header: 'Team Member',
                size: 250,
                Cell: ({ row }: any) => {
                    const member = row.original;
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar 
                                src={`https://ui-avatars.com/api/?name=${member.name || 'S'}&background=random`} 
                                sx={{ width: 40, height: 40, borderRadius: '12px', border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}` }} 
                            />
                            <Box sx={{ textAlign: 'left' }}>
                                <Typography sx={{ fontWeight: 800, fontSize: '14px', color: 'text.primary' }}>{member.name}</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <EmailIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
                                    <Typography sx={{ fontWeight: 600, fontSize: '11px', color: 'text.secondary' }}>{member.email}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    );
                }
            },
            {
                accessorKey: 'department',
                header: 'Department',
                size: 150,
                Cell: ({ cell }: any) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                        <WorkIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography sx={{ fontWeight: 700, fontSize: '13px' }}>{cell.getValue() || 'Operations'}</Typography>
                    </Box>
                )
            },
            {
                accessorKey: 'status',
                header: 'Availability',
                size: 150,
                Cell: ({ cell }: any) => {
                    const config = getStatusConfig(cell.getValue() as string);
                    return (
                        <Chip 
                            icon={<StatusIcon sx={{ fontSize: '12px !important' }} />}
                            label={config.label}
                            size="small"
                            sx={{ 
                                fontWeight: 800, 
                                fontSize: '10px', 
                                borderRadius: '8px', 
                                textTransform: 'uppercase',
                                bgcolor: alpha(theme.palette[config.color as 'success' | 'error' | 'warning'].main, 0.1),
                                color: theme.palette[config.color as 'success' | 'error' | 'warning'].main,
                                '& .MuiChip-icon': {
                                    color: 'inherit'
                                }
                            }}
                        />
                    );
                }
            },
            {
                accessorKey: 'phoneNumber',
                header: 'Contact',
                size: 180,
                Cell: ({ cell }: any) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                        <PhoneIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography sx={{ fontWeight: 700, fontSize: '13px' }}>{cell.getValue() || 'N/A'}</Typography>
                    </Box>
                )
            },
            {
                id: 'actions',
                header: 'Actions',
                size: 80,
                Cell: () => (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton size="small" sx={{ bgcolor: alpha(theme.palette.divider, 0.05) }}>
                            <MoreVertIcon sx={{ fontSize: 18 }} />
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
        columns,
        data: staff,
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
                    title="Staff Management"
                    table={table} 
                    ExcelData={{
                        data: staff,
                        fileName: 'Staff_Team_Export'
                    }}
                    actionButton={
                        <Button 
                            variant="contained" 
                            startIcon={<AddIcon />}
                            onClick={() => navigate('add')}
                            sx={{ borderRadius: '10px', fontWeight: 800, px: 2, py: 0.8, textTransform: 'none', boxShadow: 'none' }}
                        >
                            Add Staff
                        </Button>
                    }
                />
                <TableComponent table={table} />
                <TableBottomToolbar table={table} />
            </DashboardCard>
        </Box>
    );
};

export default Staff;
