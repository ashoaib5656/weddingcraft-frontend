import { type JSX, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  keyframes
} from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const floatBackground = keyframes`
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, 20px); }
`;

const ContactUs = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reset",
        }
      });

      // Initially set elements to hidden states to prevent FOUC
      gsap.set([infoRef.current, formRef.current], { autoAlpha: 0 });
      gsap.set(".form-field", { autoAlpha: 0, y: 20 });

      // Animate contact info
      tl.fromTo(infoRef.current,
        { x: -50, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power3.out",
          overwrite: "auto"
        }
      );

      // Animate form container
      tl.fromTo(formRef.current,
        { x: 50, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power3.out",
          overwrite: "auto"
        },
        "-=0.6"
      );

      // Animate form fields with stagger
      tl.to(".form-field", {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        overwrite: "auto"
      }, "-=0.2");

    }, section);

    return () => ctx.revert();
  }, []);

  const detailItems = [
    {
      id: "email",
      label: "Email",
      value: "support@weddspot.com",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 8L10.89 13.26C11.54 13.67 12.46 13.67 13.11 13.26L21 8M5 19H19C20.1 19 21 18.1 21 17V7C21 5.9 20.1 5 19 5H5C3.9 5 3 5.9 3 7V17C3 18.1 3.9 19 5 19Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      id: "phone",
      label: "Phone",
      value: "+91 (555) 123-4567",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      id: "location",
      label: "Location",
      value: "123 Wedding Street, NY 10001",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M17.657 16.657L13.414 20.9C12.633 21.681 11.367 21.681 10.586 20.9L6.343 16.657C3.219 13.533 3.219 8.467 6.343 5.343C9.467 2.219 14.533 2.219 17.657 5.343C20.781 8.467 20.781 13.533 17.657 16.657Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    }
  ];

  return (
    <Box
      component="section"
      id="contact-section"
      ref={sectionRef as any}
      sx={{
        width: "100%",
        background: "linear-gradient(135deg, rgba(124, 58, 237, 0.03) 0%, rgba(168, 85, 247, 0.05) 100%)",
        padding: { xs: "60px 0", md: "40px 0" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)
          `,
          animation: `${floatBackground} 20s ease-in-out infinite`,
          pointerEvents: "none",
        },
      }}
    >
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: "20px", sm: "30px", md: "40px" },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 5, md: "60px" },
          justifyContent: "space-between",
          alignItems: "flex-start",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* LEFT SIDE INFO */}
        <Box
          ref={infoRef as any}
          sx={{
            flex: 1,
            maxWidth: { xs: "100%", md: "450px" },
            textAlign: { xs: "center", md: "left" },
            width: "100%"
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "28px", sm: "32px", md: "2.5rem" },
              fontWeight: 800,
              color: "#1a1a1a",
              mb: 4,
              position: "relative",
              display: "block",
              width: "100%",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-10px",
                left: { xs: "50%", md: "0" },
                transform: { xs: "translateX(-50%)", md: "none" },
                width: "80px",
                height: "4.5px",
                background: "linear-gradient(90deg, #9b86ff 0%, #7c3aed 100%)",
                borderRadius: "4px",
              },
            }}
          >
            Contact Us
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#64748b",
              lineHeight: 1.7,
              fontSize: "16px",
              maxWidth: "100%",
              textAlign: { xs: "center", md: "left" },
              mb: 5,
              mt: 1,
            }}
          >
            Have questions? Need help? Send us a message and we'll get back to
            you as soon as possible.
          </Typography>

          <Stack spacing={1} sx={{ alignItems: "flex-start" }}>
            {detailItems.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  padding: "10px",
                  transition: "all 0.3s ease",
                  width: "100%",
                  borderRadius: "12px",
                  "&:hover": {
                    transform: { xs: "none", md: "translateX(8px)" },
                    "& .detail-icon": {
                      background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                      color: "#fff",
                      transform: "scale(1.1) rotate(5deg)",
                    }
                  }
                }}
              >
                <Box
                  className="detail-icon"
                  sx={{
                    width: 44,
                    height: 44,
                    background: "linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#7c3aed",
                    flexShrink: 0,
                    transition: "all 0.3s ease",
                  }}
                >
                  {item.icon}
                </Box>
                <Box sx={{ textAlign: "left" }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#7c3aed",
                      mb: 0.5,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "15px",
                      color: "#1a1a1a",
                      fontWeight: 600,
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* RIGHT SIDE FORM */}
        <Box
          component="form"
          ref={formRef as any}
          onSubmit={(e: any) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData);

            if (!data.name || !data.email || !data.subject || !data.message) {
              alert("Please fill all required fields.");
              return;
            }

            console.log("Form submitted:", data);
            e.currentTarget.reset();
          }}
          sx={{
            flex: 1,
            maxWidth: { xs: "100%", md: "550px" },
            width: "100%",
            background: "#ffffff",
            padding: { xs: "24px 20px", sm: "30px 24px", md: "40px" },
            borderRadius: "28px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08)",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
            border: "1px solid rgba(124, 58, 237, 0.08)",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              width: "120px",
              height: "120px",
              background: "linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, transparent 70%)",
              borderRadius: "0 28px 0 0",
              pointerEvents: "none",
            },
          }}
        >
          <Box className="form-field" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1a1a1a" }}>Name *</Typography>
            <TextField
              name="name"
              required
              fullWidth
              placeholder="John Doe"
              variant="outlined"
              sx={formInputStyles}
            />
          </Box>

          <Box className="form-field" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1a1a1a" }}>Phone</Typography>
            <TextField
              name="phone"
              fullWidth
              placeholder="+91 (555) 000-0000"
              variant="outlined"
              sx={formInputStyles}
            />
          </Box>

          <Box className="form-field" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1a1a1a" }}>Email *</Typography>
            <TextField
              name="email"
              type="email"
              required
              fullWidth
              placeholder="john@example.com"
              variant="outlined"
              sx={formInputStyles}
            />
          </Box>

          <Box className="form-field" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1a1a1a" }}>Subject *</Typography>
            <TextField
              name="subject"
              required
              fullWidth
              placeholder="How can we help?"
              variant="outlined"
              sx={formInputStyles}
            />
          </Box>

          <Box className="form-field" sx={{ gridColumn: { xs: "span 1", md: "span 2" }, display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1a1a1a" }}>Message *</Typography>
            <TextField
              name="message"
              required
              fullWidth
              multiline
              rows={3}
              placeholder="Tell us more about your inquiry..."
              variant="outlined"
              sx={formInputStyles}
            />
          </Box>

          <Button
            className="form-field"
            type="submit"
            variant="contained"
            sx={{
              gridColumn: { xs: "span 1", md: "span 2" },
              padding: "16px 32px",
              background: "linear-gradient(90deg, #9b86ff 0%, #7c3aed 100%)",
              color: "#fff",
              borderRadius: "14px",
              fontSize: "16px",
              fontWeight: 700,
              textTransform: "none",
              boxShadow: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(90deg, #9b86ff 0%, #7c3aed 100%)",
                boxShadow: "0 8px 24px rgba(124, 58, 237, 0.25)",
                transform: "translateY(-2px)",
                "& svg": {
                  transform: "translateX(4px)",
                }
              },
            }}
          >
            Send Message
            <Box component="span" sx={{ display: "flex", ml: 1.5 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ transition: "transform 0.3s ease" }}>
                <path
                  d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

const formInputStyles = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#fafafa",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    "& fieldset": {
      borderWidth: "2px",
      borderColor: "#e5e7eb",
    },
    "&:hover fieldset": {
      borderColor: "#d1d5db",
    },
    "&.Mui-focused": {
      backgroundColor: "#fff",
      "& fieldset": {
        borderColor: "#7c3aed",
      },
      boxShadow: "0 0 0 4px rgba(124, 58, 237, 0.08)",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: { xs: "9px 13px", md: "14px 16px" },
    fontSize: "15px",
    "&::placeholder": {
      color: "#aaa",
      opacity: 1,
    }
  }
};

export default ContactUs;
