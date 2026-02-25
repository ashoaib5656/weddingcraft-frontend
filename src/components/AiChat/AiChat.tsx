import { useState, type JSX } from 'react';
import api from '../../api/axios';
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  alpha
} from '@mui/material';

const AiChat = (): JSX.Element => {
  const theme = useTheme();
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  const send = async () => {
    if (!prompt.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', text: prompt }]);
    try {
      const res = await api.post('/ai/design', {
        ProductType: 'general',
        Theme: prompt,
        ColorScheme: '',
        AdditionalDetails: ''
      });
      setMessages((prev) => [...prev, { role: 'assistant', text: res.data.response }]);
    } catch (e: any) {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Error: ' + (e?.message || 'unknown') }]);
    } finally {
      setPrompt('');
    }
  };

  return (
    <Box sx={{
      maxWidth: 900,
      margin: '0 auto',
      p: 4,
      background: alpha(theme.palette.background.paper, 0.8),
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
      boxShadow: `0 10px 40px ${alpha(theme.palette.primary.main, 0.05)}`,
    }}>
      <Typography variant="h5" sx={{
        mb: 3,
        color: 'text.primary',
        fontWeight: 700,
      }}>
        AI Assistant
      </Typography>

      <List sx={{
        mb: 4,
        maxHeight: 400,
        overflowY: 'auto',
        pr: 1,
        '&::-webkit-scrollbar': {
          width: 6,
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: theme.palette.divider,
          borderRadius: 3,
        }
      }}>
        {messages.map((m, i) => (
          <ListItem
            key={i}
            sx={{
              mb: 2,
              borderRadius: 3,
              bgcolor: m.role === 'user' ? alpha(theme.palette.primary.main, 0.05) : alpha(theme.palette.success.main, 0.05),
              borderLeft: '4px solid',
              borderColor: m.role === 'user' ? 'primary.main' : 'success.main',
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'translateX(4px)',
                bgcolor: m.role === 'user' ? alpha(theme.palette.primary.main, 0.08) : alpha(theme.palette.success.main, 0.08),
              }
            }}
          >
            <ListItemText
              primary={m.role === 'user' ? 'You' : 'AI'}
              secondary={m.text}
              primaryTypographyProps={{ fontWeight: 700, fontSize: '0.8rem', color: m.role === 'user' ? 'primary.main' : 'success.main' }}
              secondaryTypographyProps={{ color: 'text.primary', mt: 0.5 }}
            />
          </ListItem>
        ))}
      </List>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          fullWidth
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask something..."
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              bgcolor: 'background.paper',
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') send();
          }}
        />
        <Button
          variant="contained"
          onClick={send}
          sx={{
            height: 56,
            px: 4,
            borderRadius: 3,
            fontWeight: 700,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
              transform: 'translateY(-1px)',
            }
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default AiChat;
