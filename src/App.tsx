
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme'
import { GlobalStyles } from './styles/globalStyles'
import useToken from './utils/token'

import Header from './components/Header'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Signout from './components/Signout'
import Home from './components/Home'
import PageNotFound from './components/PageNotFound'
import YardSales from './components/YardSales'
import WorkInProgress from './components/WorkInProgress';

function App() {

  const { token, setToken } = useToken();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyles />
        <CssBaseline />
        <Header signedIn={!!token} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={!token ? <Signin setToken={setToken} /> : <Navigate to="/" />} />
          <Route path="/signout" element={<Signout setToken={setToken} />} />
          <Route path="/yardsales" element={<YardSales signedIn={!!token} />} />
          <Route path="/workinprogress" element={<WorkInProgress />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
