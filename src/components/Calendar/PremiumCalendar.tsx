import React, { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Button,
    Grid,
    alpha,
    useTheme,
    Tooltip,
    Popover
} from '@mui/material';
import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    CalendarMonth as CalendarIcon,
    LocationOn as LocationIcon,
    Person as PersonIcon
} from '@mui/icons-material';
import dayjs from 'dayjs';

interface Booking {
    id: string;
    title: string;
    client: string;
    vendor: string;
    date: string;
    amount: string;
    status: string;
}

interface PremiumCalendarProps {
    bookings: Booking[];
}

const PremiumCalendar: React.FC<PremiumCalendarProps> = ({ bookings }) => {
    const theme = useTheme();
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [jumpAnchorEl, setJumpAnchorEl] = useState<HTMLElement | null>(null);
    const [tempJumpDate, setTempJumpDate] = useState<string>('');
    const [selectedDateBookings, setSelectedDateBookings] = useState<Booking[]>([]);

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Calculate month days
    const startOfMonth = currentDate.startOf('month');
    const endOfMonth = currentDate.endOf('month');
    const startOfWeek = startOfMonth.startOf('week');
    const endOfWeek = endOfMonth.endOf('week');

    const calendarGrid = useMemo(() => {
        const days = [];
        let day = startOfWeek;
        while (day.isBefore(endOfWeek) || day.isSame(endOfWeek)) {
            days.push(day);
            day = day.add(1, 'day');
        }
        return days;
    }, [startOfWeek, endOfWeek]);

    const handlePrevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
    const handleNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));
    const handleToday = () => setCurrentDate(dayjs());

    const handleCellClick = (event: React.MouseEvent<HTMLElement>, date: dayjs.Dayjs) => {
        const dateStr = date.format('YYYY-MM-DD');
        const bookingsOnDate = bookings.filter(b => b.date === dateStr);
        if (bookingsOnDate.length > 0) {
            setSelectedDateBookings(bookingsOnDate);
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClosePopover = () => setAnchorEl(null);

    const handleOpenJump = (event: React.MouseEvent<HTMLElement>) => {
        setTempJumpDate(currentDate.format('YYYY-MM-DD'));
        setJumpAnchorEl(event.currentTarget);
    };

    const handleJumpSubmit = () => {
        const newDate = dayjs(tempJumpDate);
        if (newDate.isValid()) {
            setCurrentDate(newDate);
            setJumpAnchorEl(null);
        }
    };

    return (
        <Box sx={{ bgcolor: 'background.paper', borderRadius: '24px', border: '1px solid', borderColor: alpha(theme.palette.divider, 0.1), overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            {/* Header */}
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: alpha(theme.palette.divider, 0.05) }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
                            {currentDate.format('MMMM YYYY')}
                        </Typography>
                        <Tooltip title="Jump to Date">
                            <IconButton 
                                size="small" 
                                onClick={handleOpenJump}
                                sx={{ 
                                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                                    color: 'primary.main',
                                    '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) }
                                }}
                            >
                                <CalendarIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 0.5, bgcolor: alpha(theme.palette.divider, 0.05), p: 0.5, borderRadius: '12px' }}>
                        <IconButton size="small" onClick={handlePrevMonth} sx={{ borderRadius: '10px' }}><ChevronLeftIcon /></IconButton>
                        <IconButton size="small" onClick={handleNextMonth} sx={{ borderRadius: '10px' }}><ChevronRightIcon /></IconButton>
                    </Box>
                </Box>
                <Button 
                    variant="outlined" 
                    size="small" 
                    onClick={handleToday}
                    sx={{ borderRadius: '12px', fontWeight: 700, textTransform: 'none', px: 2 }}
                >
                    Today
                </Button>
            </Box>

            {/* Jump to Date Popover */}
            <Popover
                open={Boolean(jumpAnchorEl)}
                anchorEl={jumpAnchorEl}
                onClose={() => setJumpAnchorEl(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                PaperProps={{
                    sx: {
                        p: 2,
                        borderRadius: '20px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                        border: '1px solid',
                        borderColor: alpha(theme.palette.divider, 0.1),
                        mt: 1,
                        width: 240
                    }
                }}
            >
                <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5 }}>Select Month & Year</Typography>
                <Box 
                    component="input"
                    type="date"
                    value={tempJumpDate}
                    onChange={(e) => setTempJumpDate(e.target.value)}
                    sx={{
                        width: '100%',
                        p: 1.5,
                        borderRadius: '12px',
                        border: '1px solid',
                        borderColor: alpha(theme.palette.divider, 0.2),
                        outline: 'none',
                        fontFamily: theme.typography.fontFamily,
                        fontSize: '14px',
                        mb: 2,
                        transition: 'all 0.2s',
                        '&:focus': {
                            borderColor: theme.palette.primary.main,
                            boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`
                        }
                    }}
                />
                <Button 
                    fullWidth 
                    variant="contained" 
                    size="small" 
                    onClick={handleJumpSubmit}
                    sx={{ 
                        borderRadius: '10px', 
                        fontWeight: 700, 
                        textTransform: 'none',
                        boxShadow: 'none'
                    }}
                >
                    Set Date
                </Button>
            </Popover>

            {/* Days of Week */}
            <Grid container columns={7}>
                {daysOfWeek.map(day => (
                    <Grid item xs={1} key={day} sx={{ py: 2, textAlign: 'center', borderBottom: '1px solid', borderColor: alpha(theme.palette.divider, 0.05) }}>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '10px' }}>
                            {day}
                        </Typography>
                    </Grid>
                ))}
            </Grid>

            {/* Calendar Cells */}
            <Grid container columns={7}>
                {calendarGrid.map((date, index) => {
                    const isCurrentMonth = date.isSame(currentDate, 'month');
                    const isToday = date.isSame(dayjs(), 'day');
                    const dateStr = date.format('YYYY-MM-DD');
                    const dayBookings = bookings.filter(b => b.date === dateStr);

                    return (
                        <Grid item xs={1} key={index} sx={{ 
                            height: { xs: 80, md: 120 },
                            borderRight: (index + 1) % 7 === 0 ? 'none' : '1px solid',
                            borderBottom: '1px solid',
                            borderColor: alpha(theme.palette.divider, 0.05),
                            p: 1,
                            transition: 'all 0.2s',
                            cursor: dayBookings.length > 0 ? 'pointer' : 'default',
                            bgcolor: isCurrentMonth ? 'transparent' : alpha(theme.palette.divider, 0.02),
                            position: 'relative',
                            '&:hover': {
                                bgcolor: dayBookings.length > 0 ? alpha(theme.palette.primary.main, 0.02) : undefined
                            }
                        }}
                        onClick={(e) => handleCellClick(e, date)}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Typography sx={{ 
                                    fontSize: '13px', 
                                    fontWeight: isToday ? 900 : 600,
                                    color: isToday ? 'primary.main' : isCurrentMonth ? 'text.primary' : 'text.disabled',
                                    bgcolor: isToday ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                                    width: 28,
                                    height: 28,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '8px'
                                }}>
                                    {date.date()}
                                </Typography>
                            </Box>

                            {/* Event Markers */}
                            <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                {dayBookings.slice(0, 3).map((booking, i) => (
                                    <Box key={i} sx={{ 
                                        px: 1, 
                                        py: 0.25, 
                                        borderRadius: '4px', 
                                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                                        borderLeft: `3px solid ${theme.palette.primary.main}`
                                    }}>
                                        <Typography noWrap sx={{ fontSize: '9px', fontWeight: 700, color: 'primary.main' }}>
                                            {booking.title}
                                        </Typography>
                                    </Box>
                                ))}
                                {dayBookings.length > 3 && (
                                    <Typography sx={{ fontSize: '9px', fontWeight: 700, color: 'text.disabled', pl: 1 }}>
                                        + {dayBookings.length - 3} more
                                    </Typography>
                                )}
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Event Detail Popover */}
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                PaperProps={{
                    sx: {
                        borderRadius: '20px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                        border: '1px solid',
                        borderColor: alpha(theme.palette.divider, 0.1),
                        width: 320,
                        mt: 1,
                        p: 0,
                        overflow: 'hidden'
                    }
                }}
            >
                <Box sx={{ p: 2, bgcolor: alpha(theme.palette.primary.main, 0.05), borderBottom: '1px solid', borderColor: alpha(theme.palette.divider, 0.05) }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Events on {dayjs(selectedDateBookings[0]?.date).format('MMMM D, YYYY')}</Typography>
                </Box>
                <Box sx={{ p: 1 }}>
                    {selectedDateBookings.map((booking, index) => (
                        <Box key={index} sx={{ 
                            p: 2, 
                            mb: index === selectedDateBookings.length - 1 ? 0 : 1,
                            borderRadius: '16px',
                            '&:hover': { bgcolor: alpha(theme.palette.divider, 0.03) }
                        }}>
                            <Typography sx={{ fontWeight: 800, fontSize: '0.9rem', mb: 1, color: 'primary.main' }}>{booking.title}</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <PersonIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                                    <Typography variant="caption" sx={{ fontWeight: 600 }}>{booking.client}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <LocationIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                                    <Typography variant="caption" sx={{ fontWeight: 600 }}>{booking.vendor}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                                    <Typography sx={{ fontWeight: 800, fontSize: '12px' }}>{booking.amount}</Typography>
                                    <Typography sx={{ 
                                        fontWeight: 900, 
                                        fontSize: '9px', 
                                        color: 'success.main', 
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>
                                        {booking.status}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Popover>
        </Box>
    );
};

export default PremiumCalendar;
