import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Grid,
    TextField,
    Button,
    CircularProgress,
    Alert,
    Divider,
    IconButton,
    InputAdornment,
    alpha,
    useTheme
} from "@mui/material";
import {
    Visibility as EyeIcon,
    VisibilityOff as EyeOffIcon
} from "@mui/icons-material";
import USER_SERVICE, { type User } from "../../../api/services/users";
import { useAuth } from "../../../contexts/Auth/useAuth";

const GeneralSection: React.FC = () => {
    const theme = useTheme();
    const { role } = useAuth();
    const [profile, setProfile] = useState<Partial<User>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Security States
    const [showCurrentPass, setShowCurrentPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: ""
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await USER_SERVICE.GetProfile();
                const data = response.data.data;
                // Ensure vendorProfile object exists
                if (data.role === "Vendor" && !data.vendorProfile) {
                    data.vendorProfile = {};
                }
                setProfile(data);
            } catch (error) {
                console.error(error);
                setMessage({ type: 'error', text: 'Failed to load profile data.' });
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleVendorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile((prev) => ({
            ...prev,
            vendorProfile: {
                ...prev.vendorProfile,
                [e.target.name]: e.target.value
            }
        }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setIsSaving(true);
        setMessage(null);
        try {
            // Note: In a real app, you might want to call a separate UpdatePassword API if passwords are filled
            await USER_SERVICE.UpdateProfile(profile);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: 'Failed to update profile.' });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}><CircularProgress /></Box>;

    const isVendor = role?.toLowerCase() === 'vendor';

    return (
        <Box>
            <Box sx={{ mb: 2 }}>
                <Typography sx={{ fontWeight: 900, color: 'text.primary', letterSpacing: '-0.03em', mb: 0.5, fontSize: '1.15rem' }}>
                    Profile Information
                </Typography>
            </Box>

            {message && (
                <Alert 
                    severity={message.type} 
                    sx={{ 
                        mb: 2, 
                        borderRadius: '10px', 
                        border: '1px solid',
                        borderColor: message.type === 'success' ? 'success.light' : 'error.light',
                        bgcolor: message.type === 'success' ? alpha('#22c55e', 0.05) : alpha('#ef4444', 0.05),
                        '& .MuiAlert-message': { fontWeight: 600 }
                    }}
                >
                    {message.text}
                </Alert>
            )}

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={profile.name || ""}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        size="small"
                        InputProps={{
                            sx: { 
                                borderRadius: '10px', 
                                fontWeight: 600,
                                fontSize: '0.8rem',
                                '& .MuiInputBase-input': { py: 1.3 }
                            }
                        }}
                        InputLabelProps={{
                            sx: { fontSize: '0.85rem', fontWeight: 600 }
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        value={profile.email || ""}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        size="small"
                        InputProps={{
                            sx: { 
                                borderRadius: '10px', 
                                fontWeight: 600,
                                fontSize: '0.8rem',
                                '& .MuiInputBase-input': { py: 1.3 }
                            }
                        }}
                        InputLabelProps={{
                            sx: { fontSize: '0.85rem', fontWeight: 600 }
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Phone Number"
                        name="phoneNumber"
                        value={profile.phoneNumber || ""}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        size="small"
                        InputProps={{
                            sx: { 
                                borderRadius: '10px', 
                                fontWeight: 600,
                                fontSize: '0.8rem',
                                '& .MuiInputBase-input': { py: 1.3 }
                            }
                        }}
                        InputLabelProps={{
                            sx: { fontSize: '0.85rem', fontWeight: 600 }
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Location"
                        name="location"
                        value={profile.location || ""}
                        onChange={handleChange}
                        placeholder="e.g. Mumbai, India"
                        size="small"
                        InputProps={{
                            sx: { 
                                borderRadius: '10px', 
                                fontWeight: 600,
                                fontSize: '0.8rem',
                                '& .MuiInputBase-input': { py: 1.3 }
                            }
                        }}
                        InputLabelProps={{
                            sx: { fontSize: '0.85rem', fontWeight: 600 }
                        }}
                    />
                </Grid>

                {isVendor && (
                    <>
                        <Grid item xs={12}>
                            <Box sx={{ mt: 1 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary' }}>Business Details</Typography>
                                <Typography variant="caption" color="text.secondary">Configure how your business appears to clients.</Typography>
                            </Box>
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Business Name"
                                name="businessName"
                                value={profile.vendorProfile?.businessName || ""}
                                onChange={handleVendorChange}
                                placeholder="e.g. Elite Events"
                                size="small"
                        InputProps={{
                            sx: { 
                                borderRadius: '10px', 
                                fontWeight: 600,
                                fontSize: '0.8rem',
                                '& .MuiInputBase-input': { py: 1.3 }
                            }
                        }}
                        InputLabelProps={{
                            sx: { fontSize: '0.85rem', fontWeight: 600 }
                        }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Cover Image URL"
                                name="imageUrl"
                                value={profile.vendorProfile?.imageUrl || ""}
                                onChange={handleVendorChange}
                                placeholder="https://example.com/image.jpg"
                                size="small"
                        InputProps={{
                            sx: { 
                                borderRadius: '10px', 
                                fontWeight: 600,
                                fontSize: '0.8rem',
                                '& .MuiInputBase-input': { py: 1.3 }
                            }
                        }}
                        InputLabelProps={{
                            sx: { fontSize: '0.85rem', fontWeight: 600 }
                        }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Price Range"
                                name="priceRange"
                                value={profile.vendorProfile?.priceRange || ""}
                                onChange={handleVendorChange}
                                placeholder="e.g. $500 - $5000"
                                size="small"
                        InputProps={{
                            sx: { 
                                borderRadius: '10px', 
                                fontWeight: 600,
                                fontSize: '0.8rem',
                                '& .MuiInputBase-input': { py: 1.3 }
                            }
                        }}
                        InputLabelProps={{
                            sx: { fontSize: '0.85rem', fontWeight: 600 }
                        }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                label="Business Description"
                                name="description"
                                value={profile.vendorProfile?.description || ""}
                                onChange={handleVendorChange}
                                placeholder="Describe your services to potential clients..."
                        InputProps={{
                            sx: { 
                                borderRadius: '10px', 
                                fontWeight: 600,
                                fontSize: '0.8rem',
                                '& .MuiInputBase-input': { py: 1.3 }
                            }
                        }}
                        InputLabelProps={{
                            sx: { fontSize: '0.85rem', fontWeight: 600 }
                        }}
                            />
                        </Grid>
                    </>
                )}

                {/* Security Section Integrated */}
                <Grid item xs={12}>
                    <Box sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary' }}>Security Settings</Typography>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Current Password"
                        name="current"
                        type={showCurrentPass ? 'text' : 'password'}
                        value={passwords.current}
                        onChange={handlePasswordChange}
                        size="small"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton 
                                        onClick={() => setShowCurrentPass(!showCurrentPass)} 
                                        onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
                                        size="small"
                                    >
                                        {showCurrentPass ? <EyeOffIcon fontSize="small" /> : <EyeIcon fontSize="small" />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: { 
                                borderRadius: '10px', 
                                fontWeight: 600,
                                fontSize: '0.8rem',
                                '& .MuiInputBase-input': { py: 1.3 }
                            }
                        }}
                        InputLabelProps={{
                            sx: { fontSize: '0.85rem', fontWeight: 600 }
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="New Password"
                        name="new"
                        type={showNewPass ? 'text' : 'password'}
                        value={passwords.new}
                        onChange={handlePasswordChange}
                        placeholder="Min 12 characters"
                        size="small"
                        InputProps={{ 
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton 
                                        onClick={() => setShowNewPass(!showNewPass)} 
                                        onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
                                        size="small"
                                    >
                                        {showNewPass ? <EyeOffIcon fontSize="small" /> : <EyeIcon fontSize="small" />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: { 
                                borderRadius: '10px', 
                                fontWeight: 600,
                                fontSize: '0.8rem',
                                '& .MuiInputBase-input': { py: 1.3 }
                            }
                        }}
                        InputLabelProps={{
                            sx: { fontSize: '0.85rem', fontWeight: 600 }
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Confirm New Password"
                        name="confirm"
                        type={showConfirmPass ? 'text' : 'password'}
                        value={passwords.confirm}
                        onChange={handlePasswordChange}
                        placeholder="Repeat new password"
                        size="small"
                        InputProps={{ 
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton 
                                        onClick={() => setShowConfirmPass(!showConfirmPass)} 
                                        onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
                                        size="small"
                                    >
                                        {showConfirmPass ? <EyeOffIcon fontSize="small" /> : <EyeIcon fontSize="small" />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: { 
                                borderRadius: '10px', 
                                fontWeight: 600,
                                fontSize: '0.8rem',
                                '& .MuiInputBase-input': { py: 1.3 }
                            }
                        }}
                        InputLabelProps={{
                            sx: { fontSize: '0.85rem', fontWeight: 600 }
                        }}
                    />
                </Grid>
            </Grid>
            
            <Divider sx={{ my: 2, borderColor: alpha(theme.palette.divider, 0.05) }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                    variant="contained" 
                    size="medium" 
                    onClick={handleSave}
                    disabled={isSaving}
                    sx={{ 
                        borderRadius: '10px', 
                        px: 3, 
                        py: 1, 
                        fontWeight: 800,
                        textTransform: 'none',
                        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
                        minWidth: 150
                    }}
                >
                    {isSaving ? <CircularProgress size={16} color="inherit" /> : 'Update Profile'}
                </Button>
            </Box>
        </Box>
    );
};

export default GeneralSection;
