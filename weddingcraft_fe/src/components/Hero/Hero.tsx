import { useEffect, useRef, type JSX } from "react";
import { Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage from "../../assets/images/Hero_Couple_Image.png";

const Hero = (): JSX.Element => {
  const btnRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".hero-section, .hero-left > *, .hero-right", { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
          once: false,
        },
      });

      const leftChildren = gsap.utils.toArray(".hero-left > *");

      tl.from(leftChildren, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        stagger: 0.32,
        delay: 0.2,
        ease: "power3.out",
        immediateRender: false,
      });

      tl.from(
        ".hero-right",
        {
          opacity: 0,
          x: 60,
          duration: 1.2,
          ease: "power3.out",
          immediateRender: false,
        },
        "-=0.8"
      );

      gsap.to(".hero-section", {
        backgroundPositionY: "40px",
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top bottom",
          scrub: 1.2,
        },
      });

      ScrollTrigger.refresh();
    }, heroRef);

    const btnEl = btnRef.current;
    let arrowEl: HTMLElement | null = null;

    if (btnEl) {
      arrowEl = btnEl.querySelector(".MuiButton-endIcon") as HTMLElement | null;

      const onEnter = () => {
        gsap.to(btnEl, {
          x: 8,
          duration: 0.35,
          ease: "power2.out",
          overwrite: true,
        });

        if (arrowEl)
          gsap.to(arrowEl, {
            x: 6,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          });
      };

      const onLeave = () => {
        gsap.to(btnEl, {
          x: 0,
          duration: 0.35,
          ease: "power2.out",
          overwrite: true,
        });

        if (arrowEl)
          gsap.to(arrowEl, {
            x: 0,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          });
      };

      btnEl.addEventListener("mouseenter", onEnter);
      btnEl.addEventListener("mouseleave", onLeave);

      const removeListeners = () => {
        btnEl.removeEventListener("mouseenter", onEnter);
        btnEl.removeEventListener("mouseleave", onLeave);
      };

      return () => {
        removeListeners();
        ctx.revert();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    }

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <Box
      component="section"
      className="hero-section"
      ref={heroRef}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: { xs: "center", md: "flex-start" },
        width: "100%",
        padding: 0,
        boxSizing: "border-box",
        overflow: "hidden",
        height: "calc(100vh - 90px)",
        background: `linear-gradient(135deg,
            #ffffff 0%,
            #fdfbff 35%,
            #f9f5ff 70%,
            #f3e8ff 100%)`,
        // Global overlay for background depth
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: {
            xs: `linear-gradient(to bottom,
                rgba(17, 24, 39, 0.85) 0%,
                rgba(17, 24, 39, 0.65) 50%,
                rgba(17, 24, 39, 0.35) 100%)`,
            md: `linear-gradient(to right,
                rgba(255, 255, 255, 0.95) 0%,
                rgba(253, 251, 255, 0.85) 25%,
                rgba(249, 245, 255, 0.65) 50%,
                rgba(243, 232, 255, 0.35) 75%,
                rgba(243, 232, 255, 0.15) 100%)`,
          },
          zIndex: { xs: 2, md: 1 }, // Mobile overlay (above img), Desktop background (below img)
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: "-50%",
          right: "-10%",
          width: "60%",
          height: "200%",
          background: `radial-gradient(ellipse at center,
                rgba(155, 134, 255, 0.12) 0%,
                rgba(124, 58, 237, 0.06) 30%,
                transparent 70%)`,
          zIndex: 1,
          pointerEvents: "none",
          filter: "blur(60px)",
          display: { xs: "none", md: "block" },
        },
      }}
    >
      <Box
        className="hero-left"
        sx={{
          position: "relative",
          zIndex: 4, // Always on top
          width: { xs: "100%", md: "58%", lg: "58%" },
          maxWidth: { md: "750px" },
          height: "100%",
          padding: {
            xs: "80px 6% 60px",
            sm: "100px 5% 80px",
            md: "20px 4% 80px 6%",
          },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: { xs: "center", md: "flex-start" },
          textAlign: { xs: "center", md: "left" },
          boxSizing: "border-box",
        }}
      >
        <Typography
          className="hero-subtitle"
          variant="subtitle1"
          sx={{
            fontSize: { xs: "14px", sm: "15px", md: "16px" },
            color: { xs: "#d8b4fe", md: "#7c3aed" },
            fontWeight: 700,
            marginBottom: "16px",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            opacity: 0.9,
          }}
        >
          Manage your time easily
        </Typography>
        <Typography
          className="hero-title"
          variant="h1"
          sx={{
            fontSize: { xs: "40px", sm: "48px", md: "52px", lg: "62px" },
            lineHeight: 1.1,
            fontWeight: 800,
            color: { xs: "#ffffff", md: "#1a1a1a" },
            margin: "0 0 24px",
            letterSpacing: { xs: "-0.6px", md: "-1px" },
            textShadow: "0 2px 12px rgba(124, 58, 237, 0.08)",
          }}
        >
          Track your wedding plans and work wisely
        </Typography>
        <Typography
          className="hero-description"
          variant="body1"
          sx={{
            fontSize: { xs: "16px", sm: "18px", md: "17px", lg: "18px" },
            color: { xs: "#f3f4f6", md: "#4a4a4a" },
            lineHeight: 1.6,
            marginBottom: "40px",
            maxWidth: { xs: "600px", md: "560px" },
            opacity: 0.95,
          }}
        >
          Plan your dream wedding with our advanced management tools. From
          organizing family meetings to booking suppliers, we handle everything
          smoothly and professionally.
        </Typography>

        <Box ref={btnRef} className="hero-btn-wrapper" sx={{ width: "fit-content" }}>
          <Button
            className="hero-btn"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            component={Link}
            to="/register"
            sx={{
              background: "linear-gradient(90deg, #9b86ff 0%, #7c3aed 100%)",
              color: "#fff",
              padding: { xs: "14px 32px", md: "14px 36px" },
              borderRadius: "12px",
              fontSize: { xs: "18px", md: "17px" },
              fontWeight: 600,
              textTransform: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              overflow: "visible",
              willChange: "transform",
              transition: "all 300ms ease",
              boxShadow: "0 10px 30px rgba(124, 58, 237, 0.3)",
              "&:hover": {
                background: "linear-gradient(90deg, #b39bff 0%, #8b5df0 100%)",
                boxShadow: "0 14px 40px rgba(124, 58, 237, 0.4)",
                transform: "translateY(-2px)",
              },
              "& .MuiButton-endIcon": {
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                willChange: "transform",
                transform: "translateX(0)",
              },
            }}
          >
            Get Started
          </Button>
        </Box>
      </Box>

      <Box
        className="hero-right"
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: { xs: "100%", md: "58%", lg: "60%" },
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          zIndex: { xs: 1, md: 2 }, // Background on mobile, Foreground on desktop
          boxSizing: "border-box",
          padding: 0,
          height: "100%",
          minHeight: { md: "450px" },
        }}
      >
        <Box
          component="img"
          src={heroImage}
          alt="Wedding Hero"
          className="hero-image"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: { xs: "center top", sm: "center", md: "center" },
            display: "block",
            opacity: { xs: 1, md: 1 }, // Sharp on desktop
            filter: { xs: "brightness(1.1)", md: "none" }, // No filters on desktop
            willChange: "transform",
          }}
        />
        <Box
          className="hero-image-blend"
          aria-hidden="true"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: { xs: "100%", md: "40%", lg: "35%" },
            pointerEvents: "none",
            zIndex: 3,
            background: {
              xs: "transparent",
              md: `linear-gradient(to right,
                  rgba(255, 255, 255, 0.95) 0%,
                  rgba(253, 251, 255, 0.85) 15%,
                  rgba(249, 245, 255, 0.70) 30%,
                  rgba(243, 232, 255, 0.50) 50%,
                  rgba(243, 232, 255, 0.25) 70%,
                  rgba(243, 232, 255, 0.10) 85%,
                  transparent 100%)`
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Hero;
