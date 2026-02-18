import { useEffect, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  useTheme,
} from "@mui/material";
import { Lock as LockIcon } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";

interface Product {
  id: string | number;
  name: string;
  price: number;
  imageUrl?: string;
}

const ProductList = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const nav = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      api
        .get<Product[]>("/product")
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch(() => {
          setProducts([]);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Card
          sx={{
            maxWidth: 480,
            width: "100%",
            p: 6,
            textAlign: "center",
            borderRadius: 3,
            boxShadow: theme.shadows[2],
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: 'primary.light',
              opacity: 0.8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
            }}
          >
            <LockIcon sx={{ fontSize: 40, color: "primary.main" }} />
          </Box>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "text.primary",
              mb: 2,
            }}
          >
            Authentication Required
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              mb: 4,
            }}
          >
            Please login or register to view our wedding services and products.
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => nav("/login")}
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Sign In
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => nav("/register")}
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Create Account
            </Button>
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: "text.disabled",
              mt: 3,
              fontSize: 14,
            }}
          >
            Join thousands of happy couples planning their dream wedding with
            WeddsPot
          </Typography>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 6, px: 2 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Our Services
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Choose from our premium wedding services
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ maxWidth: 1200, mx: "auto" }}>
        {products.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p.id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  transform: "translateY(-4px)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={p.imageUrl || "https://placehold.co/600x400"}
                alt={p.name}
                sx={{
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
              <CardContent sx={{ px: 2, py: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 0.5,
                    color: "text.primary",
                  }}
                >
                  {p.name}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "primary.main",
                    mb: 1.5,
                  }}
                >
                  ₹{p.price.toLocaleString("en-IN")}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => nav(`/product/${p.id}`)}
                  sx={{
                    py: 1.25,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
