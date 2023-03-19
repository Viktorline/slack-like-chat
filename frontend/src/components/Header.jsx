import React, { useState } from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/index.js';

const Header = () => {
  const auth = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();

  return (
    <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Hexlet Chat
        </Navbar.Brand>
        {auth.user ? (
          <Button
            variant=""
            className="btn-outline-secondary"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ minWidth: '100px' }}
            onClick={() => {
              setIsHovered(false);
              auth.logOut();
            }}
          >
            {isHovered ? t('logout') : auth.user.username}
          </Button>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default Header;
