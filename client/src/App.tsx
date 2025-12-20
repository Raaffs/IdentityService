import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css'
import AppRouter from './routes/router'


const theme = createTheme();
function App() {
  console.log("api: ",import.meta.env.VITE_API_URL);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
} 
export default App
