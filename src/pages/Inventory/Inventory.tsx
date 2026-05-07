import { useMemo, useState, useEffect } from 'react';
import {
    Box,
    Typography,
    IconButton,
    useTheme,
    alpha
} from '@mui/material';
import {
    MoreVert as MoreIcon,
    FilterList as FilterIcon,
    Add as AddIcon,
    Inventory as InventoryIcon
} from '@mui/icons-material';
import { useMaterialReactTable } from 'material-react-table';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';
import TableComponent from '../../components/TableComponent/TableComponent';
import { TableBottomToolbar, TableHeaderToolbar } from '../../components/TableComponent/TableProps';
import INVENTORY_SERVICE, { InventoryItem } from '../../api/services/inventory';



const InventoryPage = () => {
    const theme = useTheme();

    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await INVENTORY_SERVICE.GetAllInventoryItems();
                setInventory(response.data?.data || response.data || []);
            } catch (error) {
                console.error("Error fetching inventory", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchInventory();
    }, []);

    const getStatusColor = (status?: string) => {
        if (!status) return 'default';
        switch (status.toLowerCase()) {
            case 'available': return 'success';
            case 'low': return 'warning';
            case 'out': return 'error';
            default: return 'default';
        }
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Asset Name',
                Cell: ({ row }: any) => {
                    const item = row.original;
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{
                                p: 1,
                                borderRadius: 2,
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                color: 'primary.main',
                                display: 'flex'
                            }}>
                                <InventoryIcon fontSize="small" />
                            </Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.name}</Typography>
                        </Box>
                    );
                }
            },
            {
                accessorKey: 'category',
                header: 'Category',
                Cell: ({ cell }: any) => (
                    <Typography variant="caption" sx={{ textTransform: 'uppercase', fontWeight: 700, color: 'text.disabled' }}>
                        {cell.getValue() as string}
                    </Typography>
                )
            },
            {
                accessorKey: 'stock',
                header: 'Stock Level',
                Cell: ({ row }: any) => {
                    const item = row.original;
                    return (
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {item.stock} <Typography component="span" variant="caption" sx={{ color: 'text.secondary' }}>{item.unit}</Typography>
                        </Typography>
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
                            color: `${theme.palette[getStatusColor(cell.getValue() as any) as 'success' | 'warning' | 'error' | 'info'].main}`, 
                            textTransform: 'uppercase', 
                            fontSize: '0.65rem' 
                        }}
                    >
                        {cell.getValue() as string || 'Available'}
                    </Typography>
                )
            },
            {
                accessorKey: 'lastUpdated',
                header: 'Last Updated',
                Cell: ({ cell }: any) => (
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{cell.getValue() as string || 'N/A'}</Typography>
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

    const [globalFilter, setGlobalFilter] = useState('');
    const [showGlobalFilter, setShowGlobalFilter] = useState(false);

    const table = useMaterialReactTable({
        muiTopToolbarProps: { sx: { p: '14px' } },
        columns,
        data: inventory,
        state: {
            isLoading,
            globalFilter,
            showGlobalFilter,
        },
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
            <Typography 
                variant="h4" 
                sx={{ 
                    mb: 2, 
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                }}
            >
                Inventory Management
            </Typography>
            <DashboardCard sx={{ mt: 3, p: 0, overflow: 'hidden' }}>
                <Box sx={{ p: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, borderBottom: `1px solid ${theme.dashboard?.glassBorder || alpha(theme.palette.divider, 0.1)}` }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', borderRadius: 2 }}>
                            <FilterIcon />
                        </IconButton>
                        <IconButton sx={{ bgcolor: 'secondary.main', color: 'white', borderRadius: 2, '&:hover': { bgcolor: 'secondary.dark' } }}>
                            <AddIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <TableHeaderToolbar 
                            table={table} 
                            isSmall 
                            ExcelData={{
                                data: inventory,
                                fileName: 'Inventory_Export'
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

export default InventoryPage;
