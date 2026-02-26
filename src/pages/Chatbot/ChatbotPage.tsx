import { useEffect, useRef, useState, type JSX } from "react";
import {
  HubConnectionBuilder,
  LogLevel,
  HubConnection,
} from "@microsoft/signalr";
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  Avatar,
} from "@mui/material";
import DashboardCard from "../../components/Dashboard/DashboardCard/DashboardCard";
import { CHAT_SERVICE } from "../../api/services/chat";
import { authStore } from "../../utils/authSingleton";

interface ChatMessage {
  id?: string;
  userEmail?: string;
  message: string;
  createdAt: string;
}

const ChatbotPage = (): JSX.Element => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // fetch history
    (async () => {
      try {
        const data = await CHAT_SERVICE.GetHistory(1, 200);
        setMessages(data.items || []);
      } catch (e) {
        console.error("failed to fetch history", e);
      }
    })();
  }, []);

  useEffect(() => {
    // build SignalR connection
    const token = authStore.getAccessToken(); // or use context
    const hub = new HubConnectionBuilder()
      .withUrl(
        (import.meta.env.VITE_API_BASE || "http://localhost:5000") +
        "/hubs/chat",
        {
          accessTokenFactory: () => token ?? "",
          withCredentials: true,
        }
      )
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    hub.on("ReceiveMessage", (payload: ChatMessage) => {
      setMessages((prev) => [...prev, payload]);
      // scroll
      setTimeout(
        () =>
          listRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }),
        50
      );
    });

    hub
      .start()
      .then(() => setConnection(hub))
      .catch((err) => console.error("SignalR start failed", err));

    return () => {
      hub.stop().catch(() => { });
      setConnection(null);
    };
  }, []);

  const send = async () => {
    if (!text || !connection) return;
    setLoading(true);
    try {
      await connection.invoke("SendMessage", text);
      setText("");
    } catch (e) {
      console.error("send failed", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 900,
        margin: "24px auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <DashboardCard>
        <Typography variant="h6">WeddingCraft Chatbot</Typography>
        <Typography variant="body2">
          Live chat for support / demo. Messages are stored and broadcast in
          real-time.
        </Typography>
      </DashboardCard>

      <DashboardCard sx={{ height: "60vh", overflow: "auto" }}>
        <List>
          {messages.map((m, i) => (
            <ListItem key={m.id ?? i} sx={{ display: "flex", gap: 2 }}>
              <Avatar>
                {(m.userEmail || "Guest")[0]?.toUpperCase() ?? "G"}
              </Avatar>
              <Box>
                <Typography variant="subtitle2">
                  {m.userEmail ?? "Guest"}
                </Typography>
                <Typography variant="body1">{m.message}</Typography>
                <Typography variant="caption">
                  {new Date(m.createdAt).toLocaleString()}
                </Typography>
              </Box>
            </ListItem>
          ))}
          <div ref={listRef} />
        </List>
      </DashboardCard>

      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
        />
        <Button
          variant="contained"
          onClick={send}
          disabled={!connection || loading}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatbotPage;
