import { createTheme, responsiveFontSizes } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    dashboard: {
      glass: string;
      glassBorder: string;
      cardRadius: number | string;
      transition: string;
    };
  }
  interface ThemeOptions {
    dashboard?: {
      glass?: string;
      glassBorder?: string;
      cardRadius?: number | string;
      transition?: string;
    };
  }
}

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#7c3aed' },         // purple/violet
    secondary: { main: '#6366f1' },       // indigo accent
    success: { main: '#22c55e' },
    warning: { main: '#f59e0b' },
    error: { main: '#ef4444' },
    info: { main: '#0ea5e9' },
    background: {
      default: '#f8fafc',
      paper: '#ffffff'
    },
    text: {
      primary: '#0f172a',
      secondary: '#64748b'
    }
  },
  shape: { borderRadius: 12 },
  dashboard: {
    glass: 'rgba(255, 255, 255, 0.9)',
    glassBorder: 'rgba(226, 232, 240, 0.6)',
    cardRadius: '1.5rem',
    transition: '0.4s cubic-bezier(0.16, 1, 0.3, 1)'
  },
  typography: {
    fontFamily: `Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"`,
    fontWeightMedium: 600,
    button: { textTransform: 'none', fontWeight: 600 },
    h3: { fontWeight: 800 },
    h4: { fontWeight: 800 },
    h6: { fontWeight: 800 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24, // var(--border-radius-xl) is 1.5rem = 24px
          border: '1px solid rgba(226, 232, 240, 0.6)',
          boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.08)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(16px) saturate(180%)',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: 'none',
          padding: '10px 24px',
        },
        contained: {
          boxShadow: '0px 3px 3px #2f3f5359'
        }
      },
      variants: [
        {
          props: { variant: 'cta' as any },
          style: {
            backgroundColor: '#ff7f88',
            color: '#fff',
            padding: '8px 22px',
            borderRadius: 12,
            fontWeight: 600,
            boxShadow: '0px 3px 10px rgba(255,120,136,0.40)',
            ':hover': { backgroundColor: '#ff6773' }
          }
        },
        {
          props: { variant: 'ghost' as any },
          style: {
            backgroundColor: '#f1f5f9',
            color: '#0f172a',
            padding: '8px 18px',
            borderRadius: 12,
            ':hover': { backgroundColor: '#e2e8f0' }
          }
        }
      ]
    }
  }
});

theme = responsiveFontSizes(theme);
export default theme;
