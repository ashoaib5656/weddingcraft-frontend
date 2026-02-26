import React, { useState } from "react";
import {
    Box,
    Typography,
    Grid,
    TextField,
    InputAdornment,
    IconButton,
    Button
} from "@mui/material";
import {
    Lock as LockIcon,
    Visibility as EyeIcon,
    VisibilityOff as EyeOffIcon
} from "@mui/icons-material";

const SecuritySection: React.FC = () => {
    const [showPass, setShowPass] = useState(false);

    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Password & Security</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>Manage your security settings and password.</Typography>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', ml: 0.5, mb: 1, display: 'block' }}>CURRENT PASSWORD</Typography>
                    <TextField
                        fullWidth
                        type={showPass ? 'text' : 'password'}
                        defaultValue="********"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><LockIcon fontSize="small" /></InputAdornment>,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPass(!showPass)} size="small">
                                        {showPass ? <EyeOffIcon fontSize="small" /> : <EyeIcon fontSize="small" />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: { borderRadius: 3 }
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', ml: 0.5, mb: 1, display: 'block' }}>NEW PASSWORD</Typography>
                    <TextField
                        fullWidth
                        type="password"
                        placeholder="Min 12 characters"
                        InputProps={{ sx: { borderRadius: 3, px: 1 } }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', ml: 0.5, mb: 1, display: 'block' }}>CONFIRM NEW PASSWORD</Typography>
                    <TextField
                        fullWidth
                        type="password"
                        placeholder="Repeat new password"
                        InputProps={{ sx: { borderRadius: 3, px: 1 } }}
                    />
                </Grid>
            </Grid>
            <Box sx={{ mt: 5, display: 'flex', justifyContent: 'flex-end', mb: 5 }}>
                <Button variant="contained" color="secondary" size="large" sx={{ borderRadius: 3, px: 6, py: 1.5, fontWeight: 800 }}>Update Password</Button>
            </Box>
        </Box>
    );
};

export default SecuritySection;
