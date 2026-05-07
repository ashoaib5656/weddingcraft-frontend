import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    Breadcrumbs,
    Link,
    Stack,
    InputAdornment,
    MenuItem,
    alpha,
    useTheme,
    Card,
    CardContent,
    CircularProgress
} from '@mui/material';
import {
    ArrowLeft,
    Save,
    Image as ImageIcon,
    Info,
    IndianRupee,
    ChevronRight,
    Trash2
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from '../../contexts/SnackbarContext';
import PRODUCT_SERVICE from '../../api/services/product';

const SERVICE_CATEGORIES = [
    { value: 'Photography', label: 'Photography' },
    { value: 'Catering', label: 'Catering' },
    { value: 'Decoration', label: 'Decoration' },
    { value: 'Music', label: 'Music & Entertainment' },
    { value: 'Venue', label: 'Venue' },
    { value: 'Makeup', label: 'Makeup & Hair' },
    { value: 'Other', label: 'Other Services' }
];

const EditService = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { success, error: showError } = useSnackbar();
    
    const [pageLoading, setPageLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        category: 'Photography'
    });

    useEffect(() => {
        const fetchService = async () => {
            if (!id) return;
            try {
                const response = await PRODUCT_SERVICE.GetProductById(id);
                const service = response.data.data;
                if (service) {
                    setFormData({
                        name: service.name,
                        description: service.description,
                        price: service.price.toString(),
                        imageUrl: service.imageUrl || '',
                        category: (service as any).category || 'Photography'
                    });
                }
            } catch (error) {
                console.error("Error fetching service", error);
                showError("Failed to load service details.");
                navigate('/vendor/services');
            } finally {
                setPageLoading(false);
            }
        };
        fetchService();
    }, [id, navigate, showError]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        if (!formData.name || !formData.price) {
            showError("Name and Price are required");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                ...formData,
                price: parseFloat(formData.price)
            };
            await PRODUCT_SERVICE.UpdateProduct(id, payload);
            success("Service updated successfully!");
            navigate('/vendor/services');
        } catch (error) {
            console.error("Error updating service", error);
            showError("Failed to update service.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!id) return;
        if (!window.confirm("Are you sure you want to permanently delete this service? This action cannot be undone.")) return;
        
        try {
            await PRODUCT_SERVICE.DeleteProduct(id);
            success("Service deleted successfully.");
            navigate('/vendor/services');
        } catch (error) {
            showError("Failed to delete service.");
        }
    };

    if (pageLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress color="primary" />
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 1400, margin: '0 auto', pb: 8, px: { xs: 2, md: 4 } }}>
            {/* Header Area */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Box>
                    <Breadcrumbs 
                        separator={<ChevronRight size={14} />} 
                        sx={{ mb: 1, '& .MuiBreadcrumbs-li': { fontSize: '13px', fontWeight: 500 } }}
                    >
                        <Link 
                            component="button"
                            onClick={() => navigate('/vendor/services')}
                            sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                        >
                            My Services
                        </Link>
                        <Typography color="text.primary" sx={{ fontWeight: 600, fontSize: '13px' }}>Edit Service</Typography>
                    </Breadcrumbs>
                    <Typography variant="h4" sx={{ fontWeight: 900, color: 'text.primary', letterSpacing: '-0.03em', mt: 0.5 }}>
                        Edit Service Details
                    </Typography>
                </Box>
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<Trash2 size={18} />}
                        onClick={handleDelete}
                        sx={{ 
                            borderRadius: '12px', 
                            textTransform: 'none', 
                            fontWeight: 700,
                            borderWidth: '2px',
                            '&:hover': { borderWidth: '2px' }
                        }}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowLeft size={18} />}
                        onClick={() => navigate('/vendor/services')}
                        sx={{ 
                            borderRadius: '12px', 
                            textTransform: 'none', 
                            fontWeight: 700,
                            borderWidth: '2px',
                            '&:hover': { borderWidth: '2px' }
                        }}
                    >
                        Back
                    </Button>
                </Stack>
            </Stack>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <Stack spacing={3}>
                            <Paper 
                                elevation={0} 
                                sx={{ 
                                    p: 4, 
                                    borderRadius: '24px', 
                                    border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                                    bgcolor: 'background.paper',
                                    boxShadow: '0 4px 20px -5px rgba(0,0,0,0.05)'
                                }}
                            >
                                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
                                    <Box sx={{ 
                                        width: 42, 
                                        height: 42, 
                                        borderRadius: '12px', 
                                        bgcolor: alpha(theme.palette.primary.main, 0.1), 
                                        color: 'primary.main',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Info size={22} />
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>Service Information</Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>Update the details of your offering</Typography>
                                    </Box>
                                </Stack>

                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Service Title"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            InputProps={{
                                                sx: { borderRadius: '14px', fontWeight: 500 }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            InputProps={{
                                                sx: { borderRadius: '14px', fontWeight: 500 }
                                            }}
                                        >
                                            {SERVICE_CATEGORIES.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Base Price"
                                            name="price"
                                            type="number"
                                            value={formData.price}
                                            onChange={handleChange}
                                            required
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"><IndianRupee size={18} /></InputAdornment>,
                                                sx: { borderRadius: '14px', fontWeight: 600 }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Featured Image URL"
                                            name="imageUrl"
                                            value={formData.imageUrl}
                                            onChange={handleChange}
                                            placeholder="https://example.com/image.jpg"
                                            InputProps={{
                                                sx: { borderRadius: '14px', fontWeight: 500 }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Detailed Description"
                                            name="description"
                                            multiline
                                            rows={6}
                                            value={formData.description}
                                            onChange={handleChange}
                                            InputProps={{
                                                sx: { borderRadius: '14px', fontWeight: 500 }
                                            }}
                                        />
                                    </Grid>
                                    {formData.imageUrl && (
                                        <Grid item xs={12}>
                                            <Box sx={{ mt: 1, position: 'relative', borderRadius: '16px', overflow: 'hidden', height: 280, border: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                                                <img 
                                                    src={formData.imageUrl} 
                                                    alt="Preview" 
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Invalid+Image+URL')}
                                                />
                                            </Box>
                                        </Grid>
                                    )}
                                </Grid>
                            </Paper>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Stack spacing={3} sx={{ position: 'sticky', top: 100 }}>
                            <Card 
                                elevation={0} 
                                sx={{ 
                                    borderRadius: '24px', 
                                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                    bgcolor: alpha(theme.palette.primary.main, 0.02)
                                }}
                            >
                                <CardContent sx={{ p: 4 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 3 }}>Final Review</Typography>
                                    
                                    <Stack spacing={2.5}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="text.secondary">Current Price</Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 900, color: 'primary.main' }}>
                                                ₹{formData.price ? parseFloat(formData.price).toLocaleString() : '0'}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="text.secondary">Last Updated</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 700 }}>Today</Typography>
                                        </Box>
                                    </Stack>

                                    <Button
                                        fullWidth
                                        type="submit"
                                        variant="contained"
                                        disabled={loading}
                                        startIcon={!loading && <Save size={20} />}
                                        sx={{ 
                                            mt: 4, 
                                            py: 2, 
                                            borderRadius: '16px', 
                                            fontWeight: 800,
                                            fontSize: '1rem',
                                            textTransform: 'none',
                                            boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.25)}`,
                                        }}
                                    >
                                        {loading ? 'Updating...' : 'Save Changes'}
                                    </Button>
                                </CardContent>
                            </Card>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default EditService;
