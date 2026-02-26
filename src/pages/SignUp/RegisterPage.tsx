import React, { useState, type JSX } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import HeroImage from "../../assets/images/Hero_Couple_Image.png";
import {
  Box,
  Typography,
  Divider,
  Alert,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import InputField from "../../components/Form/InputField";
import PasswordField from "../../components/Form/PasswordField";
import PhoneInput from "../../components/Form/PhoneInput";
import FormButton from "../../components/Form/FormButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth/useAuth";
import { UserRole, ALL_ROLES, ROLE_LABELS } from "../../constants/roles";
import { isValidEmail, isValidPassword, isMatching, isValidPhone } from "../../utils/validation";

const RegisterPage: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<string>(UserRole.CLIENT); // Default to Client
  const [errors, setErrors] = useState<{
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!isValidPhone(phone)) {
      newErrors.phone = phone ? "Invalid phone number" : "Phone number is required";
    }

    if (!isValidPassword(password)) {
      newErrors.password = password ? "Password must be at least 6 characters" : "Password is required";
    }

    if (!isMatching(password, confirmPassword)) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setApiError("");

    try {
      const response = await register(email, password, phone);
      if (response.ok) {
        console.log("Register Success:", response);
        // Navigate to login
        navigate("/login");
      } else {
        setApiError(response.message || "Registration failed. Please try again.");
      }
    } catch {
      setApiError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        overflow: "hidden",
        bgcolor: "#ffffff",
      }}
    >
      {/* Left Side - Image & Branding */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "4rem",
          position: "relative",
          backgroundImage: `url(${HeroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          "&::before": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 100%)",
            zIndex: 1,
            content: '""',
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 2, color: "#fff" }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Fredoka One', cursive",
              fontSize: "3.5rem",
              mb: 2,
              animation: "fadeInUp 0.8s ease-out",
            }}
          >
            Join WeddsPot
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.125rem",
              opacity: 0.9,
              maxWidth: "480px",
              lineHeight: 1.6,
              animation: "fadeInUp 0.8s ease-out 0.2s backwards",
            }}
          >
            Start your journey to the perfect wedding. Create an account to access exclusive tools, vendor management, and more.
          </Typography>
        </Box>
      </Box>

      {/* Right Side - Form */}
      <Box
        sx={{
          flex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: "1.5rem", sm: "3rem" },
          bgcolor: { xs: "#faf5ff", md: "#ffffff" },
          position: "relative",
          overflowY: "none",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            my: "auto",
            animation: "slideInRight 0.6s ease-out",
            "@keyframes slideInRight": {
              from: { opacity: 0, transform: "translateX(20px)" },
              to: { opacity: 1, transform: "translateX(0)" },
            },
            "@keyframes fadeInUp": {
              from: { opacity: 0, transform: "translateY(20px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          {/* Mobile Logo Centered */}
          <Box sx={{ mb: 2, display: "flex", justifyContent: { xs: "center", md: "center" } }}>
            <Logo />
          </Box>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#1e293b",
              mb: 0.5,
              textAlign: "center",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Create Account
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
              mb: 3,
              textAlign: "center",
              fontSize: "0.875rem",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Sign up to get started with WeddsPot
          </Typography>

          {apiError && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: "10px", fontSize: "0.875rem" }}>
              {apiError}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <InputField
              label="Email Address"
              placeholder="Ex: yourname@example.com"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              error={!!errors.email}
              helperText={errors.email}
              icon={<Mail size={16} color="#94a3b8" />}
            />

            <PhoneInput
              label="Phone Number"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors({ ...errors, phone: undefined });
              }}
              error={!!errors.phone}
              helperText={errors.phone}
            />

            <PasswordField
              label="Password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              error={!!errors.password}
              helperText={errors.password}
            />

            <PasswordField
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
              }}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />

            {/* Role Selection */}
            <Box>
              <Typography
                component="label"
                sx={{
                  fontSize: "0.80rem",
                  fontWeight: 600,
                  color: "#334155",
                  mb: 0.25,
                  display: "block",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Account Type
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  sx={{
                    borderRadius: "8px",
                    background: "#f8fafc",
                    fontSize: "0.875rem",
                    height: "42px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e2e8f0",
                      borderWidth: "1px",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#cbd5e1",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#7c3aed",
                    },
                  }}
                >
                  {ALL_ROLES.map((roleValue) => (
                    <MenuItem key={roleValue} value={roleValue}>
                      {ROLE_LABELS[roleValue as keyof typeof ROLE_LABELS]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <FormButton
              type="submit"
              loading={loading}
              icon={<ArrowRight size={18} />}
              sx={{ mt: 0.5, borderRadius: "8px" }}
            >
              Create Account
            </FormButton>

            <Divider sx={{ my: 0.5 }}>
              <Typography variant="body2" sx={{ color: "#9ca3af", px: 2, fontSize: "0.8rem" }}>
                or
              </Typography>
            </Divider>

            <Box sx={{ textAlign: "center", fontSize: "0.875rem", color: "#6b7280" }}>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#7c3aed",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Sign In
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPage;
