import React, { useState, type JSX } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { Lock, Eye, EyeOff } from "lucide-react";
import InputField from "./InputField";
import type { TextFieldProps } from "@mui/material";

interface PasswordFieldProps extends Omit<TextFieldProps, "label"> {
    label?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
    label = "Password",
    ...props
}): JSX.Element => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <InputField
            label={label}
            type={showPassword ? "text" : "password"}
            icon={<Lock size={18} color="#94a3b8" />}
            {...props}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            size="small"
                            sx={{ color: "#94a3b8", "&:hover": { color: "#7c3aed" } }}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default PasswordField;
