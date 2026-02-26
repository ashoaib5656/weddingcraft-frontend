/**
 * Validation utility functions for forms
 */

/**
 * Validates an email address using a standard regex
 */
export const isValidEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
};

/**
 * Validates password strength (min 6 characters)
 */
export const isValidPassword = (password: string): boolean => {
    return password.length >= 6;
};

/**
 * Checks if two values match (e.g., password and confirm password)
 */
export const isMatching = (value: string, confirmValue: string): boolean => {
    return value === confirmValue;
};

/**
 * Validates phone number (basic requirement of not being empty)
 * Extensions can be added for specific format requirements
 */
export const isValidPhone = (phone: string): boolean => {
    return phone.trim().length >= 10;
};

/**
 * Validates a 6-digit OTP code
 */
export const isValidOtp = (otp: string): boolean => {
    return /^\d{6}$/.test(otp);
};
