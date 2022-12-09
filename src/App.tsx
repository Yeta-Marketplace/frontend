
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme'
import { GlobalStyles } from './styles/globalStyles'
import useToken from './utils/token'

import ResponsiveAppBar from './components/ResponsiveAppBar'
import DevelopersAbout from './components/DevelopersAbout'
import Signup from './components/Login/Signup'
import Signin from './components/Login/Signin'
import Signout from './components/Login/Signout'
import About from './components/About'
import PageNotFound from './components/PageNotFound'
import YardSales from './components/YardSales'
import WorkInProgress from './components/WorkInProgress';
import Feedback from './components/Feedback';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { apiUrl } from './env'

import { OpenAPI } from './services/client'
OpenAPI.BASE = apiUrl;


function App() {

  const { token, setToken } = useToken();

  const signedIn = !!token;

  if (signedIn) {
    OpenAPI.TOKEN = token;
    OpenAPI.CREDENTIALS = "include";
  } else {
    OpenAPI.CREDENTIALS = "omit";
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <GlobalStyles />
          <CssBaseline />
          <ResponsiveAppBar signedIn={signedIn} />
          <Routes>
            <Route path="/" element={<YardSales signedIn={signedIn} />} />
            <Route path="/about" element={<About />} />
            <Route path="/developers" element={<DevelopersAbout />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={signedIn ? <Navigate to="/" /> : <Signin setToken={setToken} />} />
            <Route path="/signout" element={<Signout setToken={setToken} />} />
            <Route path="/feedback" element={signedIn ? <Feedback /> : <Navigate to="/signin" />} />
            <Route path="/workinprogress" element={<WorkInProgress />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </LocalizationProvider>
  )
}

export default App
