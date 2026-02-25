import { type JSX } from "react";
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = (): JSX.Element => {
    return (
        <Container
            maxWidth="xl"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "60vh",
                textAlign: "center",
                py: 8,
                backgroundColor: "#f9fafb",
                height: "100vh",
            }}
        >
            <Typography
                variant="h1"
                sx={{
                    fontSize: { xs: "6rem", md: "10rem" },
                    fontWeight: 900,
                    background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontFamily: "'Fredoka One', cursive",
                    lineHeight: 1,
                    mb: 2,
                }}
            >
                404
            </Typography>
            <Typography
                variant="h4"
                sx={{
                    mb: 2,
                    fontWeight: 700,
                    color: "#1e293b",
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                Page Not Found
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    mb: 5,
                    color: "#64748b",
                    maxWidth: "480px",
                    fontSize: "1.1rem",
                    lineHeight: 1.6,
                }}
            >
                Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </Typography>

            <Button
                component={Link}
                to="/"
                variant="contained"
                size="large"
                sx={{
                    background: "linear-gradient(90deg, #7c3aed 0%, #a855f7 100%)",
                    borderRadius: "50px",
                    px: 5,
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    boxShadow: "0 10px 25px rgba(124, 58, 237, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 15px 30px rgba(124, 58, 237, 0.4)",
                    },
                }}
            >
                Go Back Home
            </Button>
        </Container>
    );
};

export default NotFound;
