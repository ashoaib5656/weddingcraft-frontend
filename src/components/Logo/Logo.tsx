import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/Auth/useAuth";
import { Box } from "@mui/material";

const Logo = () => {
  const { isAuthenticated, role } = useAuth();

  const getTargetUrl = () => {
    if (!isAuthenticated || !role) return "/";

    const roleLower = role.toLowerCase();

    // Explicitly handle each role to avoid any mapping issues
    if (roleLower === "admin") return "/admin-dashboard";
    if (roleLower === "manager") return "/manager-dashboard";
    if (roleLower === "staff") return "/staff-dashboard";
    if (roleLower === "vendor") return "/vendor-dashboard";
    if (roleLower === "client") return "/client-dashboard";

    // Fallback pattern
    return `/${roleLower}-dashboard`;
  };

  return (
    <Box
      component={Link}
      to={getTargetUrl()}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        textDecoration: "none",
        transition: "transform 0.2s ease, opacity 0.2s ease",
        cursor: "pointer",
        "&:hover": {
          // transform: "translateY(-1px)",
          opacity: 0.95,
        },
        "&:active": {
          transform: "translateY(0)",
        },
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 240 65"
        preserveAspectRatio="xMinYMid meet"
        sx={{
          height: {
            xs: "38px",
            sm: "42px",
            md: "46px",
            lg: "50px",
          },
          width: "auto",
          display: "block",
          maxWidth: "100%",
          "& text:last-child": {
            display: {
              xs: "none",
              sm: "block",
            },
          },
        }}
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#7c3aed", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#a855f7", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>

        {/* Floral Element - Increased Size */}
        <g transform="translate(20, 32)">
          <circle cx="0" cy="0" r="4" fill="url(#logoGradient)" />
          <ellipse
            cx="-7"
            cy="-2.5"
            rx="5"
            ry="7.5"
            fill="url(#logoGradient)"
            opacity="0.4"
            transform="rotate(-30, -7, -2.5)"
          />
          <ellipse
            cx="7"
            cy="-2.5"
            rx="5"
            ry="7.5"
            fill="url(#logoGradient)"
            opacity="0.4"
            transform="rotate(30, 7, -2.5)"
          />
          <ellipse
            cx="-5.5"
            cy="5.5"
            rx="5"
            ry="7"
            fill="url(#logoGradient)"
            opacity="0.4"
            transform="rotate(-60, -5.5, 5.5)"
          />
          <ellipse
            cx="5.5"
            cy="5.5"
            rx="5"
            ry="7"
            fill="url(#logoGradient)"
            opacity="0.4"
            transform="rotate(60, 5.5, 5.5)"
          />
        </g>

        {/* Main Text */}
        <text
          x="42"
          y="38"
          fontFamily="'Fredoka One', 'Comic Sans MS', cursive"
          fontSize="32"
          fontWeight="400"
          fill="url(#logoGradient)"
          letterSpacing="0"
        >
          WedsPot
        </text>

        {/* Tagline */}
        <text
          x="44"
          y="52"
          fontFamily="'Inter', sans-serif"
          fontSize="9"
          fill="#666"
          letterSpacing="2.5"
          fontWeight="400"
        >
          where dreams come true
        </text>
      </Box>
    </Box>
  );
};

export default Logo;
