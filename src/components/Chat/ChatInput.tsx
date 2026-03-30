import React, { useState, useRef } from 'react';
import { Box, TextField, IconButton, alpha, useTheme, Tooltip } from '@mui/material';
import { Send, Smile, Paperclip } from 'lucide-react';

interface ChatInputProps {
    onSend: (message: string) => void;
    onTyping?: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, onTyping }) => {
    const theme = useTheme();
    const [text, setText] = useState('');
    const typingTimeoutRef = useRef<any>(null);

    const handleSend = () => {
        if (text.trim()) {
            onSend(text);
            setText('');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
        if (onTyping) {
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
            onTyping();
            typingTimeoutRef.current = setTimeout(() => {
                // Clear typing indicator after some time if needed, 
                // but usually the hook handles the broadcast.
            }, 2000);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <Box sx={{ 
            p: 2, 
            bgcolor: 'background.paper', 
            borderTop: '1px solid', 
            borderColor: alpha(theme.palette.divider, 0.05),
            display: 'flex',
            alignItems: 'center',
            gap: 1.5
        }}>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Tooltip title="Attach file">
                    <IconButton size="small" sx={{ color: 'text.secondary' }}>
                        <Paperclip size={20} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Emojis">
                    <IconButton size="small" sx={{ color: 'text.secondary' }}>
                        <Smile size={20} />
                    </IconButton>
                </Tooltip>
            </Box>

            <TextField
                fullWidth
                multiline
                maxRows={4}
                placeholder="Type your message..."
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                variant="outlined"
                size="small"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '16px',
                        bgcolor: alpha(theme.palette.divider, 0.03),
                        border: 'none',
                        '& fieldset': { border: 'none' },
                        '&:hover': { bgcolor: alpha(theme.palette.divider, 0.05) },
                        '&.Mui-focused': { bgcolor: 'transparent', boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}` }
                    },
                    '& .MuiInputBase-input': {
                        fontSize: '14px',
                        fontWeight: 500,
                        py: 1
                    }
                }}
            />

            <IconButton 
                onClick={handleSend}
                disabled={!text.trim()}
                sx={{ 
                    bgcolor: theme.palette.primary.main, 
                    color: '#fff',
                    borderRadius: '12px',
                    width: 44,
                    height: 44,
                    '&:hover': { bgcolor: theme.palette.primary.dark },
                    '&.Mui-disabled': { bgcolor: alpha(theme.palette.divider, 0.1), color: 'text.disabled' }
                }}
            >
                <Send size={20} />
            </IconButton>
        </Box>
    );
};

export default ChatInput;
