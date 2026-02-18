import { type JSX } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";

const PrivacyPolicy = (): JSX.Element => {
    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, border: "1px solid #e5e7eb" }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, fontFamily: "'Fredoka One', cursive", color: "#1a1a1a" }}>
                    Privacy Policy
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 4, color: "#666" }}>
                    Last updated: {new Date().toLocaleDateString()}
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <section>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                            1. Introduction
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#444", lineHeight: 1.7 }}>
                            Welcome to WeddsPot. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                        </Typography>
                    </section>

                    <section>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                            2. Data We Collect
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#444", lineHeight: 1.7 }}>
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                            Identity Data, Contact Data, Technical Data, and Usage Data.
                        </Typography>
                    </section>

                    <section>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                            3. How We Use Your Data
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#444", lineHeight: 1.7 }}>
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                            <ul>
                                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                                <li>Where we need to comply with a legal obligation.</li>
                            </ul>
                        </Typography>
                    </section>

                    <section>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                            4. Contact Us
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#444", lineHeight: 1.7 }}>
                            If you have any questions about this privacy policy or our privacy practices, please contact us at support@weddspot.com.
                        </Typography>
                    </section>
                </Box>
            </Paper>
        </Container>
    );
};

export default PrivacyPolicy;
