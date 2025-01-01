import { ReactNode, ReactElement } from 'react';
import { Box, Container, Paper, Tabs, Tab, useTheme, Breadcrumbs, Link, Typography, Grid, IconButton, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavigateNext, Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';

interface TabItem {
  label: string;
  path: string;
  icon?: ReactElement;
}

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  country?: string;
  category?: string;
  tabs?: TabItem[];
  breadcrumbs?: {
    label: string;
    path?: string;
  }[];
}

export function PageLayout({ children, title, subtitle, country, category, tabs, breadcrumbs }: PageLayoutProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname + location.hash;
  const currentTab = tabs?.findIndex(tab => {
    // Remove the pathname part from tab.path if it matches current pathname
    const tabPath = tab.path.startsWith(location.pathname)
      ? tab.path.slice(location.pathname.length)
      : tab.path;
    return currentPath.endsWith(tabPath);
  }) ?? -1;

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    if (tabs) {
      const newPath = tabs[newValue].path;
      // If the path is just a hash, append it to current pathname
      if (newPath.startsWith('#')) {
        navigate(location.pathname + newPath);
      } else {
        navigate(newPath);
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          pt: 8,
          pb: 4,
          background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          {breadcrumbs && (
            <Breadcrumbs
              separator={<NavigateNext fontSize="small" sx={{ color: 'white' }} />}
              sx={{ mb: 2, '& .MuiBreadcrumbs-li': { color: 'white' } }}
            >
              {breadcrumbs.map((crumb, index) => (
                <Box key={index}>
                  {crumb.path ? (
                    <Link
                      color="inherit"
                      href={crumb.path}
                      sx={{
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <Typography color="inherit">{crumb.label}</Typography>
                  )}
                </Box>
              ))}
            </Breadcrumbs>
          )}
          
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="h6" sx={{ opacity: 0.8 }}>
              {subtitle}
            </Typography>
          )}
          {country && (
            <Typography variant="h6" sx={{ opacity: 0.8 }}>
              {country}
            </Typography>
          )}
          {category && (
            <Typography variant="h6" sx={{ opacity: 0.8 }}>
              {category}
            </Typography>
          )}
        </Container>
      </Box>

      {/* Navigation Tabs */}
      {tabs && (
        <Paper
          elevation={0}
          sx={{
            position: 'sticky',
            top: 64, // AppBar height
            zIndex: theme.zIndex.appBar - 1,
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          <Container maxWidth="lg">
            <Tabs
              value={currentTab !== -1 ? currentTab : 0}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  minHeight: 48,
                  py: 1,
                },
              }}
            >
              {tabs.map((tab, index) => {
                const TabIcon = tab.icon ? () => tab.icon! : undefined;
                return (
                  <Tab
                    key={index}
                    label={tab.label}
                    icon={TabIcon && <TabIcon />}
                    iconPosition="start"
                    sx={{
                      minHeight: 48,
                      textTransform: 'none',
                      fontWeight: theme.typography.fontWeightMedium,
                    }}
                  />
                );
              })}
            </Tabs>
          </Container>
        </Paper>
      )}

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
        {children}
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          bgcolor: 'primary.dark',
          color: 'white',
          py: 6,
          mt: 'auto'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Company Info */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Koreer
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                Empowering tech professionals with career insights and community support for success in the Canadian tech industry.
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton size="small" sx={{ color: 'white' }}>
                  <LinkedIn />
                </IconButton>
                <IconButton size="small" sx={{ color: 'white' }}>
                  <Twitter />
                </IconButton>
                <IconButton size="small" sx={{ color: 'white' }}>
                  <Facebook />
                </IconButton>
                <IconButton size="small" sx={{ color: 'white' }}>
                  <Instagram />
                </IconButton>
              </Stack>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Stack spacing={1}>
                <Link href="/employment" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1, textDecoration: 'underline' } }}>
                  Employment Guide
                </Link>
                <Link href="/community" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1, textDecoration: 'underline' } }}>
                  Community
                </Link>
                <Link href="/company" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1, textDecoration: 'underline' } }}>
                  Companies
                </Link>
                <Link href="/about" color="inherit" sx={{ opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1, textDecoration: 'underline' } }}>
                  About Us
                </Link>
              </Stack>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Contact
              </Typography>
              <Stack spacing={1} sx={{ opacity: 0.8 }}>
                <Typography variant="body2">
                  Vancouver, BC, Canada
                </Typography>
                <Link href="mailto:contact@koreer.com" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  contact@koreer.com
                </Link>
              </Stack>
            </Grid>
          </Grid>

          {/* Copyright */}
          <Typography
            variant="body2"
            sx={{
              mt: 4,
              pt: 2,
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              opacity: 0.8,
              textAlign: 'center'
            }}
          >
            {new Date().getFullYear()} Koreer. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
