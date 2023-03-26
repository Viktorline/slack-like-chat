import React, { useState } from 'react';
import {
  Button, ButtonGroup, Container, Dropdown, DropdownButton, Navbar,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/index.js';

const Header = () => {
  const auth = useAuth();
  const { t, i18n } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const buttonWidth = (auth.user?.username?.length ?? 0) * 12;

  return (
    <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Hexlet Chat
        </Navbar.Brand>
        {auth.user ? (
          <ButtonGroup>
            <DropdownButton
              as={ButtonGroup}
              title={i18n.language}
              id="bg-nested-dropdown"
              variant="outline-secondary"
              className="btn-outline-secondary"
            >
              <Dropdown.Item variant="secondary" onClick={() => i18n.changeLanguage('ru')}>
                {t('ru')}
              </Dropdown.Item>
              <Dropdown.Item variant="secondary" onClick={() => i18n.changeLanguage('en')}>
                {t('en')}
              </Dropdown.Item>
            </DropdownButton>
            {auth.user && (
              <Button
                variant=""
                className="btn-outline-secondary"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  auth.logOut();
                  handleMouseLeave();
                }}
                style={{ width: `${buttonWidth <= 80 ? 90 : buttonWidth}px` }}
              >
                {isHovered ? t('logout') : auth.user.username}
              </Button>
            )}
          </ButtonGroup>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default Header;
