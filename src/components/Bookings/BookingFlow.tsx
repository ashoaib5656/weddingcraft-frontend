import React, { useState } from 'react';
import {
    Box,
    Dialog,
    DialogContent,
    Typography,
    Button,
    Grid,
    TextField,
    IconButton,
    alpha,
    useTheme,
    Stack,
    InputAdornment,
    CircularProgress,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
    Close as CloseIcon,
    Event as EventIcon,
    LocationOn as LocationIcon,
    People as PeopleIcon,
    AccessTime as TimeIcon,
    CheckCircle as SuccessIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import InputField from '../Form/InputField';
import BOOKING_SERVICE from '../../api/services/bookings';
import AVAILABILITY_SERVICE from '../../api/services/availability';
import { useSnackbar } from '../../contexts/SnackbarContext';
import dayjs from 'dayjs';

interface BookingFlowProps {
    open: boolean;
    onClose: () => void;
    vendor: any;
}

const steps = ['Event Details', 'Requirements', 'Review'];

const BookingFlow: React.FC<BookingFlowProps> = ({ open, onClose, vendor }) => {
    const theme = useTheme();
    const { success, error: showError } = useSnackbar();
    const [activeStep, setActiveStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [blockedDates, setBlockedDates] = useState<string[]>([]);
    const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);

    React.useEffect(() => {
        if (open && vendor?.id) {
            fetchAvailability();
        }
    }, [open, vendor?.id]);

    const fetchAvailability = async () => {
        setIsLoadingAvailability(true);
        try {
            const response = await AVAILABILITY_SERVICE.getVendorAvailability(vendor.id);
            const dates = response.data.data.map((a: any) => dayjs(a.blockedDate).format('YYYY-MM-DD'));
            setBlockedDates(dates);
        } catch (err) {
            console.error("Failed to fetch vendor availability", err);
        } finally {
            setIsLoadingAvailability(false);
        }
    };

    const { control, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            eventDate: '',
            eventTime: '18:00',
            location: '',
            guestCount: 100,
            requirements: '',
            notes: '',
        }
    });

    const formData = watch();

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        try {
            await BOOKING_SERVICE.requestBooking({
                vendorId: vendor.id,
                productId: vendor.productId,
                eventDate: data.eventDate,
                eventTime: data.eventTime,
                location: data.location,
                guestCount: data.guestCount,
                requirements: data.requirements,
                budget: vendor.priceRange,
                notes: data.notes,
                totalAmount: 0 // Will be confirmed by vendor
            });
            setIsSuccess(true);
            success('Booking request sent to vendor!');
        } catch (err) {
            showError('Failed to submit booking request.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', ml: 1, mb: 1, display: 'block' }}>
                                EVENT DATE
                            </Typography>
                            <Controller
                                name="eventDate"
                                control={control}
                                rules={{ required: 'Date is required' }}
                                render={({ field: { onChange, value } }) => (
                                    <DatePicker
                                        value={value ? dayjs(value) : null}
                                        onChange={(date) => onChange(date?.format('YYYY-MM-DD'))}
                                        shouldDisableDate={(date) => 
                                            blockedDates.includes(date.format('YYYY-MM-DD')) || date.isBefore(dayjs(), 'day')
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                error={!!errors.eventDate}
                                                helperText={(errors.eventDate?.message as string) || (isLoadingAvailability ? 'Checking availability...' : '')}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <EventIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                sx={{ 
                                                    '& .MuiOutlinedInput-root': { 
                                                        borderRadius: '16px',
                                                        bgcolor: '#f8fafc',
                                                        border: '1px solid #e2e8f0',
                                                        '&:hover': { border: `1px solid ${theme.palette.primary.main}` }
                                                    } 
                                                }}
                                            />
                                        )}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', ml: 1, mb: 1, display: 'block' }}>
                                PREFERRED TIME
                            </Typography>
                            <Controller
                                name="eventTime"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        type="time"
                                        InputProps={{ 
                                            startAdornment: <InputAdornment position="start"><TimeIcon sx={{ color: 'primary.main', fontSize: 20 }} /></InputAdornment>,
                                            sx: { borderRadius: '16px', bgcolor: '#f8fafc', border: '1px solid #e2e8f0' }
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', ml: 1, mb: 1, display: 'block' }}>
                                EVENT LOCATION
                            </Typography>
                            <Controller
                                name="location"
                                control={control}
                                rules={{ required: 'Location is required' }}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        placeholder="Enter the full address or city"
                                        error={!!errors.location}
                                        helperText={errors.location?.message as string}
                                        InputProps={{ 
                                            startAdornment: <InputAdornment position="start"><LocationIcon sx={{ color: 'primary.main', fontSize: 20 }} /></InputAdornment>,
                                            sx: { borderRadius: '16px', bgcolor: '#f8fafc', border: '1px solid #e2e8f0' }
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                );
            case 1:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', ml: 1, mb: 1, display: 'block' }}>
                                ESTIMATED GUESTS
                            </Typography>
                            <Controller
                                name="guestCount"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        type="number"
                                        InputProps={{ 
                                            startAdornment: <InputAdornment position="start"><PeopleIcon sx={{ color: 'primary.main', fontSize: 20 }} /></InputAdornment>,
                                            sx: { borderRadius: '16px', bgcolor: '#f8fafc', border: '1px solid #e2e8f0' }
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', ml: 1, mb: 1, display: 'block' }}>
                                SPECIFIC REQUIREMENTS
                            </Typography>
                            <Controller
                                name="requirements"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        multiline
                                        rows={3}
                                        fullWidth
                                        placeholder="Tell us about your theme, specific preferences, or any custom needs..."
                                        sx={{ 
                                            '& .MuiOutlinedInput-root': { 
                                                borderRadius: '16px', 
                                                bgcolor: '#f8fafc',
                                                border: '1px solid #e2e8f0'
                                            } 
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                );
            case 2:
                return (
                    <Box sx={{ 
                        p: 3, 
                        borderRadius: '24px', 
                        bgcolor: alpha(theme.palette.primary.main, 0.03), 
                        border: `2px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                    }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 900, mb: 3, color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                            <SuccessIcon sx={{ fontSize: 20 }} /> Request Summary
                        </Typography>
                        <Stack spacing={2.5}>
                            {[
                                { label: 'Vendor', value: vendor?.name || 'Not Selected', icon: <PeopleIcon sx={{ fontSize: 18 }} /> },
                                { label: 'Event Date', value: formData.eventDate || '---', icon: <EventIcon sx={{ fontSize: 18 }} /> },
                                { label: 'Preferred Time', value: formData.eventTime || '---', icon: <TimeIcon sx={{ fontSize: 18 }} /> },
                                { label: 'Location', value: formData.location || '---', icon: <LocationIcon sx={{ fontSize: 18 }} /> },
                            ].map((item, idx) => (
                                <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                                        {item.icon}
                                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{item.label}</Typography>
                                    </Box>
                                    <Typography variant="body2" sx={{ fontWeight: 800, color: 'text.primary', textAlign: 'right' }}>{item.value}</Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                );
            default:
                return null;
        }
    };

    if (isSuccess) {
        return (
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '24px', p: 4 } }}>
                <Box sx={{ textAlign: 'center', py: 4 }}>
                    <SuccessIcon sx={{ fontSize: 80, color: 'success.main', mb: 3 }} />
                    <Typography variant="h4" sx={{ fontWeight: 900, mb: 2 }}>Request Sent!</Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 4 }}>
                        Your booking request has been sent to <strong>{vendor.name}</strong>. 
                        They will review your details and respond within 24 hours.
                    </Typography>
                    <Button variant="contained" onClick={onClose} sx={{ borderRadius: '12px', px: 6, py: 1.5, fontWeight: 800 }}>
                        Back to Marketplace
                    </Button>
                </Box>
            </Dialog>
        );
    }

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="sm" 
            fullWidth 
            PaperProps={{ 
                sx: { 
                    borderRadius: '28px', 
                    p: 0, 
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                } 
            }}
        >
            <Box sx={{ 
                p: 4, 
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                color: 'white', 
                position: 'relative' 
            }}>
                <Stack spacing={0.5}>
                    <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
                        Reserve Your Date
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, opacity: 0.9 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            Booking with
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 800, textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                            {vendor?.name || 'Professional Vendor'}
                        </Typography>
                    </Box>
                </Stack>
                <IconButton 
                    onClick={onClose} 
                    sx={{ 
                        position: 'absolute', 
                        top: 20, 
                        right: 20, 
                        color: 'white', 
                        bgcolor: 'rgba(255,255,255,0.1)',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } 
                    }}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>

            <DialogContent sx={{ p: 4, pt: 2 }}>
                <Box sx={{ minHeight: 240 }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStep}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderStepContent(activeStep)}
                        </motion.div>
                    </AnimatePresence>
                </Box>

                <Box sx={{ 
                    mt: 4, 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    pt: 3,
                    borderTop: `1px solid ${theme.palette.divider}`
                }}>
                    <Button 
                        disabled={activeStep === 0} 
                        onClick={handleBack}
                        sx={{ 
                            fontWeight: 800, 
                            textTransform: 'none', 
                            color: 'text.secondary',
                            px: 3,
                            '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.05), color: 'primary.main' }
                        }}
                    >
                        Back
                    </Button>
                    
                    {activeStep === steps.length - 1 ? (
                        <Button 
                            variant="contained"
                            onClick={handleSubmit(onSubmit)} 
                            disabled={isSubmitting}
                            sx={{ 
                                minWidth: 180, 
                                borderRadius: '14px', 
                                height: 48,
                                fontWeight: 800,
                                textTransform: 'none',
                                fontSize: '1rem',
                                boxShadow: `0 10px 20px ${alpha(theme.palette.primary.main, 0.25)}`
                            }}
                        >
                            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Confirm Booking'}
                        </Button>
                    ) : (
                        <Button 
                            variant="contained" 
                            onClick={handleNext}
                            sx={{ 
                                minWidth: 120, 
                                borderRadius: '12px', 
                                fontWeight: 800, 
                                textTransform: 'none',
                                height: 48,
                                boxShadow: `0 8px 15px ${alpha(theme.palette.primary.main, 0.2)}`
                            }}
                        >
                            Next
                        </Button>
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default BookingFlow;
