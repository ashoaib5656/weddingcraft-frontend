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
    Divider
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
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>Reports listing</Typography>

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
                                        <Typography sx={{ fontWeight: 800, fontSize: '1rem' }}>{report.title}</Typography>
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
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Recent Report Requests</Typography>
                    <List disablePadding>
                        {[1, 2, 3].map((_, i) => (
                            <Box key={i}>
                                <ListItem sx={{ py: 2 }}>
                                    <ListItemIcon sx={{ minWidth: 40 }}>
                                        <ReportIcon color="action" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`Custom Report Request #${1024 + i}`}
                                        secondary="Requested by Admin • Processing"
                                        primaryTypographyProps={{ fontWeight: 700, fontSize: '0.9rem' }}
                                    />
                                    <Typography 
                                        variant="caption" 
                                        sx={{ 
                                            fontWeight: 900, 
                                            color: 'text.disabled', 
                                            textTransform: 'uppercase', 
                                            fontSize: '0.65rem' 
                                        }}
                                    >
                                        Queued
                                    </Typography>
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

// Mock IconButton
const IconButton = ({ children }: any) => {
    const theme = useTheme();
    return (
        <Box
            component="button"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 0.5,
                borderRadius: 1,
                border: 'none',
                bgcolor: 'transparent',
                cursor: 'pointer',
                '&:hover': { bgcolor: alpha(theme.palette.text.primary, 0.05) }
            }}
        >
            {children}
        </Box>
    );
};

export default Reports;
