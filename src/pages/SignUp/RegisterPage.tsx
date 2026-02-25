import React, { useState, type JSX } from "react";
import { Mail, Phone, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import HeroImage from "../../assets/images/Hero_Couple_Image.png";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  CircularProgress,
  Divider,
  Alert,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { UserRole, ALL_ROLES, ROLE_LABELS } from "../../constants/roles";

const RegisterPage: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<string>(UserRole.CLIENT); // Default to Client
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!phone) {
      newErrors.phone = "Phone number is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
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
    } catch (err) {
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
                Email Address
              </Typography>
              <TextField
                fullWidth
                placeholder="Ex: yourname@example.com"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                variant="outlined"
                size="small"
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={16} color="#94a3b8" />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: "8px",
                    background: "#f8fafc",
                    fontSize: "0.875rem",
                    height: "42px",
                    "&.Mui-focused": {
                      background: "#ffffff",
                      boxShadow: "0 0 0 4px rgba(124, 58, 237, 0.1)",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e2e8f0",
                      borderWidth: "1px",
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
                  },
                }}
              />
            </Box>

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
                Phone Number
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter your phone number"
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors({ ...errors, phone: undefined });
                }}
                variant="outlined"
                size="small"
                error={!!errors.phone}
                helperText={errors.phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone size={16} color="#94a3b8" />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: "8px",
                    background: "#f8fafc",
                    fontSize: "0.875rem",
                    height: "42px",
                    "&.Mui-focused": {
                      background: "#ffffff",
                      boxShadow: "0 0 0 4px rgba(124, 58, 237, 0.1)",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e2e8f0",
                      borderWidth: "1px",
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
                  },
                }}
              />
            </Box>

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
                Password
              </Typography>
              <TextField
                fullWidth
                placeholder="Create a password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: undefined });
                }}
                variant="outlined"
                size="small"
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={16} color="#94a3b8" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                        sx={{ color: "#94a3b8", "&:hover": { color: "#7c3aed" } }}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: "8px",
                    background: "#f8fafc",
                    fontSize: "0.875rem",
                    height: "42px",
                    "&.Mui-focused": {
                      background: "#ffffff",
                      boxShadow: "0 0 0 4px rgba(124, 58, 237, 0.1)",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e2e8f0",
                      borderWidth: "1px",
                      transition: "all 0.2s ease",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#cbd5e1",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#7c3aed",
                    },
                    "&.Mui-focused .lucide-lock": {
                      color: "#7c3aed",
                    }
                  },
                }}
              />
            </Box>

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
                Confirm Password
              </Typography>
              <TextField
                fullWidth
                placeholder="Confirm your password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
                }}
                variant="outlined"
                size="small"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={16} color="#94a3b8" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                        size="small"
                        sx={{ color: "#94a3b8", "&:hover": { color: "#7c3aed" } }}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: "8px",
                    background: "#f8fafc",
                    fontSize: "0.875rem",
                    height: "42px",
                    "&.Mui-focused": {
                      background: "#ffffff",
                      boxShadow: "0 0 0 4px rgba(124, 58, 237, 0.1)",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e2e8f0",
                      borderWidth: "1px",
                      transition: "all 0.2s ease",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#cbd5e1",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#7c3aed",
                    },
                    "&.Mui-focused .lucide-lock": {
                      color: "#7c3aed",
                    }
                  },
                }}
              />
            </Box>

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

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              sx={{
                py: "0.75rem",
                background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
                color: "#fff",
                borderRadius: "8px",
                fontSize: "0.95rem",
                fontWeight: 600,
                textTransform: "none",
                mt: 0.5,
                boxShadow: "0 4px 12px rgba(124, 58, 237, 0.25)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 20px rgba(124, 58, 237, 0.35)",
                },
                "&:disabled": {
                  background: "#cbd5e1",
                  color: "#94a3b8",
                  boxShadow: "none",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <Stack direction="row" alignItems="center" gap={1.5}>
                  Create Account
                  <ArrowRight size={18} />
                </Stack>
              )}
            </Button>

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
