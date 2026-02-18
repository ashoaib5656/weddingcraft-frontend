import { useState, type JSX } from 'react';
import api from '../../api/axios';
import { Box, TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';

import './AiChat.scss';

const AiChat = (): JSX.Element => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  const send = async () => {
    if (!prompt.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', text: prompt }]);
    try {
      const res = await api.post('/ai/design', { ProductType: 'general', Theme: prompt, ColorScheme: '', AdditionalDetails: '' });
      setMessages((prev) => [...prev, { role: 'assistant', text: res.data.response }]);
    } catch (e: any) {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Error: ' + (e?.message || 'unknown') }]);
    } finally {
      setPrompt('');
    }
  };

  return (
    <Box className="ai-chat-root">
      <Typography variant="h5" className="chat-header">
        AI Assistant
      </Typography>
      <List className="message-list">
        {messages.map((m, i) => (
          <ListItem
            key={i}
            className={`message-item ${m.role === 'user' ? 'user-message' : 'ai-message'}`}
          >
            <ListItemText primary={m.role === 'user' ? 'You' : 'AI'} secondary={m.text} />
          </ListItem>
        ))}
      </List>
      <Box className="input-area">
        <TextField
          fullWidth
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          label="Ask something..."
          className="chat-input"
        />
        <Button
          variant="contained"
          onClick={send}
          className="send-btn"
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default AiChat;
