
import React from 'react';
import CustomAppBar from './common/AppBar';
import Footer from './common/Footer';
import { Box } from '@mui/material';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box>
      <CustomAppBar />
      <main>
        {children}
      </main>
      <Footer />

    </Box>
  );
};

export default Layout;
