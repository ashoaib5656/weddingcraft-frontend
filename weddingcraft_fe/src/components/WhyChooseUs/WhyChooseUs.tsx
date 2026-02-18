// src/components/WhyChooseUs/WhyChooseUs.tsx
import React, { useEffect, useRef } from "react";
import { Container, Box, Typography, Grid } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import lightbulb from "../../assets/icons/lightbulb.svg";
import money from "../../assets/icons/money.svg";
import bolt from "../../assets/icons/bolt.svg";
import people from "../../assets/icons/people.svg";

gsap.registerPlugin(ScrollTrigger);

type Feature = {
  id: string;
  title: string;
  description: string;
  // `icon` is an inline SVG string or JSX element
  icon: React.ReactNode;
  accent?: string;
};

const SVGs = {
  lightbulb: <img src={lightbulb} width={32} height={32} alt="" />,
  money: <img src={money} width={32} height={32} alt="" />,
  bolt: <img src={bolt} width={32} height={32} alt="" />,
  people: <img src={people} width={32} height={32} alt="" />,
};

const FEATURES: Feature[] = [
  {
    id: "team",
    title: "Professional & Creative Team",
    description: "We design unique & modern event experiences.",
    icon: SVGs.lightbulb,
    accent: "#8b5cf6",
  },
  {
    id: "budget",
    title: "Budget-Friendly Packages",
    description: "We Provide high quality within your budget.",
    icon: SVGs.money,
    accent: "#7c3aed",
  },
  {
    id: "fast",
    title: "Premium Wedding Assistance",
    description: "Fast response and on-time delivery every time.",
    icon: SVGs.bolt,
    accent: "#ef4444",
  },
  {
    id: "clients",
    title: "Trusted by 200+ Happy Clients",
    description: "The choice of many families across the city.",
    icon: SVGs.people,
    accent: "#10b981",
  },
];

const WhyChooseUs: React.FC = () => {
  const rootRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // collect nodes with class .why-card
    itemRefs.current = Array.from(root.querySelectorAll(".why-card")) as Array<HTMLDivElement>;

    const ctx = gsap.context(() => {
      gsap.set(itemRefs.current, { opacity: 0, y: 18, autoAlpha: 0 });

      gsap.to(itemRefs.current, {
        autoAlpha: 1,
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.45, // one-by-one slowly
        scrollTrigger: {
          trigger: root,
          start: "top 85%",
          toggleActions: "play none none reverse",
          once: false,         // replay on re-enter
          invalidateOnRefresh: true,
        },
      });

      // refresh on resize/route changes
      ScrollTrigger.addEventListener("refreshInit", () => { });
      ScrollTrigger.refresh();
    }, root);

    // also refresh when window resizes (helps if layout changes)
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <Container
      component="section"
      ref={rootRef as any}
      sx={{
        pt: { xs: 6, md: 8 },
        pb: { xs: 6, md: 6 },
      }}
      aria-labelledby="why-choose-us"
    >
      <Box textAlign="center" mb={{ xs: 6, md: 8 }}>
        <Typography
          id="why-choose-us"
          variant="h2"
          sx={{
            position: "relative",
            display: "inline-block",
            fontSize: { xs: "2rem", md: "2.6rem" },
            fontWeight: 800,
            color: "#1a1a1a",
            mb: 4,
            pb: 1,

            "&::after": {
              content: '""',
              position: "absolute",
              bottom: "-10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "80px",
              height: "4.5px",
              background: "linear-gradient(90deg, #9b86ff 0%, #7c3aed 100%)",
              borderRadius: "4px",
            },
          }}
        >
          Why Choose Us?
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#64748b",
            maxWidth: "700px",
            mx: "auto",
            mt: 1,
            fontSize: { xs: "16px", md: "18px" },
            lineHeight: 1.6,
          }}
        >
          We craft memorable weddings that match your style and budget,
          delivering excellence through our dedicated creative team.
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 5, md: 4 }} component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
        {FEATURES.map((f) => (
          <Grid
            key={f.id}
            item
            xs={12}
            sm={6}
            md={3}
            component="li"
            className="why-card"
            sx={{
              display: "flex",
              flexDirection: { xs: "row", md: "column" },
              alignItems: "center",
              textAlign: { xs: "left", md: "center" },
              gap: { xs: 3, md: 0 },
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
              },
            }}
          >
            <Box
              sx={{
                width: { xs: 72, md: 80 },
                height: { xs: 56, md: 64 },
                minWidth: { xs: 72, md: 80 },
                borderRadius: "40px",
                backgroundColor: "background.paper",
                display: "grid",
                placeItems: "center",
                mb: { xs: 3, md: 4 },
                boxShadow: "0 12px 30px rgba(124, 58, 237, 0.08)",
                color: f.accent ?? "primary.main",
                border: "1px solid",
                borderColor: "rgba(124, 58, 237, 0.08)",
                transition: "all 0.3s ease",
              }}
              aria-hidden
            >
              <Box
                sx={{
                  display: "flex",
                  transition: "transform 0.3s ease",
                  ".why-card:hover &": {
                    transform: "scale(1.15) rotate(5deg)",
                  },
                }}
              >
                {f.icon}
              </Box>
            </Box>

            <Box>
              <Typography
                id={`${f.id}-title`}
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: "text.primary",
                  mb: 1,
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                  lineHeight: 1.3,
                }}
              >
                {f.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.6,
                  fontSize: "0.95rem",
                  maxWidth: { xs: "100%", md: "240px" },
                  mx: "auto",
                }}
              >
                {f.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WhyChooseUs;
