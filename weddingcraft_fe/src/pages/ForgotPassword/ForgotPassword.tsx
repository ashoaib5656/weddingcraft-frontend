import React, { useState, useEffect, useRef, type JSX } from "react";
import { Mail, Lock, ArrowRight, CheckCircle, ArrowLeft, Eye, EyeOff, Key } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  CircularProgress,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Fade,
} from "@mui/material";
import { gsap } from "gsap";
import Logo from "../../components/Logo/Logo";
import { AUTH_SERVICE } from "../../api/services/auth";

const ForgotPasswordPage: React.FC = (): JSX.Element => {
  const [step, setStep] = useState(0); // 0: Email, 1: OTP, 2: New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const steps = ["Email", "Verify", "Reset"];

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [step]);

  // Step 1: Send OTP to email
  const handleSendOtp = async () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await AUTH_SERVICE.forgotPassword({ email });
      if (response.ok) {
        setSuccess("OTP sent to your email successfully!");
        setTimeout(() => {
          setStep(1);
          setSuccess("");
        }, 1500);
      } else {
        setError(response.error || "Failed to send OTP");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await AUTH_SERVICE.verifyOtp({ email, otp });
      if (response.ok) {
        setSuccess("OTP verified successfully!");
        setTimeout(() => {
          setStep(2);
          setSuccess("");
        }, 1500);
      } else {
        setError(response.error || "Invalid OTP");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await AUTH_SERVICE.resetPassword({ email, password: newPassword });
      if (response.ok) {
        setSuccess("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(response.error || "Failed to reset password");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setError("");
    setSuccess("");
    if (step > 0) setStep(step - 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <Fade in={step === 0}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: "#1e293b", fontFamily: "'Inter', sans-serif" }}>
                Forgot Password?
              </Typography>
              <Typography sx={{ color: "#64748b", mb: 4, fontSize: "0.95rem" }}>
                Enter your email address to receive a 6-digit verification code.
              </Typography>

              <Stack spacing={3}>
                <Box>
                  <Typography component="label" sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#334155", mb: 0.5, display: "block" }}>
                    Email Address
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Ex: yourname@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    variant="outlined"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Mail size={18} color="#94a3b8" />
                        </InputAdornment>
                      ),
                      sx: { borderRadius: "10px", bgcolor: "#f8fafc" },
                    }}
                  />
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSendOtp}
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    borderRadius: "10px",
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 600,
                    bgcolor: "#7c3aed",
                    boxShadow: "0 4px 12px rgba(124, 58, 237, 0.25)",
                    "&:hover": { bgcolor: "#6d28d9" },
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : (
                    <Stack direction="row" alignItems="center" gap={1}>
                      Send Code <ArrowRight size={20} />
                    </Stack>
                  )}
                </Button>
              </Stack>
            </Box>
          </Fade>
        );
      case 1:
        return (
          <Fade in={step === 1}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: "#1e293b", fontFamily: "'Inter', sans-serif" }}>
                Verify Code
              </Typography>
              <Typography sx={{ color: "#64748b", mb: 4, fontSize: "0.95rem" }}>
                A 6-digit code has been sent to <strong>{email}</strong>.
              </Typography>

              <Stack spacing={3}>
                <Box>
                  <Typography component="label" sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#334155", mb: 0.5, display: "block" }}>
                    OTP Code
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="000 000"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                      if (error) setError("");
                    }}
                    variant="outlined"
                    size="small"
                    inputProps={{ style: { textAlign: "center", letterSpacing: "8px", fontWeight: 700, fontSize: "1.25rem" } }}
                    InputProps={{
                      sx: { borderRadius: "10px", bgcolor: "#f8fafc" },
                    }}
                  />
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    borderRadius: "10px",
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 600,
                    bgcolor: "#7c3aed",
                    boxShadow: "0 4px 12px rgba(124, 58, 237, 0.25)",
                    "&:hover": { bgcolor: "#6d28d9" },
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : (
                    <Stack direction="row" alignItems="center" gap={1}>
                      Verify OTP <ArrowRight size={20} />
                    </Stack>
                  )}
                </Button>

                <Typography sx={{ textAlign: "center", fontSize: "0.875rem", color: "#64748b" }}>
                  Didn't receive the code?{" "}
                  <Button variant="text" onClick={handleSendOtp} sx={{ color: "#7c3aed", fontWeight: 600, textTransform: "none", p: 0 }}>
                    Resend
                  </Button>
                </Typography>
              </Stack>
            </Box>
          </Fade>
        );
      case 2:
        return (
          <Fade in={step === 2}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: "#1e293b", fontFamily: "'Inter', sans-serif" }}>
                Reset Password
              </Typography>
              <Typography sx={{ color: "#64748b", mb: 4, fontSize: "0.95rem" }}>
                Create a new strong password for your account.
              </Typography>

              <Stack spacing={2.5}>
                <Box>
                  <Typography component="label" sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#334155", mb: 0.5, display: "block" }}>
                    New Password
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Min. 6 characters"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (error) setError("");
                    }}
                    variant="outlined"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock size={18} color="#94a3b8" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: { borderRadius: "10px", bgcolor: "#f8fafc" },
                    }}
                  />
                </Box>

                <Box>
                  <Typography component="label" sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#334155", mb: 0.5, display: "block" }}>
                    Confirm Password
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Repeat new password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (error) setError("");
                    }}
                    variant="outlined"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock size={18} color="#94a3b8" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" size="small">
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: { borderRadius: "10px", bgcolor: "#f8fafc" },
                    }}
                  />
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleResetPassword}
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    mt: 1,
                    borderRadius: "10px",
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 600,
                    bgcolor: "#7c3aed",
                    boxShadow: "0 4px 12px rgba(124, 58, 237, 0.25)",
                    "&:hover": { bgcolor: "#6d28d9" },
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : (
                    <Stack direction="row" alignItems="center" gap={1}>
                      Update Password <Key size={20} />
                    </Stack>
                  )}
                </Button>
              </Stack>
            </Box>
          </Fade>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#fcf9ff", // Light wedding-themed tint
        p: 2,
        background: "radial-gradient(circle at top left, #f5f3ff 0%, #ffffff 100%)",
      }}
    >
      <Paper
        ref={containerRef}
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "480px",
          p: { xs: 3, sm: 5 },
          borderRadius: "24px",
          border: "1px solid rgba(124, 58, 237, 0.1)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.03)",
          position: "relative",
          bgcolor: "#ffffff",
        }}
      >
        <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
          <Logo />
        </Box>

        <Stepper activeStep={step} alternativeLabel sx={{ mb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  "& .MuiStepLabel-label": {
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#94a3b8",
                  },
                  "& .MuiStepLabel-label.Mui-active": { color: "#7c3aed" },
                  "& .MuiStepLabel-label.Mui-completed": { color: "#7c3aed" },
                  "& .MuiStepIcon-root": { color: "#f1f5f9" },
                  "& .MuiStepIcon-root.Mui-active": { color: "#7c3aed" },
                  "& .MuiStepIcon-root.Mui-completed": { color: "#7c3aed" },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ position: "relative" }}>
          {step > 0 && (
            <IconButton
              onClick={handleBack}
              sx={{
                position: "absolute",
                top: -12,
                left: -8,
                color: "#64748b",
                "&:hover": { color: "#7c3aed", bgcolor: "rgba(124, 58, 237, 0.05)" },
              }}
              size="small"
            >
              <ArrowLeft size={18} />
            </IconButton>
          )}

          {renderStepContent()}

          {error && (
            <Alert severity="error" sx={{ mt: 3, borderRadius: "10px", fontSize: "0.875rem" }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert
              icon={<CheckCircle size={18} />}
              severity="success"
              sx={{ mt: 3, borderRadius: "10px", fontSize: "0.875rem", bgcolor: "#f0fdf4", color: "#166534" }}
            >
              {success}
            </Alert>
          )}
        </Box>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Typography variant="body2" sx={{ color: "#7c3aed", fontWeight: 600, "&:hover": { textDecoration: "underline" } }}>
              Back to Sign In
            </Typography>
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default ForgotPasswordPage;