import React, { type JSX } from "react";
import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    type TextFieldProps,
} from "@mui/material";

interface InputFieldProps extends Omit<TextFieldProps, "label"> {
    label?: string;
    icon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    icon,
    sx,
    InputProps,
    ...props
}): JSX.Element => {
    return (
        <Box>
            {label && (
                <Typography
                    component="label"
                    sx={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "#334155",
                        mb: 0.75,
                        display: "block",
                        fontFamily: "'Inter', sans-serif",
                    }}
                >
                    {label}
                </Typography>
            )}
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                sx={sx}
                {...props}
                InputProps={{
                    ...InputProps,
                    startAdornment: icon ? (
                        <InputAdornment position="start">
                            {icon}
                        </InputAdornment>
                    ) : (
                        InputProps?.startAdornment
                    ),
                    sx: {
                        borderRadius: "10px",
                        background: "#f8fafc",
                        fontSize: "0.95rem",
                        height: "48px",
                        "&.Mui-focused": {
                            background: "#ffffff",
                            boxShadow: "0 0 0 4px rgba(124, 58, 237, 0.1)",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#e2e8f0",
                            borderWidth: "1.5px",
                            transition: "all 0.2s ease",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#cbd5e1",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#7c3aed",
                        },
                        "&.Mui-focused svg": {
                            color: "#7c3aed",
                        },
                        ...InputProps?.sx,
                    },
                }}
            />
        </Box>
    );
};

export default InputField;
