import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  TextField,
  Tabs,
  Tab,
  IconButton,
  InputAdornment,
  Divider,
  Chip,
  Paper
} from "@mui/material";
import {
  Person as PersonIcon,
  Shield as ShieldIcon,
  Settings as SettingsIcon,
  Notifications as BellIcon,
  Lock as LockIcon,
  Launch as ExternalLinkIcon,
  ChevronRight as ChevronRightIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  ArrowForward as ArrowRightIcon,
  Visibility as EyeIcon,
  VisibilityOff as EyeOffIcon,
  Delete as Trash2Icon,
  Warning as AlertTriangleIcon
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import { getInitials } from "../../utils/userUtils";

const UserProfile: React.FC = () => {
  const { role, userName } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const glassStyle = {
    background: 'var(--dash-glass)',
    backdropFilter: 'blur(16px) saturate(180%)',
    border: '1px solid var(--dash-glass-border)',
    boxShadow: 'var(--dash-shadow-md)',
    borderRadius: 'var(--border-radius-xl)',
    transition: 'var(--transition-ultra)',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-8px) scale(1.005)',
      boxShadow: 'var(--dash-shadow-lg)',
      borderColor: 'rgba(99, 102, 241, 0.3)',
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 5, animation: 'fadeInUp 0.6s ease-out' }}>
      {/* Premium Header Card */}
      <Card sx={{ ...glassStyle, mb: 4, transform: 'none', '&:hover': { transform: 'translateY(-4px)' } }}>
        <Box
          sx={{
            height: 180,
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            position: 'relative'
          }}
        >
          <Box className="banner-glass-overlay" sx={{ position: 'absolute', inset: 0, opacity: 0.1 }} />
        </Box>
        <CardContent sx={{ pt: 0, px: 4, pb: 4, position: 'relative' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: -7, flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                sx={{
                  width: 140,
                  height: 140,
                  fontSize: '3rem',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  border: '6px solid white',
                  boxShadow: '0 12px 40px rgba(99, 102, 241, 0.3)',
                  borderRadius: '24px'
                }}
              >
                {getInitials(userName || role || "")}
              </Avatar>
              <Box
                className="avatar-badge-online"
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  width: 16,
                  height: 16,
                  bgcolor: '#10b981',
                  border: '3px solid white',
                  borderRadius: '50%'
                }}
              />
            </Box>
            <Box sx={{ flexGrow: 1, pb: 2 }}>
              <Typography variant="h3" sx={{ fontWeight: 800, color: 'var(--dash-text)', mb: 1 }}>
                {userName || role}
              </Typography>
              <Chip
                icon={<ShieldIcon sx={{ fontSize: '1rem !important' }} />}
                label={`${role} Level`}
                sx={{
                  bgcolor: 'var(--dash-accent-soft)',
                  color: 'var(--dash-accent)',
                  fontWeight: 600,
                  borderRadius: '8px',
                  px: 1
                }}
              />
            </Box>
            <Box sx={{ pb: 2 }}>
              <Button
                variant="contained"
                endIcon={<ArrowRightIcon />}
                sx={{
                  borderRadius: '12px',
                  px: 3,
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                View Analytics
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={4}>
        {/* Navigation - Left */}
        <Grid item xs={12} md={4}>
          <Card sx={{ ...glassStyle, height: '100%', p: 1 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <SettingsIcon color="primary" sx={{ fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Control Center</Typography>
              </Box>

              <Tabs
                orientation="vertical"
                value={activeTab}
                onChange={handleTabChange}
                sx={{
                  '& .MuiTabs-indicator': { display: 'none' },
                  '& .MuiTab-root': {
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: 56,
                    borderRadius: '12px',
                    mb: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: 'var(--dash-text-muted)',
                    transition: 'all 0.3s ease',
                    px: 2,
                    '&.Mui-selected': {
                      bgcolor: 'var(--dash-accent-soft)',
                      color: 'var(--dash-accent)',
                    },
                    '&:hover': {
                      bgcolor: 'rgba(99, 102, 241, 0.04)',
                    }
                  }
                }}
              >
                <Tab
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <PersonIcon fontSize="small" />
                        <span>General Profile</span>
                      </Box>
                      <ChevronRightIcon fontSize="small" />
                    </Box>
                  }
                />
                <Tab
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <LockIcon fontSize="small" />
                        <span>Security Matrix</span>
                      </Box>
                      <ChevronRightIcon fontSize="small" />
                    </Box>
                  }
                />
                <Tab
                  disabled
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <BellIcon fontSize="small" />
                        <span>Alert Protocols</span>
                      </Box>
                      <ChevronRightIcon fontSize="small" />
                    </Box>
                  }
                />
                <Tab
                  disabled
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <ExternalLinkIcon fontSize="small" />
                        <span>API Connections</span>
                      </Box>
                      <ChevronRightIcon fontSize="small" />
                    </Box>
                  }
                />
              </Tabs>
            </CardContent>
          </Card>
        </Grid>

        {/* Content Area - Right */}
        <Grid item xs={12} md={8}>
          <Card sx={glassStyle}>
            <CardContent sx={{ p: 4 }}>
              {activeTab === 0 ? (
                <Box sx={{ animation: 'fadeInRight 0.4s ease-out' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
                    <PersonIcon color="primary" sx={{ fontSize: 28 }} />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Account Details</Typography>
                  </Box>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'var(--dash-text-muted)' }}>Full Name</Typography>
                      <TextField
                        fullWidth
                        defaultValue={userName || ""}
                        placeholder="Your Name"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon fontSize="small" color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'var(--dash-text-muted)' }}>Email Node</Typography>
                      <TextField
                        fullWidth
                        defaultValue="admin@weddingcraft.com"
                        placeholder="Email Address"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MailIcon fontSize="small" color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'var(--dash-text-muted)' }}>Contact Line</Typography>
                      <TextField
                        fullWidth
                        defaultValue="+91 98765 43210"
                        placeholder="Phone Number"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIcon fontSize="small" color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'var(--dash-text-muted)' }}>Operation Base</Typography>
                      <TextField
                        fullWidth
                        defaultValue="Mumbai, India"
                        placeholder="Location"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SettingsIcon fontSize="small" color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: '12px',
                        px: 4,
                        py: 1,
                        textTransform: 'none',
                        fontWeight: 600,
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      }}
                    >
                      Sync Updates
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ animation: 'fadeInRight 0.4s ease-out' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
                    <LockIcon color="primary" sx={{ fontSize: 28 }} />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Credential Management</Typography>
                  </Box>

                  <Box sx={{ mb: 4 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'var(--dash-text-muted)' }}>Current Authentication Code</Typography>
                    <TextField
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon fontSize="small" color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                              {showPassword ? <EyeOffIcon fontSize="small" /> : <EyeIcon fontSize="small" />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                    />
                  </Box>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'var(--dash-text-muted)' }}>New Password Node</Typography>
                      <TextField
                        fullWidth
                        type="password"
                        placeholder="Min 12 characters"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <ShieldIcon fontSize="small" color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'var(--dash-text-muted)' }}>Confirm New Node</Typography>
                      <TextField
                        fullWidth
                        type="password"
                        placeholder="Repeat password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <ShieldIcon fontSize="small" color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: '12px',
                        px: 4,
                        py: 1,
                        textTransform: 'none',
                        fontWeight: 600,
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      }}
                    >
                      Update Security Ledger
                    </Button>
                  </Box>
                </Box>
              )}

              {/* Industry Standard Danger Zone */}
              <Paper
                elevation={0}
                sx={{
                  mt: 6,
                  p: 3,
                  borderRadius: '16px',
                  bgcolor: 'rgba(239, 68, 68, 0.05)',
                  border: '1px solid rgba(239, 68, 68, 0.2)'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <AlertTriangleIcon sx={{ color: '#ef4444' }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#ef4444' }}>Danger Protocol Area</Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'var(--dash-text-muted)', mb: 3 }}>
                  The following actions are destructive and cannot be reversed. Please proceed with absolute caution.
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>Wipe Local Instance</Typography>
                      <Typography variant="caption" sx={{ color: 'var(--dash-text-muted)' }}>Clear all cached operational data and history logs.</Typography>
                    </Box>
                    <Button variant="outlined" color="error" sx={{ borderRadius: '10px', textTransform: 'none' }}>Correct Cache</Button>
                  </Box>
                  <Divider sx={{ borderStyle: 'dashed' }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>Terminate Account Ledger</Typography>
                      <Typography variant="caption" sx={{ color: 'var(--dash-text-muted)' }}>Permanently delete your profile and all associated event nodes.</Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<Trash2Icon />}
                      sx={{ borderRadius: '10px', textTransform: 'none' }}
                    >
                      Terminate Profile
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
