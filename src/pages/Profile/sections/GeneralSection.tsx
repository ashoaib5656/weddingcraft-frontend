import React from "react";
import {
    Box,
    Typography,
    Grid,
    TextField,
    InputAdornment,
    Button
} from "@mui/material";
import {
    Person as PersonIcon,
    Mail as MailIcon,
    Phone as PhoneIcon,
    Language as GlobeIcon
} from "@mui/icons-material";

interface GeneralSectionProps {
    userName: string | null;
}

const GeneralSection: React.FC<GeneralSectionProps> = ({ userName }) => {
    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Personal Information</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>Update your basic information and contact details.</Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', ml: 0.5, mb: 1, display: 'block' }}>FULL NAME</Typography>
                    <TextField
                        fullWidth
                        defaultValue={userName || ""}
                        placeholder="Enter full name"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><PersonIcon fontSize="small" /></InputAdornment>,
                            sx: { borderRadius: 3 }
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', ml: 0.5, mb: 1, display: 'block' }}>EMAIL ADDRESS</Typography>
                    <TextField
                        fullWidth
                        defaultValue="admin@wedspot.com"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><MailIcon fontSize="small" /></InputAdornment>,
                            sx: { borderRadius: 3 }
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', ml: 0.5, mb: 1, display: 'block' }}>PHONE NUMBER</Typography>
                    <TextField
                        fullWidth
                        defaultValue="+91 98765 43210"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><PhoneIcon fontSize="small" /></InputAdornment>,
                            sx: { borderRadius: 3 }
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', ml: 0.5, mb: 1, display: 'block' }}>LOCATION</Typography>
                    <TextField
                        fullWidth
                        defaultValue="Mumbai, Maharashtra"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><GlobeIcon fontSize="small" /></InputAdornment>,
                            sx: { borderRadius: 3 }
                        }}
                    />
                </Grid>
            </Grid>
            <Box sx={{ mt: 5, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" size="large" sx={{ borderRadius: 3, px: 6, py: 1.5, fontWeight: 800 }}>Save Changes</Button>
            </Box>
        </Box>
    );
};

export default GeneralSection;
