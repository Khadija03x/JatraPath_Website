import React, { useState } from 'react';
import Header from './header.jsx';
import Footer from './footer.jsx';

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={menuOpen ? "menu-open" : ""}>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout