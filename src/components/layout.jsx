import React from 'react';
import Header from './header.jsx';
import Footer from './footer.jsx';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout