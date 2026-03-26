import {
    Box,
    Typography,
    Grid,
    alpha,
    useTheme,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    IconButton
} from '@mui/material';
import {
    Description as ReportIcon,
    Download as DownloadIcon,
    ChevronRight as ChevronIcon,
    Timeline as TimelineIcon,
    Assessment as AssessmentIcon,
    PieChart as PieIcon
} from '@mui/icons-material';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';

const Reports = () => {
    const theme = useTheme();

    const reportTypes = [
        { title: 'Monthly Performance Review', date: 'Feb 2025', size: '2.4 MB', icon: <TimelineIcon /> },
        { title: 'Client Feedback Analysis', date: 'Jan 2025', size: '1.8 MB', icon: <AssessmentIcon /> },
        { title: 'Vendor Payout Summary', date: 'Q1 2025', size: '3.1 MB', icon: <PieIcon /> },
        { title: 'System Health Report', date: 'Weekly', size: '512 KB', icon: <ReportIcon /> },
    ];

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
                Analytics Reports
            </Typography>

            <Grid container spacing={3}>
                {reportTypes.map((report, index) => (
                    <Grid item xs={12} key={index}>
                        <DashboardCard sx={{ p: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                                    <Box sx={{
                                        p: 1.5,
                                        borderRadius: 3,
                                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                                        color: 'primary.main',
                                        display: 'flex'
                                    }}>
                                        {report.icon}
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{report.title}</Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                            {report.date} • {report.size}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button startIcon={<DownloadIcon />} variant="outlined" size="small" sx={{ borderRadius: 2 }}>Download</Button>
                                    <IconButton size="small"><ChevronIcon /></IconButton>
                                </Box>
                            </Box>
                        </DashboardCard>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: 5 }}>
                <DashboardCard>
                    <Typography variant="h5" sx={{ fontWeight: 900, mb: 3, color: 'text.primary' }}>Recent Report Requests</Typography>
                    <List disablePadding>
                        {[1, 2, 3].map((_, i) => (
                            <Box key={i}>
                                <ListItem 
                                    sx={{ py: 2 }}
                                    secondaryAction={
                                        <Typography 
                                            variant="overline" 
                                            sx={{ 
                                                fontWeight: 900, 
                                                color: 'text.disabled', 
                                                fontSize: '0.75rem' 
                                            }}
                                        >
                                            Queued
                                        </Typography>
                                    }
                                >
                                    <ListItemIcon sx={{ minWidth: 40 }}>
                                        <ReportIcon color="action" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`Custom Report Request #${1024 + i}`}
                                        secondary="Requested by Admin • Processing"
                                        primaryTypographyProps={{ variant: 'subtitle2', sx: { fontWeight: 700 } }}
                                    />
                                </ListItem>
                                {i < 2 && <Divider />}
                            </Box>
                        ))}
                    </List>
                </DashboardCard>
            </Box>
        </Box>
    );
};

export default Reports;
