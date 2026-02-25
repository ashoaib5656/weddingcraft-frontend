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
    AttachMoney as MoneyIcon,
    ArrowUpward as ArrowUpIcon,
    AccountBalance as BankIcon,
    Savings as SavingsIcon
} from '@mui/icons-material';
import DashboardHeader from '../../components/Dashboard/DashboardHeader/DashboardHeader';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';

const Revenue = () => {
    const theme = useTheme();

    const financeStats = [
        { label: 'Platform Revenue', value: '₹52,14,000', change: '+22%', icon: <MoneyIcon />, color: '#22c55e' },
        { label: 'Booking Fees', value: '₹12,45,000', change: '+18.5%', icon: <TrendingUpIcon />, color: '#7c3aed' },
        { label: 'Pending Payouts', value: '₹8,30,000', change: '12 Vendors', icon: <BankIcon />, color: '#f59e0b' },
        { label: 'Net Profit', value: '₹31,40,000', change: '+14%', icon: <SavingsIcon />, color: '#0ea5e9' },
    ];

    return (
        <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 1600, margin: '0 auto' }}>
            <DashboardHeader
                title="Revenue & Analytics"
                subtitle="Detailed financial overview of the WedsPot platform performance."
                tag="Financials"
            />

            <Grid container spacing={3} sx={{ mb: 4 }}>
                {financeStats.map((stat, index) => (
                    <Grid item xs={12} sm={6} lg={3} key={index}>
                        <DashboardCard>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{
                                    p: 1.5,
                                    borderRadius: 3,
                                    bgcolor: alpha(stat.color, 0.1),
                                    color: stat.color,
                                    display: 'flex'
                                }}>
                                    {stat.icon}
                                </Box>
                                <Box>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block' }}>
                                        {stat.label}
                                    </Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'success.main', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <ArrowUpIcon sx={{ fontSize: 12 }} /> {stat.change}
                                    </Typography>
                                </Box>
                            </Box>
                        </DashboardCard>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                    <DashboardCard sx={{ height: 400 }}>
                        <Typography sx={{ fontWeight: 800, mb: 4 }}>Revenue Trend (Annual)</Typography>
                        <Box sx={{ height: 300, display: 'flex', alignItems: 'flex-end', gap: 1.5, px: 2 }}>
                            {[30, 45, 60, 40, 70, 85, 95, 80, 75, 90, 100, 110].map((h, i) => (
                                <Box key={i} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{
                                        width: '100%',
                                        height: `${(h / 110) * 100}%`,
                                        bgcolor: alpha(theme.palette.primary.main, 0.15),
                                        borderRadius: '6px 6px 0 0',
                                        transition: '0.3s',
                                        '&:hover': { bgcolor: 'primary.main' }
                                    }} />
                                    <Typography variant="caption" sx={{ fontSize: '0.65rem', fontWeight: 700, color: 'text.secondary' }}>
                                        {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </DashboardCard>
                </Grid>

                <Grid item xs={12} lg={4}>
                    <DashboardCard sx={{ height: 400 }}>
                        <Typography sx={{ fontWeight: 800, mb: 4 }}>Revenue Sources</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            {[
                                { name: 'Subscription Fees', value: 35, color: '#7c3aed' },
                                { name: 'Booking Commission', value: 45, color: '#22c55e' },
                                { name: 'Featured Listings', value: 15, color: '#0ea5e9' },
                                { name: 'Ads/Promotions', value: 5, color: '#f59e0b' }
                            ].map((src, i) => (
                                <Box key={i}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                                        <Typography variant="caption" sx={{ fontWeight: 700 }}>{src.name}</Typography>
                                        <Typography variant="caption" sx={{ fontWeight: 700 }}>{src.value}%</Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={src.value}
                                        sx={{
                                            height: 10,
                                            borderRadius: 5,
                                            bgcolor: alpha(src.color, 0.1),
                                            '& .MuiLinearProgress-bar': { bgcolor: src.color, borderRadius: 5 }
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

export default Revenue;
