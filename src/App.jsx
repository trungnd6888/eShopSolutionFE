import { createTheme, ThemeProvider } from '@mui/material/styles';
import Router from "../routes";
import './App.css';

const theme = createTheme();

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </div>
  )
}

export default App
