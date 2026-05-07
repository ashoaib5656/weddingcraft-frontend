import React, { useMemo, useState, useEffect } from 'react';
import {
    Box,
    Typography,
    IconButton,
    alpha,
    useTheme,
    Avatar,
    Rating,
    Tooltip,
    Button,
    Container,
    Grid,
    TextField,
    InputAdornment,
    Skeleton,
    Pagination
} from '@mui/material';
import {
    MoreVert as MoreVertIcon,
    Visibility as ViewIcon,
    Star as StarIcon,
    Business as BusinessIcon,
    LocationOn as LocationIcon,
    Add as AddIcon,
    Search as SearchIcon,
    FilterList as FilterIcon,
    Verified as VerifiedIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import { useMaterialReactTable } from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';
import TableComponent from '../../components/TableComponent/TableComponent';
import { TableBottomToolbar, TableHeaderToolbar } from '../../components/TableComponent/TableProps';
import USER_SERVICE from '../../api/services/users';
import { useAuth } from '../../contexts/Auth/useAuth';
import { UserRole } from '../../Types/auth.types';
import VendorCard from '../../components/Vendors/VendorCard';
import SectorNavigation from '../../components/Vendors/SectorNavigation';
import type { VendorSector } from '../../Types/vendor';

const SECTORS: VendorSector[] = [
    { id: 'floral', name: 'Floral Decoration', icon: '🌸', description: 'Artisanal floral designs for every theme' },
    { id: 'coordination', name: 'Wedding Coordination', icon: '📋', description: 'Seamless planning and on-day execution' },
    { id: 'photography', name: 'Cinematic Photoshoot', icon: '📸', description: 'Visual storytelling at its finest' },
    { id: 'makeup', name: 'Luxury Makeup Artist', icon: '💄', description: 'Premium bridal and party beaty services' },
    { id: 'invitations', name: 'Elegant Invitations', icon: '✉️', description: 'Custom-designed stationery and invites' },
    { id: 'catering', name: 'Premium Catering', icon: '🍽️', description: 'Gourmet culinary experiences' },
];

const ITEMS_PER_PAGE = 6;

const Vendors = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { role } = useAuth();
    const isClient = role === UserRole.CLIENT;

    const [vendors, setVendors] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeSector, setActiveSector] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchVendors = async () => {
            setIsLoading(true);
            try {
                const response = await USER_SERVICE.GetAllUsers();
                const allUsers = response.data.data || response.data || [];
                const filteredVendors = allUsers.filter((u: any) => u.role === 'Vendor').map((u: any) => ({
                    ...u,
                    name: u.vendorProfile?.businessName || u.name,
                    sectorId: u.category || u.vendorProfile?.category || 'General',
                    image: u.vendorProfile?.imageUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
                    rating: 4.8,
                    reviewCount: 0,
                    location: u.location || 'Local',
                    description: u.vendorProfile?.description || 'Elite wedding services provider specializing in high-end events and luxury celebrations.',
                    services: u.products?.map((p: any) => p.name).slice(0, 3) || [u.category || u.vendorProfile?.category || 'Professional Services'],
                    reviews: [],
                    priceRange: (u.vendorProfile?.priceRange || 'Contact for pricing').replace('$', '₹')
                }));
                setVendors(filteredVendors);
            } catch (error) {
                console.error("Error fetching vendors", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchVendors();
    }, []);

    // Reset page on filter/search
    useEffect(() => {
        setPage(1);
    }, [activeSector, searchQuery]);

    // Filter Logic for Marketplace
    const filteredVendors = useMemo(() => {
        return vendors.filter((vendor: any) => {
            const matchesSector = activeSector === 'all' || vendor.sectorId === activeSector;
            const matchesSearch = (vendor.vendorProfile?.businessName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                                (vendor.vendorProfile?.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());
            return matchesSector && matchesSearch;
        });
    }, [activeSector, searchQuery, vendors]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredVendors.length / ITEMS_PER_PAGE);
    const paginatedVendors = useMemo(() => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        return filteredVendors.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredVendors, page]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setIsLoading(true);
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setIsLoading(false), 400);
    };

    // --- Admin/Manager Table Logic ---
    const columns = useMemo(
        () => [
            {
                accessorKey: 'vendorProfile.businessName',
                header: 'Business Name',
                size: 280,
                Cell: ({ row }: any) => {
                    const vendor = row.original;
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar 
                                variant="rounded"
                                src={vendor.vendorProfile?.imageUrl || `https://ui-avatars.com/api/?name=${vendor.vendorProfile?.businessName || 'V'}&background=random`}
                                sx={{ width: 48, height: 48, borderRadius: '14px', boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}` }}
                            />
                            <Box sx={{ textAlign: 'left' }}>
                                <Typography sx={{ fontWeight: 800, fontSize: '15px', color: 'text.primary' }}>
                                    {vendor.vendorProfile?.businessName || 'Unnamed Business'}
                                </Typography>
                                <Typography sx={{ fontWeight: 600, fontSize: '12px', color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <BusinessIcon sx={{ fontSize: 12 }} /> {vendor.sectorId || 'Vendor'}
                                </Typography>
                            </Box>
                        </Box>
                    );
                }
            },
            {
                accessorKey: 'location',
                header: 'Region',
                size: 150,
                Cell: ({ cell }: any) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'center' }}>
                        <LocationIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography sx={{ fontWeight: 700, fontSize: '13px' }}>{cell.getValue() || 'Global'}</Typography>
                    </Box>
                )
            },
            {
                accessorKey: 'rating',
                header: 'Performance',
                size: 180,
                Cell: ({ cell }: any) => (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                        <Rating 
                            value={cell.getValue() || 4.5} 
                            readOnly 
                            precision={0.5} 
                            size="small"
                            icon={<StarIcon sx={{ color: '#FFD700' }} fontSize="inherit" />}
                        />
                        <Typography sx={{ fontSize: '11px', fontWeight: 800, color: 'text.secondary' }}>
                            {cell.getValue() || '4.5'} RATING
                        </Typography>
                    </Box>
                )
            },
            {
                id: 'actions',
                header: 'Actions',
                size: 100,
                Cell: ({ row }: any) => (
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <Tooltip title="View Profile">
                            <IconButton 
                                size="small" 
                                onClick={() => navigate(`/customer/vendors/${row.original.id}`)}
                                sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05), color: 'primary.main' }}
                            >
                                <ViewIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                        </Tooltip>
                        <IconButton size="small">
                            <MoreVertIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                    </Box>
                )
            }
        ],
        [navigate, theme]
    );

    const table = useMaterialReactTable({
        columns,
        data: vendors,
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
    });

    if (isClient) {
        return (
            <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 10 }}>
                {/* Marketplace Header */}
                <Box sx={{ bgcolor: 'background.paper', pt: 4, pb: 2, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.05)}` }}>
                    <Container maxWidth="xl">
                        <Box sx={{ textAlign: 'left', mb: 2 }}>
                            <Typography sx={{ fontWeight: 900, fontSize: '1.5rem', mb: 0.5, letterSpacing: '-0.02em', color: 'text.primary' }}>
                                Service Marketplace
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                                Discover and collaborate with the world's most elite providers.
                            </Typography>
                        </Box>

                        <Box sx={{ 
                            display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between',
                            gap: 2, px: 2, py: 1.25, bgcolor: '#ffffff', borderRadius: '12px', border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 3 }, flexWrap: 'wrap' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <VerifiedIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                                    <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.primary' }}>{vendors.length} VERIFIED PARTNERS</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <StarIcon sx={{ color: 'warning.main', fontSize: 16 }} />
                                    <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.primary' }}>4.9/5 RATING</Typography>
                                </Box>
                            </Box>

                            <TextField
                                placeholder="Find your wedding partner..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                sx={{ width: { xs: '100%', md: 350 }, '& .MuiOutlinedInput-root': { height: '40px', borderRadius: '10px' } }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18 }} /></InputAdornment>,
                                    endAdornment: searchQuery && <IconButton size="small" onClick={() => setSearchQuery('')}><CloseIcon sx={{ fontSize: 16 }} /></IconButton>
                                }}
                            />
                        </Box>
                    </Container>
                </Box>

                <SectorNavigation sectors={SECTORS} activeSectorId={activeSector} onSectorChange={setActiveSector} />

                <Container maxWidth="xl">
                    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary' }}>
                            {activeSector === 'all' ? 'Featured Vendors' : `Top Providers in ${SECTORS.find(s => s.id === activeSector)?.name}`}
                        </Typography>
                        <Button startIcon={<FilterIcon />} sx={{ fontWeight: 700, textTransform: 'none', color: 'text.secondary' }}>Sort & Filter</Button>
                    </Box>

                    <Grid container spacing={4}>
                        <AnimatePresence mode="popLayout">
                            {isLoading ? (
                                Array.from(new Array(6)).map((_, i) => (
                                    <Grid item xs={12} sm={6} lg={4} key={i}>
                                        <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 3 }} />
                                    </Grid>
                                ))
                            ) : paginatedVendors.length > 0 ? (
                                paginatedVendors.map((vendor: any) => (
                                    <Grid item xs={12} sm={6} lg={4} key={vendor.id} component={motion.div} layout>
                                        <VendorCard vendor={vendor} />
                                    </Grid>
                                ))
                            ) : (
                                <Box sx={{ width: '100%', py: 10, textAlign: 'center' }}><Typography color="text.disabled">No vendors found.</Typography></Box>
                            )}
                        </AnimatePresence>
                    </Grid>

                    {totalPages > 1 && (
                        <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
                            <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
                        </Box>
                    )}
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 0, maxWidth: 1600, margin: '0 auto' }}>
            <DashboardCard sx={{ p: 0, overflow: 'hidden', border: `1px solid ${alpha(theme.palette.divider, 0.1)}`, borderRadius: '12px' }}>
                <TableHeaderToolbar 
                    title="Vendor Directory"
                    table={table} 
                    ExcelData={{ data: vendors, fileName: 'Vendors_Export' }}
                    actionButton={
                        <Button 
                            variant="contained" 
                            startIcon={<AddIcon />}
                            onClick={() => navigate('/manager/vendors/add')}
                            sx={{ borderRadius: '10px', fontWeight: 800, px: 2, py: 0.8, textTransform: 'none', boxShadow: 'none' }}
                        >
                            Add Vendor
                        </Button>
                    }
                />
                <TableComponent table={table} />
                <TableBottomToolbar table={table} />
            </DashboardCard>
        </Box>
    );
};

export default Vendors;
