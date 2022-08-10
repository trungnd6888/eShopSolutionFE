import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Router from "../routes";
import './App.css';
import CustomizedSnackbar from './components/CustomizedSnackbar/CustomizedSnackbar';
import customTheme from './utils/theme';

const theme = customTheme;

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Router />
        <CustomizedSnackbar />
      </ThemeProvider>
    </div>
  )
}

export default App
