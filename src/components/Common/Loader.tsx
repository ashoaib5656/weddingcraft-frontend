import React from 'react';
import { Box, Typography, alpha, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface LoaderProps {
    fullScreen?: boolean;
    message?: string;
}

const Loader: React.FC<LoaderProps> = ({ fullScreen = false, message = "Preparing your experience..." }) => {
    const theme = useTheme();

    const containerStyles = fullScreen ? {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        background: alpha(theme.palette.background.default, 0.8),
        backdropFilter: 'blur(12px) saturate(180%)',
    } : {
        width: '100%',
        height: '300px',
        background: 'transparent',
    };

    return (
        <Box sx={{
            ...containerStyles,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Box sx={{ position: 'relative', width: 120, height: 120 }}>
                {/* Outer Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        border: `2px solid transparent`,
                        borderTop: `2px solid ${theme.palette.primary.main}`,
                        borderRight: `2px solid ${theme.palette.secondary.main}`,
                    }}
                />
                
                {/* Inner Pulse Ring */}
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: 'absolute',
                        top: '15%',
                        left: '15%',
                        width: '70%',
                        height: '70%',
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    }}
                />

                {/* Center Spinning Diamond/Icon */}
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <motion.div
                        animate={{ 
                            rotate: [0, 45, 90, 135, 180],
                            scale: [0.8, 1, 0.8]
                        }}
                        transition={{ 
                            duration: 4, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                        }}
                        style={{
                            width: 24,
                            height: 24,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                            borderRadius: '6px',
                            boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                        }}
                    />
                </Box>
            </Box>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                <Typography 
                    variant="subtitle1" 
                    sx={{ 
                        mt: 4, 
                        fontWeight: 700, 
                        letterSpacing: '0.05em',
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textAlign: 'center'
                    }}
                >
                    {message.toUpperCase()}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                            style={{
                                width: 4,
                                height: 4,
                                borderRadius: '50%',
                                background: theme.palette.primary.main,
                                margin: '0 3px'
                            }}
                        />
                    ))}
                </Box>
            </motion.div>
        </Box>
    );
};

export default Loader;
