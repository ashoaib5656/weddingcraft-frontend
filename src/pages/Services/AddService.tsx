import React, { useState } from 'react';
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
    Divider
} from '@mui/material';
import {
    Save,
    Info,
    IndianRupee,
    CheckCircle2,
    ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

const AddService = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { success, error: showError } = useSnackbar();
    
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        category: 'Photography'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
            await PRODUCT_SERVICE.CreateProduct(payload);
            success("Service created successfully!");
            navigate('/vendor/services');
        } catch (error) {
            console.error("Error creating service", error);
            showError("Failed to create service. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 0 }}>
            <Box sx={{ mb: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Breadcrumbs 
                    separator={<ChevronRight size={16} />} 
                    aria-label="breadcrumb"
                >
                    <Link
                        underline="hover"
                        color="inherit"
                        onClick={() => navigate('/vendor/services')}
                        sx={{ fontSize: '0.9rem', fontWeight: 600, color: 'text.secondary', cursor: 'pointer' }}
                    >
                        Services
                    </Link>
                    <Typography color="primary" sx={{ fontSize: '1rem', fontWeight: 800 }}>
                        Add Service
                    </Typography>
                </Breadcrumbs>
            </Box>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                    {/* Left Column - Form Details */}
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
                                        <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>Basic Information</Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>Essential details about your service</Typography>
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
                                            placeholder="e.g., Premium Cinematic Wedding Film"
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
                                            placeholder="Describe what's included in this service..."
                                            InputProps={{
                                                sx: { borderRadius: '14px', fontWeight: 500 }
                                            }}
                                        />
                                    </Grid>
                                    {formData.imageUrl && (
                                        <Grid item xs={12}>
                                            <Box sx={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: 280, border: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                                                <img 
                                                    src={formData.imageUrl} 
                                                    alt="Preview" 
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Invalid+Image+URL')}
                                                />
                                                <Box sx={{ position: 'absolute', top: 12, right: 12, bgcolor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', p: 0.5, borderRadius: '8px', display: 'flex', alignItems: 'center', gap: 0.5, px: 1 }}>
                                                    <CheckCircle2 size={14} color="#10b981" />
                                                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#10b981' }}>Preview Active</Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    )}
                                </Grid>
                            </Paper>
                        </Stack>
                    </Grid>

                    {/* Right Column - Summary & Submit */}
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
                                    <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 3 }}>Summary Preview</Typography>
                                    
                                    <Stack spacing={2.5}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="text.secondary">Title</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 700, textAlign: 'right', maxWidth: '150px' }}>
                                                {formData.name || 'Untitled Service'}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="text.secondary">Category</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 700 }}>{formData.category}</Typography>
                                        </Box>
                                        <Divider sx={{ borderStyle: 'dashed' }} />
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Starting Price</Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 900, color: 'primary.main' }}>
                                                ₹{formData.price ? parseFloat(formData.price).toLocaleString() : '0'}
                                            </Typography>
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
                                            '&:hover': {
                                                boxShadow: `0 12px 20px ${alpha(theme.palette.primary.main, 0.35)}`,
                                            }
                                        }}
                                    >
                                        {loading ? 'Creating...' : 'Publish Service'}
                                    </Button>
                                    
                                    <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 2, color: 'text.secondary', fontWeight: 500 }}>
                                        By publishing, this service will be visible to all customers on the platform.
                                    </Typography>
                                </CardContent>
                            </Card>

                            <Box sx={{ p: 3, borderRadius: '20px', bgcolor: alpha(theme.palette.warning.main, 0.05), border: `1px solid ${alpha(theme.palette.warning.main, 0.1)}` }}>
                                <Stack direction="row" spacing={1.5} sx={{ mb: 1 }}>
                                    <Info size={18} color={theme.palette.warning.main} />
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: theme.palette.warning.main }}>Tips for better reach</Typography>
                                </Stack>
                                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5, display: 'block' }}>
                                    • Use high-resolution landscape images (16:9 ratio)<br/>
                                    • Highlight unique selling points in the description<br/>
                                    • Keep your pricing competitive yet realistic
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default AddService;
