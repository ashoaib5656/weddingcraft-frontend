import React, { useState } from "react";
import {
    Box,
    Typography,
    Grid,
    TextField,
    InputAdornment,
    IconButton,
    Button,
    alpha,
    useTheme
} from "@mui/material";
import {
    Visibility as EyeIcon,
    VisibilityOff as EyeOffIcon
} from "@mui/icons-material";

const SecuritySection: React.FC = () => {
    const theme = useTheme();
    const [showCurrentPass, setShowCurrentPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    return (
        <Box>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 900, color: 'text.primary', letterSpacing: '-0.03em', mb: 0.5 }}>
                    Security & Privacy
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Keep your account secure by updating your password regularly.
                </Typography>
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Current Password"
                        type={showCurrentPass ? 'text' : 'password'}
                        defaultValue="yourpassword123"
                        size="small"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton 
                                        onClick={() => setShowCurrentPass(!showCurrentPass)} 
                                        onMouseDown={(e) => e.preventDefault()}
                                        size="small"
                                    >
                                        {showCurrentPass ? <EyeOffIcon fontSize="small" /> : <EyeIcon fontSize="small" />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: { borderRadius: '10px', fontWeight: 500 }
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="New Password"
                        type={showNewPass ? 'text' : 'password'}
                        placeholder="Min 12 characters"
                        size="small"
                        InputProps={{ 
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton 
                                        onClick={() => setShowNewPass(!showNewPass)} 
                                        onMouseDown={(e) => e.preventDefault()}
                                        size="small"
                                    >
                                        {showNewPass ? <EyeOffIcon fontSize="small" /> : <EyeIcon fontSize="small" />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: { borderRadius: '10px', fontWeight: 500 } 
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Confirm New Password"
                        type={showConfirmPass ? 'text' : 'password'}
                        placeholder="Repeat new password"
                        size="small"
                        InputProps={{ 
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton 
                                        onClick={() => setShowConfirmPass(!showConfirmPass)} 
                                        onMouseDown={(e) => e.preventDefault()}
                                        size="small"
                                    >
                                        {showConfirmPass ? <EyeOffIcon fontSize="small" /> : <EyeIcon fontSize="small" />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: { borderRadius: '10px', fontWeight: 500 } 
                        }}
                    />
                </Grid>
            </Grid>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button 
                    variant="contained" 
                    size="medium" 
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
                    Update Password
                </Button>
            </Box>
        </Box>
    );
};

export default SecuritySection;
