import React, { useState } from "react";
import { Mail, Lock, ArrowRight, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import "../../styles/AuthPages.css";
import Logo from "../../components/Logo/Logo";

const ForgotPasswordPage: React.FC = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1: Send OTP to email
  const handleSendOtp = async () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("YOUR_API_URL/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("OTP sent to your email successfully!");
        setTimeout(() => {
          setStep(2);
          setSuccess("");
        }, 1500);
      } else {
        setError(data.error || "Failed to send OTP");
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
      const response = await fetch("YOUR_API_URL/api/auth/verify-password-reset-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("OTP verified successfully!");
        setTimeout(() => {
          setStep(3);
          setSuccess("");
        }, 1500);
      } else {
        setError(data.error || "Invalid OTP");
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

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
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
      const response = await fetch("YOUR_API_URL/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          // Redirect to login page
          window.location.href = "/login";
        }, 2000);
      } else {
        setError(data.error || "Failed to reset password");
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
    if (step > 1) setStep(step - 1);
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-logo">
          <Logo />
        </div>

        <div className="step-indicator">
          <div className={`step-dot ${step >= 1 ? 'active' : ''}`}></div>
          <div className={`step-dot ${step >= 2 ? 'active' : ''}`}></div>
          <div className={`step-dot ${step >= 3 ? 'active' : ''}`}></div>
        </div>

        {step > 1 && (
          <button className="back-button" onClick={handleBack}>
            <ArrowLeft size={16} />
            Back
          </button>
        )}

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <>
            <div className="auth-header">
              <h2>Forgot Password?</h2>
              <p>Enter your email to receive a reset code</p>
            </div>

            <div className="auth-form">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, handleSendOtp)}
                  />
                  <Mail className="input-icon" size={18} />
                </div>
              </div>

              {error && (
                <div className="auth-error">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="auth-success">
                  <CheckCircle size={18} />
                  <span>{success}</span>
                </div>
              )}

              <button className="submit-btn" onClick={handleSendOtp} disabled={loading}>
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    Send OTP
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <>
            <div className="auth-header">
              <h2>Verify OTP</h2>
              <p>Enter the 6-digit code sent to {email}</p>
            </div>

            <div className="auth-form">
              <div className="form-group">
                <label className="form-label">Verification Code</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    className="form-input otp-input"
                    placeholder="000000"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    onKeyPress={(e) => handleKeyPress(e, handleVerifyOtp)}
                  />
                </div>
              </div>

              <div className="helper-text">
                Didn't receive the code?{' '}
                <span className="resend-link" onClick={handleSendOtp}>
                  Resend OTP
                </span>
              </div>

              {error && (
                <div className="auth-error">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="auth-success">
                  <CheckCircle size={18} />
                  <span>{success}</span>
                </div>
              )}

              <button className="submit-btn" onClick={handleVerifyOtp} disabled={loading}>
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    Verify OTP
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <>
            <div className="auth-header">
              <h2>Reset Password</h2>
              <p>Enter your new password</p>
            </div>

            <div className="auth-form">
              <div className="form-group">
                <label className="form-label">New Password</label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <Lock className="input-icon" size={18} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, handleResetPassword)}
                  />
                  <Lock className="input-icon" size={18} />
                </div>
              </div>

              {error && (
                <div className="auth-error">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="auth-success">
                  <CheckCircle size={18} />
                  <span>{success}</span>
                </div>
              )}

              <button className="submit-btn" onClick={handleResetPassword} disabled={loading}>
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    Reset Password
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;