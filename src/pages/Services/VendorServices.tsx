import { useState, useEffect, useMemo } from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Chip,
    IconButton,
    Stack,
    Tabs,
    Tab,
    alpha,
    useTheme,
    Skeleton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    InputBase,
    Divider
} from '@mui/material';
import {
    Plus,
    MoreVertical,
    Edit3,
    Trash2,
    Search,
    Filter,
    ArrowUpRight,
    Camera,
    Utensils,
    Music,
    MapPin,
    Sparkles,
    Briefcase
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../contexts/SnackbarContext';
import PRODUCT_SERVICE from '../../api/services/product';
import type { Product } from '../../Types/Product';

const CATEGORIES = ['All', 'Photography', 'Catering', 'Decoration', 'Music', 'Venue', 'Makeup', 'Other'];

const VendorServices = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { success, error: showError } = useSnackbar();
    
    const [services, setServices] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Action Menu State
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedService, setSelectedService] = useState<Product | null>(null);

    const fetchServices = async () => {
        setIsLoading(true);
        try {
            const response = await PRODUCT_SERVICE.GetMine();
            setServices(response.data.data || []);
        } catch (error) {
            showError("Failed to fetch services");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, service: Product) => {
        setAnchorEl(event.currentTarget);
        setSelectedService(service);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedService(null);
    };

    const handleDelete = async () => {
        if (!selectedService) return;
        if (!window.confirm("Are you sure you want to delete this service?")) return;

        try {
            await PRODUCT_SERVICE.DeleteProduct(selectedService.id.toString());
            success("Service deleted successfully");
            fetchServices();
        } catch (error) {
            showError("Failed to delete service");
        } finally {
            handleMenuClose();
        }
    };

    const filteredServices = useMemo(() => {
        return services.filter(service => {
            const matchesSearch = (service.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                                (service.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());
            
            const category = (service as any).category || 'Other';
            const matchesCategory = activeTab === 0 || category.toLowerCase() === CATEGORIES[activeTab].toLowerCase();
            
            return matchesSearch && matchesCategory;
        });
    }, [services, searchQuery, activeTab]);

    const getCategoryIcon = (category: string) => {
        switch (category?.toLowerCase()) {
            case 'photography': return <Camera size={14} />;
            case 'catering': return <Utensils size={14} />;
            case 'music': return <Music size={14} />;
            case 'venue': return <MapPin size={14} />;
            case 'makeup': return <Sparkles size={14} />;
            default: return <Briefcase size={14} />;
        }
    };

    return (
        <Box sx={{ pb: 8, px: { xs: 2, md: 3 } }}>
            {/* Top Toolbar */}
            <Box sx={{ mb: 3, mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box>
                    <Typography sx={{ fontWeight: 900, color: 'text.primary', fontSize: '1.25rem', letterSpacing: '-0.02em', mb: 0.5 }}>
                        Service Management
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                        Manage and showcase your wedding services to potential customers.
                    </Typography>
                </Box>

                <Button 
                    variant="contained" 
                    startIcon={<Plus size={18} />}
                    onClick={() => navigate('/vendor/services/add')}
                    sx={{ 
                        borderRadius: '10px', 
                        fontWeight: 800, 
                        px: 3, 
                        height: '40px',
                        textTransform: 'none', 
                        boxShadow: 'none',
                        '&:hover': {
                            boxShadow: 'none',
                            bgcolor: 'primary.dark'
                        }
                    }}
                >
                    Add Service
                </Button>
            </Box>

            <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        bgcolor: '#f8fafc', 
                        px: 1.5, 
                        height: '40px',
                        borderRadius: '10px', 
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        flex: 1,
                        maxWidth: 400,
                        transition: 'all 0.2s',
                        '&:focus-within': {
                            bgcolor: '#ffffff',
                            borderColor: 'primary.main',
                            boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`
                        }
                    }}
                >
                    <Search size={16} color={theme.palette.text.disabled} />
                    <InputBase 
                        placeholder="Search your services..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{ ml: 1, flex: 1, fontSize: '0.85rem', fontWeight: 500 }}
                    />
                </Box>
            </Box>

            {/* Category Tabs */}
            <Box sx={{ borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`, mb: 3 }}>
                <Tabs 
                    value={activeTab} 
                    onChange={(_, val) => setActiveTab(val)}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        minHeight: '40px',
                        '& .MuiTabs-indicator': {
                            height: 2,
                            borderRadius: '2px 2px 0 0',
                        },
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            minHeight: '40px',
                            minWidth: 80,
                            color: 'text.secondary',
                            '&.Mui-selected': {
                                color: 'primary.main',
                            }
                        }
                    }}
                >
                    {CATEGORIES.map((cat) => (
                        <Tab key={cat} label={cat} />
                    ))}
                </Tabs>
            </Box>

            {/* Content Grid */}
            {isLoading ? (
                <Grid container spacing={3}>
                    {[1, 2, 3, 4].map((i) => (
                        <Grid item xs={12} sm={6} lg={4} key={i}>
                            <Skeleton variant="rectangular" height={240} sx={{ borderRadius: '24px', mb: 2 }} />
                            <Skeleton width="60%" height={30} sx={{ mb: 1 }} />
                            <Skeleton width="40%" height={20} />
                        </Grid>
                    ))}
                </Grid>
            ) : filteredServices.length > 0 ? (
                <Grid container spacing={3}>
                    {filteredServices.map((service) => (
                        <Grid item xs={12} sm={6} lg={4} key={service.id}>
                            <Card 
                                sx={{ 
                                    borderRadius: '12px', 
                                    border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                                    boxShadow: 'none',
                                    overflow: 'hidden',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                                        '& .card-media-overlay': {
                                            opacity: 1
                                        }
                                    }
                                }}
                            >
                                <Box sx={{ position: 'relative', height: 220 }}>
                                    <CardMedia
                                        component="img"
                                        height="220"
                                        image={service.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
                                        alt={service.name}
                                        sx={{ objectFit: 'cover' }}
                                    />
                                    {/* Glass Overlay on Hover */}
                                    <Box 
                                        className="card-media-overlay"
                                        sx={{ 
                                            position: 'absolute', 
                                            top: 0, 
                                            left: 0, 
                                            width: '100%', 
                                            height: '100%', 
                                            bgcolor: 'rgba(0,0,0,0.4)', 
                                            backdropFilter: 'blur(4px)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            opacity: 0,
                                            transition: 'opacity 0.3s'
                                        }}
                                    >
                                        <Button 
                                            variant="contained" 
                                            size="small"
                                            startIcon={<ArrowUpRight size={16} />}
                                            onClick={() => navigate(`/vendor/services/edit/${service.id}`)}
                                            sx={{ 
                                                borderRadius: '10px', 
                                                bgcolor: '#fff', 
                                                color: '#000',
                                                fontWeight: 700,
                                                '&:hover': { bgcolor: '#f0f0f0' }
                                            }}
                                        >
                                            Quick Edit
                                        </Button>
                                    </Box>

                                    {/* Top Badges */}
                                    <Box sx={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 1 }}>
                                        <Chip 
                                            label={(service as any).category || 'Other'} 
                                            size="small"
                                            icon={getCategoryIcon((service as any).category)}
                                            sx={{ 
                                                bgcolor: 'rgba(255,255,255,0.9)', 
                                                backdropFilter: 'blur(8px)',
                                                fontWeight: 800,
                                                fontSize: '10px',
                                                height: 24,
                                                '& .MuiChip-icon': { color: 'primary.main', ml: 1 }
                                            }}
                                        />
                                    </Box>

                                    <IconButton 
                                        size="small"
                                        onClick={(e) => handleMenuOpen(e, service)}
                                        sx={{ 
                                            position: 'absolute', 
                                            top: 16, 
                                            right: 16, 
                                            bgcolor: 'rgba(255,255,255,0.9)', 
                                            backdropFilter: 'blur(8px)',
                                            '&:hover': { bgcolor: '#fff' }
                                        }}
                                    >
                                        <MoreVertical size={18} />
                                    </IconButton>
                                </Box>

                                <CardContent sx={{ p: 3 }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.1rem', color: 'text.primary' }}>
                                            {service.name}
                                        </Typography>
                                        <Typography variant="h6" sx={{ fontWeight: 900, color: 'primary.main' }}>
                                            ₹{service.price.toLocaleString()}
                                        </Typography>
                                    </Stack>
                                    
                                    <Typography 
                                        variant="body2" 
                                        color="text.secondary" 
                                        sx={{ 
                                            mb: 3, 
                                            height: 40, 
                                            overflow: 'hidden',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            fontWeight: 500,
                                            lineHeight: 1.5
                                        }}
                                    >
                                        {service.description || 'No description provided.'}
                                    </Typography>

                                    <Divider sx={{ mb: 2, opacity: 0.6 }} />
                                    
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
                                            <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>Active</Typography>
                                        </Box>
                                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                                            View Analytics
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box sx={{ textAlign: 'center', py: 12, bgcolor: alpha(theme.palette.divider, 0.03), borderRadius: '32px', border: `2px dashed ${alpha(theme.palette.divider, 0.1)}` }}>
                    <Box sx={{ display: 'inline-flex', p: 3, borderRadius: '50%', bgcolor: alpha(theme.palette.primary.main, 0.05), mb: 3 }}>
                        <Filter size={40} color={theme.palette.primary.main} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>No services found</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 300, mx: 'auto' }}>
                        Try adjusting your filters or add a new service to get started.
                    </Typography>
                    <Button 
                        variant="outlined" 
                        onClick={() => { setActiveTab(0); setSearchQuery(''); }}
                        sx={{ borderRadius: '12px', fontWeight: 700, textTransform: 'none' }}
                    >
                        Clear All Filters
                    </Button>
                </Box>
            )}

            {/* Action Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: {
                        borderRadius: '16px',
                        minWidth: 180,
                        mt: 1,
                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        p: 0.5
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem 
                    onClick={() => { if (selectedService) navigate(`/vendor/services/edit/${selectedService.id}`); handleMenuClose(); }}
                    sx={{ borderRadius: '10px', py: 1.5 }}
                >
                    <ListItemIcon><Edit3 size={18} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ fontWeight: 700, fontSize: '13px' }}>Edit Service</ListItemText>
                </MenuItem>
                <MenuItem 
                    onClick={handleDelete}
                    sx={{ borderRadius: '10px', py: 1.5, color: 'error.main', '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.05) } }}
                >
                    <ListItemIcon><Trash2 size={18} color={theme.palette.error.main} /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ fontWeight: 700, fontSize: '13px' }}>Delete Service</ListItemText>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default VendorServices;
