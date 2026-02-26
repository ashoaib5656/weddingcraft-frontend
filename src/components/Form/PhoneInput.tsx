import React, { type JSX } from "react";
import { Phone } from "lucide-react";
import InputField from "./InputField";
import type { TextFieldProps } from "@mui/material";

interface PhoneInputProps extends Omit<TextFieldProps, "label"> {
    label?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
    label = "Phone Number",
    ...props
}): JSX.Element => {
    return (
        <InputField
            label={label}
            type="tel"
            icon={<Phone size={18} color="#94a3b8" />}
            {...props}
        />
    );
};

export default PhoneInput;
