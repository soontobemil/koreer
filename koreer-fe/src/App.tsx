import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./components/common/Header";
import { Footer } from "./components/common/Footer";
import theme from './theme';
import { useEffect, useLayoutEffect } from 'react';
import Contact from './components/contactus/Contact';
import { ChatBot } from './components/common/ChatBot';

function App() {
  const location = useLocation();

  // 페이지 이동 시 스크롤 처리
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // 새로고침 시 스크롤 처리
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
        <Footer />
        <ChatBot />
      </Box>
    </ThemeProvider>
  );
}

export default App;
