import {
    Box,
    Typography,
    Grid,
    alpha,
    useTheme,
    LinearProgress,
} from '@mui/material';
import {
    TrendingUp as TrendingUpIcon,
    People as PeopleIcon,
    AttachMoney as MoneyIcon,
    Store as StoreIcon,
    ArrowUpward as ArrowUpIcon,
    ArrowDownward as ArrowDownIcon
} from '@mui/icons-material';
import DashboardHeader from '../../components/Dashboard/DashboardHeader/DashboardHeader';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';

const AnalyticsPage = () => {
    const theme = useTheme();

    const stats = [
        { label: 'Total Revenue', value: '₹12,45,000', change: '+12.5%', trend: 'up', icon: <MoneyIcon />, color: '#22c55e' },
        { label: 'Active Vendors', value: '142', change: '+5.2%', trend: 'up', icon: <StoreIcon />, color: '#7c3aed' },
        { label: 'Total Clients', value: '850', change: '+18.1%', trend: 'up', icon: <PeopleIcon />, color: '#0ea5e9' },
        { label: 'Conversion Rate', value: '24.5%', change: '-2.4%', trend: 'down', icon: <TrendingUpIcon />, color: '#f59e0b' },
    ];

    return (
        <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 1600, margin: '0 auto' }}>
            <DashboardHeader
                title="Analytics & Reports"
                subtitle="Monitor business growth, revenue, and platform performance."
                tag="Insights"
            />

            <Grid container spacing={3} sx={{ mb: 4 }}>
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={6} lg={3} key={index}>
                        <DashboardCard>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', mb: 0.5 }}>
                                        {stat.label}
                                    </Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                                        {stat.value}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        {stat.trend === 'up' ? (
                                            <ArrowUpIcon sx={{ fontSize: 16, color: 'success.main' }} />
                                        ) : (
                                            <ArrowDownIcon sx={{ fontSize: 16, color: 'error.main' }} />
                                        )}
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontWeight: 700,
                                                color: stat.trend === 'up' ? 'success.main' : 'error.main'
                                            }}
                                        >
                                            {stat.change}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', ml: 0.5 }}>vs last month</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    p: 1.5,
                                    borderRadius: 3,
                                    bgcolor: alpha(stat.color, 0.1),
                                    color: stat.color,
                                    display: 'flex'
                                }}>
                                    {stat.icon}
                                </Box>
                            </Box>
                        </DashboardCard>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                    <DashboardCard sx={{ height: 400 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                            <Typography sx={{ fontWeight: 800 }}>Revenue Growth (Last 6 Months)</Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'primary.main' }} />
                                    <Typography variant="caption" sx={{ fontWeight: 600 }}>Revenue</Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* Visual placeholder for chart */}
                        <Box sx={{ height: 280, display: 'flex', alignItems: 'flex-end', gap: 2, px: 2 }}>
                            {[60, 45, 75, 50, 90, 85].map((height, i) => (
                                <Box key={i} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{
                                        width: '100%',
                                        height: `${height}%`,
                                        bgcolor: alpha(theme.palette.primary.main, 0.2),
                                        borderRadius: '8px 8px 0 0',
                                        position: 'relative',
                                        transition: '0.3s',
                                        '&:hover': { bgcolor: 'primary.main' }
                                    }}>
                                        <Box sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '30%',
                                            bgcolor: 'primary.main',
                                            borderRadius: i === 0 || i === 5 ? '8px 8px 0 0' : 0,
                                            opacity: 0.8
                                        }} />
                                    </Box>
                                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </DashboardCard>
                </Grid>

                <Grid item xs={12} lg={4}>
                    <DashboardCard sx={{ height: 400 }}>
                        <Typography sx={{ fontWeight: 800, mb: 4 }}>Top Categories</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            {[
                                { name: 'Venues', value: 45, color: '#7c3aed' },
                                { name: 'Catering', value: 30, color: '#6366f1' },
                                { name: 'Photography', value: 15, color: '#0ea5e9' },
                                { name: 'Decoration', value: 10, color: '#22c55e' }
                            ].map((category, i) => (
                                <Box key={i}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="caption" sx={{ fontWeight: 700 }}>{category.name}</Typography>
                                        <Typography variant="caption" sx={{ fontWeight: 700 }}>{category.value}%</Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={category.value}
                                        sx={{
                                            height: 8,
                                            borderRadius: 4,
                                            bgcolor: alpha(category.color, 0.1),
                                            '& .MuiLinearProgress-bar': { bgcolor: category.color, borderRadius: 4 }
                                        }}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </DashboardCard>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AnalyticsPage;
