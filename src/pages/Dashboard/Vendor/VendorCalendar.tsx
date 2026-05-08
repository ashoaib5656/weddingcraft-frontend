import React, { useState, useEffect, useMemo } from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    IconButton,
    Button,
    alpha,
    useTheme,
    Tooltip,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Chip,
    Badge
} from '@mui/material';
import {
    ChevronLeft,
    ChevronRight,
    Block,
    EventAvailable,
    CalendarMonth,
    InfoOutlined,
    Close
} from '@mui/icons-material';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import DashboardCard from '../../../components/Dashboard/DashboardCard/DashboardCard';
import AVAILABILITY_SERVICE, { VendorAvailability } from '../../../api/services/availability';
import { useAuth } from '../../../contexts/Auth/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

dayjs.extend(isSameOrBefore);

const VendorCalendar = () => {
    const theme = useTheme();
    const { user } = useAuth();
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [availability, setAvailability] = useState<VendorAvailability[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [blockReason, setBlockReason] = useState('Personal Commitment');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        fetchAvailability();
    }, []);

    const fetchAvailability = async () => {
        if (!user?.id) return;
        setIsLoading(true);
        try {
            const response = await AVAILABILITY_SERVICE.getVendorAvailability(user.id);
            setAvailability(response.data.data);
        } catch (error) {
            console.error("Failed to fetch availability", error);
        } finally {
            setIsLoading(false);
        }
    };

    const daysInMonth = useMemo(() => {
        const startOfMonth = currentDate.startOf('month');
        const endOfMonth = currentDate.endOf('month');
        const days = [];
        
        // Add padding for start of week
        const startPadding = startOfMonth.day();
        for (let i = 0; i < startPadding; i++) {
            days.push(null);
        }

        for (let i = 1; i <= endOfMonth.date(); i++) {
            days.push(startOfMonth.date(i));
        }

        return days;
    }, [currentDate]);

    const handlePrevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
    const handleNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

    const handleDateClick = (date: Dayjs) => {
        const existing = availability.find(a => dayjs(a.blockedDate).isSame(date, 'day'));
        if (existing) {
            handleUnblock(existing.id);
        } else {
            setSelectedDate(date);
            setIsDialogOpen(true);
        }
    };

    const handleBlock = async () => {
        if (!selectedDate) return;
        try {
            await AVAILABILITY_SERVICE.blockDate({
                date: selectedDate.format('YYYY-MM-DD'),
                reason: blockReason
            });
            fetchAvailability();
            setIsDialogOpen(false);
            setBlockReason('Personal Commitment');
        } catch (error) {
            console.error("Failed to block date", error);
        }
    };

    const handleUnblock = async (id: number) => {
        try {
            await AVAILABILITY_SERVICE.unblockDate(id);
            fetchAvailability();
        } catch (error) {
            console.error("Failed to unblock date", error);
        }
    };

    const getDayState = (date: Dayjs) => {
        const entry = availability.find(a => dayjs(a.blockedDate).isSame(date, 'day'));
        if (!entry) return null;
        
        const isBooking = entry.reason.includes('Confirmed Booking');
        return {
            isBlocked: true,
            isBooking,
            reason: entry.reason,
            id: entry.id
        };
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <CircularProgress color="primary" />
            </Box>
        );
    }

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: '-0.02em', mb: 1 }}>
                        Availability Calendar
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage your service schedule, block dates, and view confirmed bookings.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Chip 
                        icon={<Block sx={{ fontSize: '1rem !important' }} />} 
                        label="Manually Blocked" 
                        size="small"
                        sx={{ bgcolor: alpha(theme.palette.error.main, 0.1), color: 'error.main', fontWeight: 700 }} 
                    />
                    <Chip 
                        icon={<EventAvailable sx={{ fontSize: '1rem !important' }} />} 
                        label="Confirmed Booking" 
                        size="small"
                        sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), color: 'success.main', fontWeight: 700 }} 
                    />
                </Box>
            </Box>

            <DashboardCard sx={{ p: 0, overflow: 'hidden', border: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                {/* Calendar Header */}
                <Box sx={{ 
                    p: 3, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    bgcolor: alpha(theme.palette.primary.main, 0.02),
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarMonth color="primary" />
                        <Typography variant="h6" sx={{ fontWeight: 800 }}>
                            {currentDate.format('MMMM YYYY')}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton onClick={handlePrevMonth} sx={{ bgcolor: 'background.paper', boxShadow: 1 }}>
                            <ChevronLeft />
                        </IconButton>
                        <Button 
                            variant="outlined" 
                            size="small" 
                            onClick={() => setCurrentDate(dayjs())}
                            sx={{ borderRadius: '10px', fontWeight: 700, px: 2 }}
                        >
                            Today
                        </Button>
                        <IconButton onClick={handleNextMonth} sx={{ bgcolor: 'background.paper', boxShadow: 1 }}>
                            <ChevronRight />
                        </IconButton>
                    </Box>
                </Box>

                {/* Calendar Grid */}
                <Box sx={{ p: 3 }}>
                    <Grid container spacing={1}>
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <Grid item xs={12 / 7} key={day} sx={{ textAlign: 'center', pb: 2 }}>
                                <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase' }}>
                                    {day}
                                </Typography>
                            </Grid>
                        ))}
                        {daysInMonth.map((date, index) => {
                            if (!date) return <Grid item xs={12 / 7} key={`pad-${index}`} />;
                            
                            const state = getDayState(date);
                            const isToday = date.isSame(dayjs(), 'day');
                            const isPast = date.isBefore(dayjs(), 'day');

                            return (
                                <Grid item xs={12 / 7} key={date.toString()}>
                                    <Paper
                                        onClick={() => !isPast && handleDateClick(date)}
                                        sx={{
                                            height: { xs: 80, md: 120 },
                                            p: 1,
                                            cursor: isPast ? 'default' : 'pointer',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            position: 'relative',
                                            transition: 'all 0.2s ease',
                                            border: `1px solid ${isToday ? theme.palette.primary.main : alpha(theme.palette.divider, 0.05)}`,
                                            bgcolor: isPast ? alpha(theme.palette.action.disabledBackground, 0.3) : 'background.paper',
                                            '&:hover': {
                                                transform: isPast ? 'none' : 'translateY(-2px)',
                                                boxShadow: isPast ? 'none' : theme.shadows[4],
                                                borderColor: isPast ? 'none' : theme.palette.primary.main
                                            },
                                            ...(state?.isBlocked && {
                                                bgcolor: alpha(state.isBooking ? theme.palette.success.main : theme.palette.error.main, 0.05),
                                                borderColor: alpha(state.isBooking ? theme.palette.success.main : theme.palette.error.main, 0.2),
                                            })
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography 
                                                variant="body2" 
                                                sx={{ 
                                                    fontWeight: isToday ? 900 : 600, 
                                                    color: isToday ? 'primary.main' : 'text.primary',
                                                    opacity: isPast ? 0.4 : 1
                                                }}
                                            >
                                                {date.date()}
                                            </Typography>
                                            {state?.isBlocked && (
                                                <Tooltip title={state.reason}>
                                                    {state.isBooking ? <EventAvailable color="success" sx={{ fontSize: 16 }} /> : <Block color="error" sx={{ fontSize: 16 }} />}
                                                </Tooltip>
                                            )}
                                        </Box>
                                        
                                        {state?.isBlocked && (
                                            <Box>
                                                <Typography 
                                                    variant="caption" 
                                                    sx={{ 
                                                        fontSize: '0.65rem', 
                                                        fontWeight: 800, 
                                                        color: state.isBooking ? 'success.main' : 'error.main',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden'
                                                    }}
                                                >
                                                    {state.reason}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Paper>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
            </DashboardCard>

            {/* Block Date Dialog */}
            <Dialog 
                open={isDialogOpen} 
                onClose={() => setIsDialogOpen(false)}
                PaperProps={{
                    sx: { borderRadius: '20px', p: 1, maxWidth: '400px' }
                }}
            >
                <DialogTitle sx={{ fontWeight: 900, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Block Date
                    <IconButton onClick={() => setIsDialogOpen(false)} size="small"><Close /></IconButton>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                        You are blocking <strong>{selectedDate?.format('DD MMMM YYYY')}</strong>. Customers will not be able to book you on this day.
                    </Typography>
                    <TextField
                        fullWidth
                        label="Reason for blocking"
                        placeholder="e.g. Personal holiday, Fully booked externally"
                        value={blockReason}
                        onChange={(e) => setBlockReason(e.target.value)}
                        sx={{ mt: 1 }}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setIsDialogOpen(false)} sx={{ fontWeight: 700 }}>Cancel</Button>
                    <Button 
                        onClick={handleBlock} 
                        variant="contained" 
                        sx={{ borderRadius: '10px', px: 3, fontWeight: 800 }}
                    >
                        Block Date
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default VendorCalendar;
