import { type JSX, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography
} from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutUsImg from "../../assets/images/aboutus.png";

gsap.registerPlugin(ScrollTrigger);

const About = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Set initial states exactly like original to prevent flash
      gsap.set([titleRef.current, subtitleRef.current, descRef.current], {
        opacity: 0,
        y: 30,
      });

      gsap.set(".feature-item", {
        opacity: 0,
        x: -20,
      });

      gsap.set(imageRef.current, {
        opacity: 0,
        x: 30,
      });

      // Create timeline for sequential animations matching original logic
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      // Animate content area sequentially
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      })
        .to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        }, "-=0.4")
        .to(descRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        }, "-=0.3")
        .to(imageRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
        }, "-=0.4");

      // Features list stagger entrance
      gsap.to(".feature-item", {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      });

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: "Expert Team",
      desc: "50+ professionals",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      title: "Trusted Timelines",
      desc: "100% guarantee",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      title: "Quality Service",
      desc: "Premium experience",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 13L9 17L19 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      title: "5-Star Rated",
      desc: "Trusted by couples",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
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
      id="about-section"
      ref={sectionRef as any}
      sx={{
        width: "100%",
        py: { xs: "60px", md: "80px" },
        background: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        className="about-wave"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #9b86ff 0%, #7c3aed 60%) !important",
        }}
      />

      <Container
        disableGutters
        maxWidth={false}
        sx={{
          maxWidth: "1280px",
          px: { xs: "20px", md: "40px" },
          mx: "auto",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: "50px", md: "40px", lg: "60px" },
            alignItems: "center",
          }}
        >
          {/* Left Side - Content */}
          <Box sx={{ width: "100%" }}>
            <Typography
              variant="h2"
              ref={titleRef as any}
              sx={{
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem", lg: "2.5rem" },
                fontWeight: 700,
                color: "#1a1a1a",
                margin: "0 0 20px 0",
                position: "relative",
                display: "inline-block",
                textAlign: { xs: "center", md: "left" },
                width: { xs: "100%", md: "auto" },
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
              About WeddsPot
            </Typography>

            <Typography
              variant="h4"
              ref={subtitleRef as any}
              sx={{
                fontSize: { xs: "16px", sm: "18px", md: "20px", lg: "22px" },
                color: "#575757",
                fontWeight: 600,
                mb: "16px",
                mt: { xs: 3.5, md: 2 },
                letterSpacing: "0.3px",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Creating Magical Moments Since 2019
            </Typography>

            <Typography
              variant="body1"
              ref={descRef as any}
              sx={{
                fontSize: { xs: "15px", md: "17px" },
                lineHeight: 1.7,
                color: "#555",
                mb: "40px",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              We're a passionate team of wedding planners dedicated to bringing
              your dream wedding to life. With years of experience and countless
              successful events, we handle every detail with precision and care.
            </Typography>

            {/* Features Grid */}
            <Box
              ref={featuresRef as any}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: "10px",
              }}
            >
              {features.map((feature, index) => (
                <Box
                  key={index}
                  className="feature-item"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "16px",
                    borderRadius: "12px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "#fafafa",
                      transform: { xs: "none", sm: "translateX(5px)" },
                      boxShadow: "0 4px 16px rgba(124, 58, 237, 0.08)",
                      "& .feature-icon": {
                        background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                        color: "#fff",
                        transform: "scale(1.08)",
                      }
                    }
                  }}
                >
                  <Box
                    className="feature-icon"
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
                    {feature.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontSize: { xs: "14px", sm: "16px", md: "18px", lg: "16px" }, fontWeight: 600, color: "#1a1a1a", mb: "2px" }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "14px" }, color: "#666" }}>
                      {feature.desc}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Right Side - Image */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              ref={imageRef as any}
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: "500px",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(124, 58, 237, 0.15)",
                zIndex: 2,
              }}
            >
              <Box
                component="img"
                src={aboutUsImg}
                alt="Wedding Planning"
                sx={{
                  width: "100%",
                  height: { xs: "300px", sm: "350px", md: "400px", lg: "500px" },
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <Box
                className="image-overlay"
                sx={{
                  position: "absolute",
                  bottom: { xs: "15px", sm: "20px", md: "30px" },
                  left: { xs: "15px", sm: "20px", md: "30px" },
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  padding: { xs: "16px 20px", sm: "20px 24px", md: "24px 32px" },
                  borderRadius: "16px",
                  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "24px", sm: "28px", md: "36px" },
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    lineHeight: 1,
                    mb: "6px",
                  }}
                >
                  200+
                </Typography>
                <Typography sx={{
                  fontSize: { xs: "12px", md: "14px" },
                  color: "#666",
                  fontWeight: 500
                }}>
                  Happy Couples
                </Typography>
              </Box>
            </Box>

            {/* Decorative elements */}
            <Box
              className="decoration-1"
              sx={{
                position: "absolute",
                borderRadius: "20px",
                zIndex: 1,
                width: { xs: "200px", sm: "300px" },
                height: { xs: "200px", sm: "300px" },
                background: "linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(168, 85, 247, 0.15) 100%)",
                top: { xs: "-30px", sm: "-40px" },
                right: { xs: "-30px", sm: "-40px" },
                display: { xs: "none", sm: "block" }
              }}
            />
            <Box
              className="decoration-2"
              sx={{
                position: "absolute",
                borderRadius: "20px",
                zIndex: 1,
                width: { xs: "150px", sm: "200px" },
                height: { xs: "150px", sm: "200px" },
                background: "linear-gradient(135deg, rgba(155, 134, 255, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)",
                bottom: { xs: "-20px", sm: "-30px" },
                left: { xs: "-20px", sm: "-30px" },
                display: { xs: "none", sm: "block" }
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default About;