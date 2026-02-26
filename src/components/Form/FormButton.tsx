import React, { type JSX } from "react";
import { Button, CircularProgress, type ButtonProps } from "@mui/material";

interface FormButtonProps extends ButtonProps {
    loading?: boolean;
    icon?: React.ReactNode;
}

const FormButton: React.FC<FormButtonProps> = ({
    children,
    loading = false,
    icon,
    sx,
    ...props
}): JSX.Element => {
    return (
        <Button
            fullWidth
            variant="contained"
            disabled={loading || props.disabled}
            endIcon={!loading && icon}
            sx={{
                py: 1.5,
                borderRadius: "10px",
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                boxShadow: "0 4px 12px rgba(124, 58, 237, 0.25)",
                transition: "all 0.3s ease",
                height: "48px",
                "&:hover": {
                    background: "linear-gradient(135deg, #6d28d9 0%, #4338ca 100%)",
                    boxShadow: "0 6px 15px rgba(124, 58, 237, 0.35)",
                    transform: "translateY(-1px)",
                },
                "&:active": {
                    transform: "translateY(0px)",
                },
                "&.Mui-disabled": {
                    background: "#e2e8f0",
                    color: "#94a3b8",
                    boxShadow: "none",
                },
                ...sx,
            }}
            {...props}
        >
            {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
                children
            )}
        </Button>
    );
};

export default FormButton;
