import React from 'react';
import { Box, alpha, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const TypingIndicator: React.FC = () => {
    const theme = useTheme();
    const dotVariants = {
        animate: (i: number) => ({
            y: [0, -5, 0],
            transition: {
                delay: i * 0.15,
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut" as const
            }
        })
    };

    return (
        <Box sx={{ display: 'flex', gap: 0.5, p: '8px 16px', bgcolor: alpha(theme.palette.divider, 0.05), borderRadius: '16px', width: 'fit-content', ml: 1, mb: 1 }}>
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    custom={i}
                    variants={dotVariants}
                    animate="animate"
                    style={{
                        width: 6,
                        height: 6,
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: '50%',
                        opacity: 0.6
                    }}
                />
            ))}
        </Box>
    );
};

export default TypingIndicator;
