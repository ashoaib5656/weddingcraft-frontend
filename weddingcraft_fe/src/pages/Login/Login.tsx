import React, { useState, type JSX } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AUTH_SERVICE } from "../../api/services/auth";
import { getDashboardPath } from "../../constants/roles";

const Login: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setApiError("");

    try {
      const response = await AUTH_SERVICE.login({ email, password });
      if (response.ok) {
        console.log("Login Success:", response);
        // Navigate to role-specific dashboard
        const dashboardPath = getDashboardPath(response.role || "Client");
        navigate(dashboardPath);
      } else {
        setApiError(response.message || "Invalid email or password");
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
        minHeight: "100vh",
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
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 100%)",
            zIndex: 1,
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
            Welcome Back
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
            Log in to continue planning your perfect day. Manage your vendors, track your budget, and bring your dream wedding to life.
          </Typography>
        </Box>
      </Box>

      {/* Right Side - Form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: { xs: "2rem", sm: "4rem" },
          bgcolor: { xs: "#faf5ff", md: "#ffffff" }, // Slight tint on mobile for better feel
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "420px",
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
          <Box sx={{ mb: 4, display: "flex", justifyContent: { xs: "center", md: "center" } }}>
            <Logo />
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#1e293b",
              mb: 1,
              textAlign: "center",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Sign In
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
              mb: 4,
              textAlign: "center",
              fontSize: "0.95rem",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Enter your details to access your account
          </Typography>

          {apiError && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: "10px", fontSize: "0.875rem" }}>
              {apiError}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box>
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
                      <Mail size={18} color="#94a3b8" />
                    </InputAdornment>
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
                  },
                }}
              />
            </Box>

            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.75 }}>
                <Typography
                  component="label"
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#334155",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Password
                </Typography>
                <Link
                  to="/forgot-password"
                  style={{
                    fontSize: "0.85rem",
                    color: "#7c3aed",
                    textDecoration: "none",
                    fontWeight: 500,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Forgot Password?
                </Link>
              </Box>
              <TextField
                fullWidth
                placeholder="Enter your password"
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
                      <Lock size={18} color="#94a3b8" />
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
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </IconButton>
                    </InputAdornment>
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
                    "&.Mui-focused .lucide-lock": {
                      color: "#7c3aed",
                    }
                  },
                }}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              sx={{
                py: "0.85rem",
                background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
                color: "#fff",
                borderRadius: "10px",
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                mt: 1,
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
                  Sign In
                  <ArrowRight size={20} />
                </Stack>
              )}
            </Button>
          </Box>
          <Divider sx={{ my: 0.5 }}>
            <Typography variant="body2" sx={{ color: "#9ca3af", px: 2, fontSize: "0.8rem" }}>
              or
            </Typography>
          </Divider>

          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} >
            <Typography sx={{ color: "#64748b", fontSize: "0.95rem", fontFamily: "'Inter', sans-serif" }}>
              Don't have an account?
            </Typography>
            <Link
              to="/register"
              style={{
                color: "#7c3aed",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.95rem",
                fontFamily: "'Inter', sans-serif",
                transition: "color 0.2s",
              }}
            >
              Sign Up
            </Link>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
