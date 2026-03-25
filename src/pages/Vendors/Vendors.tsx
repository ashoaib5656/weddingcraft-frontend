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
    FilterList as FilterIcon,
    MoreVert as MoreVertIcon,
    Store as StoreIcon
} from '@mui/icons-material';
import { useMaterialReactTable } from 'material-react-table';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';
import TableComponent from '../../components/TableComponent/TableComponent';
import { TableBottomToolbar, TableHeaderToolbar } from '../../components/TableComponent/TableProps';

// Mock data for vendors
const mockVendors = [
    { id: 'V001', name: 'Royal Banquet Hall', category: 'Venue', contact: 'Manoj Kumar', rating: 4.8, status: 'Active', location: 'Mumbai' },
    { id: 'V002', name: 'Capture Moments', category: 'Photography', contact: 'Anita Roy', rating: 4.9, status: 'Active', location: 'Delhi' },
    { id: 'V003', name: 'Floral Dreams', category: 'Decoration', contact: 'Suresh Raina', rating: 4.5, status: 'On Hold', location: 'Bangalore' },
    { id: 'V004', name: 'Gourmet Treats', category: 'Catering', contact: 'Chef Rahul', rating: 4.7, status: 'Active', location: 'Pune' },
    { id: 'V005', name: 'Elite Sounds', category: 'Music/DJ', contact: 'DJ Sunny', rating: 4.6, status: 'Under Review', location: 'Mumbai' },
];

const VendorsPage = () => {
    const theme = useTheme();

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active': return 'success';
            case 'on hold': return 'warning';
            case 'under review': return 'info';
            default: return 'default';
        }
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Vendor Details',
                Cell: ({ row }: any) => {
                    const vendor = row.original;
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.1), color: theme.palette.secondary.main }}>
                                <StoreIcon fontSize="small" />
                            </Avatar>
                            <Box>
                                <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{vendor.name}</Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>ID: {vendor.id} • {vendor.contact}</Typography>
                            </Box>
                        </Box>
                    );
                }
            },
            {
                accessorKey: 'category',
                header: 'Category',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600 }}>{cell.getValue()}</Typography>
                )
            },
            {
                accessorKey: 'location',
                header: 'Location',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600 }}>{cell.getValue()}</Typography>
                )
            },
            {
                accessorKey: 'rating',
                header: 'Rating',
                Cell: ({ cell }: any) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography sx={{ fontSize: '0.9rem', fontWeight: 800, color: 'warning.main' }}>
                            {cell.getValue()}
                        </Typography>
                        <Typography sx={{ fontSize: '0.8rem', color: 'warning.main' }}>★</Typography>
                    </Box>
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
        data: mockVendors,
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
                Vendor Management
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
                            data: mockVendors,
                            fileName: 'Vendors_Export'
                        }}
                        actionButton={
                            <Box sx={{ display: 'flex', gap: 1.5 }}>
                                <Button 
                                    startIcon={<FilterIcon />} 
                                    variant="outlined" 
                                    size="small" 
                                    sx={{ 
                                        borderRadius: '10px',
                                        height: '32px',
                                        textTransform: 'none',
                                        fontWeight: 700
                                    }}
                                >
                                    Filter
                                </Button>
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
                                    Add Vendor
                                </Button>
                            </Box>
                        }
                    />
                </Box>

                <TableComponent table={table} />
                <TableBottomToolbar table={table} />
            </DashboardCard>
        </Box>
    );
};

export default VendorsPage;
