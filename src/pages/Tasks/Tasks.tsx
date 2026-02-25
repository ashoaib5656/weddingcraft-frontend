import { useState } from 'react';
import {
    Box,
    Typography,
    Checkbox,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Chip,
    IconButton,
    Button,
    alpha,
    useTheme,
    TextField
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Flag as FlagIcon,
    CalendarMonth as CalendarIcon
} from '@mui/icons-material';
import DashboardHeader from '../../components/Dashboard/DashboardHeader/DashboardHeader';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';

const Tasks = () => {
    const theme = useTheme();
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Confirm florist availability for June wedding', priority: 'High', due: 'Today', completed: false },
        { id: 2, text: 'Draft contract for Blue Lagoon Venue', priority: 'Medium', due: 'Tomorrow', completed: true },
        { id: 3, text: 'Follow up with catering team on menu changes', priority: 'High', due: 'Feb 26', completed: false },
        { id: 4, text: 'Schedule photography site visit', priority: 'Low', due: 'Mar 02', completed: false },
    ]);

    const toggleTask = (id: number) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const getPriorityColor = (priority: string) => {
        switch (priority.toLowerCase()) {
            case 'high': return 'error';
            case 'medium': return 'warning';
            case 'low': return 'info';
            default: return 'default';
        }
    };

    return (
        <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 800, margin: '0 auto' }}>
            <DashboardHeader
                title="My Tasks"
                subtitle="Manage and track your wedding coordination checklist."
                tag="To-Do"
            />

            <DashboardCard>
                <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                    <TextField
                        fullWidth
                        placeholder="Add a new task..."
                        variant="outlined"
                        size="small"
                    />
                    <Button variant="contained" startIcon={<AddIcon />} sx={{ px: 3, borderRadius: 2 }}>Add</Button>
                </Box>

                <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {tasks.map((task) => (
                        <ListItem
                            key={task.id}
                            sx={{
                                bgcolor: alpha(theme.palette.background.paper, 1),
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 3,
                                transition: '0.2s',
                                ...(task.completed && { opacity: 0.6, bgcolor: alpha(theme.palette.action.disabledBackground, 0.05) }),
                                '&:hover': { borderColor: theme.palette.primary.main, transform: 'translateY(-2px)' }
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <Checkbox
                                    checked={task.completed}
                                    onChange={() => toggleTask(task.id)}
                                    color="primary"
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={task.text}
                                secondary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <CalendarIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                                            <Typography variant="caption" sx={{ fontWeight: 600 }}>{task.due}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <FlagIcon sx={{ fontSize: 13, color: theme.palette.error.main }} />
                                            <Typography variant="caption" sx={{ fontWeight: 600 }}>{task.priority}</Typography>
                                        </Box>
                                    </Box>
                                }
                                primaryTypographyProps={{
                                    fontWeight: 700,
                                    fontSize: '0.95rem',
                                    sx: { textDecoration: task.completed ? 'line-through' : 'none' }
                                }}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Chip
                                    label={task.priority}
                                    size="small"
                                    color={getPriorityColor(task.priority) as any}
                                    sx={{ fontWeight: 800, fontSize: '0.6rem', height: 20 }}
                                />
                                <IconButton size="small" color="error"><DeleteIcon fontSize="small" /></IconButton>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </DashboardCard>
        </Box>
    );
};

export default Tasks;
