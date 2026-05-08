import React, { useState } from 'react';
import {
    Box,
    Dialog,
    DialogContent,
    Typography,
    Stepper,
    Step,
    StepLabel,
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
    Notes as NotesIcon,
    CheckCircle as SuccessIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import InputField from '../Form/InputField';
import FormButton from '../Form/FormButton';
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
            const dates = response.data.data.map(a => dayjs(a.blockedDate).format('YYYY-MM-DD'));
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
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="eventDate"
                                control={control}
                                rules={{ required: 'Date is required' }}
                                render={({ field: { onChange, value } }) => (
                                    <DatePicker
                                        label="Event Date"
                                        value={value ? dayjs(value) : null}
                                        onChange={(date) => onChange(date?.format('YYYY-MM-DD'))}
                                        shouldDisableDate={(date) => 
                                            blockedDates.includes(date.format('YYYY-MM-DD')) || date.isBefore(dayjs(), 'day')
                                        }
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                error: !!errors.eventDate,
                                                helperText: (errors.eventDate?.message as string) || (isLoadingAvailability ? 'Checking availability...' : ''),
                                                InputProps: {
                                                    startAdornment: <InputAdornment position="start"><EventIcon sx={{ color: 'primary.main' }} /></InputAdornment>,
                                                    endAdornment: isLoadingAvailability && <InputAdornment position="end"><CircularProgress size={20} /></InputAdornment>
                                                },
                                                sx: { 
                                                    '& .MuiOutlinedInput-root': { 
                                                        borderRadius: '12px',
                                                        bgcolor: '#f8fafc'
                                                    } 
                                                }
                                            }
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="eventTime"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        label="Preferred Time"
                                        type="time"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="location"
                                control={control}
                                rules={{ required: 'Location is required' }}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        label="Event Location / Venue Address"
                                        placeholder="Enter the full address or city"
                                        error={!!errors.location}
                                        helperText={errors.location?.message as string}
                                        InputProps={{ startAdornment: <InputAdornment position="start"><LocationIcon sx={{ color: 'primary.main' }} /></InputAdornment> }}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                );
            case 1:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="guestCount"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        label="Estimated Guest Count"
                                        type="number"
                                        InputProps={{ startAdornment: <InputAdornment position="start"><PeopleIcon sx={{ color: 'primary.main' }} /></InputAdornment> }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="requirements"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Specific Requirements"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        placeholder="Tell us about your theme, specific preferences, or any custom needs..."
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#f8fafc' } }}
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
                        borderRadius: '20px', 
                        bgcolor: alpha(theme.palette.primary.main, 0.04), 
                        border: `1px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
                        mt: 1
                    }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, color: 'primary.main' }}>Request Summary</Typography>
                        <Stack spacing={2}>
                            {[
                                { label: 'Vendor', value: vendor?.name || 'Not Selected' },
                                { label: 'Date & Time', value: `${formData.eventDate || '---'} at ${formData.eventTime || '---'}` },
                                { label: 'Location', value: formData.location || '---' },
                                { label: 'Estimated Guests', value: formData.guestCount || '---' },
                            ].map((item, idx) => (
                                <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>{item.label}</Typography>
                                    <Typography sx={{ fontWeight: 700, color: 'text.primary', textAlign: 'right' }}>{item.value}</Typography>
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
            maxWidth="md" 
            fullWidth 
            PaperProps={{ sx: { borderRadius: '24px', p: 0, overflow: 'hidden' } }}
        >
            <Box sx={{ p: 4, bgcolor: 'primary.main', color: 'white', position: 'relative' }}>
                <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5 }}>Reserve Your Date</Typography>
                <Typography sx={{ opacity: 0.9, fontSize: '1rem', fontWeight: 600 }}>
                    Booking with <span style={{ textDecoration: 'underline' }}>{vendor?.name}</span>
                </Typography>
                <IconButton onClick={onClose} sx={{ position: 'absolute', top: 24, right: 24, color: 'white', '&:hover': { bgcolor: alpha('#fff', 0.1) } }}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <DialogContent sx={{ p: 4, pt: 5 }}>
                <Stepper activeStep={activeStep} sx={{ mb: 6 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel sx={{ '& .MuiStepLabel-label': { fontWeight: 700, mt: 1 } }}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box sx={{ minHeight: 320, px: 2 }}>
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
                    mt: 6, 
                    mb: 2,
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    borderTop: `1px solid ${theme.palette.divider}`,
                    pt: 3
                }}>
                    <Button 
                        disabled={activeStep === 0} 
                        onClick={handleBack}
                        sx={{ 
                            fontWeight: 800, 
                            textTransform: 'none', 
                            fontSize: '1rem',
                            color: 'text.secondary',
                            '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.05) }
                        }}
                    >
                        Back
                    </Button>
                    <Box>
                        {activeStep === steps.length - 1 ? (
                            <FormButton 
                                onClick={handleSubmit(onSubmit)} 
                                loading={isSubmitting}
                                sx={{ 
                                    width: 220, 
                                    borderRadius: '14px', 
                                    height: 52,
                                    fontSize: '1.1rem',
                                    boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.25)}`
                                }}
                            >
                                Submit Request
                            </FormButton>
                        ) : (
                            <Button 
                                variant="contained" 
                                onClick={handleNext}
                                sx={{ 
                                    width: 140, 
                                    borderRadius: '12px', 
                                    fontWeight: 800, 
                                    textTransform: 'none',
                                    height: 48,
                                    fontSize: '1rem'
                                }}
                            >
                                Next
                            </Button>
                        )}
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default BookingFlow;
