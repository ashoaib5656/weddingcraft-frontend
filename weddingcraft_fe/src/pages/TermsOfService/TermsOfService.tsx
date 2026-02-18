import { type JSX } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";

const TermsOfService = (): JSX.Element => {
    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, border: "1px solid #e5e7eb" }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, fontFamily: "'Fredoka One', cursive", color: "#1a1a1a" }}>
                    Terms of Service
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 4, color: "#666" }}>
                    Last updated: {new Date().toLocaleDateString()}
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <section>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                            1. Agreement to Terms
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#444", lineHeight: 1.7 }}>
                            By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations. If you do not agree with these terms, you are prohibited from using or accessing this site.
                        </Typography>
                    </section>

                    <section>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                            2. User Accounts
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#444", lineHeight: 1.7 }}>
                            When you create an account with us, you safeguard your password and use of your account. You are responsible for keeping your password confidential. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                        </Typography>
                    </section>

                    <section>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                            3. Intellectual Property
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#444", lineHeight: 1.7 }}>
                            The Service and its original content, features and functionality are and will remain the exclusive property of WeddsPot and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
                        </Typography>
                    </section>

                    <section>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                            4. Termination
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#444", lineHeight: 1.7 }}>
                            We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                        </Typography>
                    </section>
                </Box>
            </Paper>
        </Container>
    );
};

export default TermsOfService;
