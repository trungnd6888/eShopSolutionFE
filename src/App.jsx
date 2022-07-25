import { Routes, Route } from "react-router-dom"
import Login from "./components/Login/Login"
import './App.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme();

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </ThemeProvider>
    </div>
  )
}

export default App
