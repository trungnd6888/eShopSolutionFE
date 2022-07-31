import { createTheme, ThemeProvider } from '@mui/material/styles';
import Router from "../routes";
import './App.css';
import CustomizedSnackbar from './components/CustomizedSnackbar/CustomizedSnackbar';

const theme = createTheme();

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router />
        <CustomizedSnackbar />
      </ThemeProvider>
    </div>
  )
}

export default App
