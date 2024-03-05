import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import styles from './styles.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { useBasket } from '../../contexts/BasketContext';

function Navbar() {
  const { loggedIn, logout } = useAuth();
  const { items } = useBasket();
  let navigate = useNavigate();
  const handleLogout = async () => {
    logout(() => {
      navigate('/');
    });
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to="/">E-Commerce</Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to="/">Products</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        {!loggedIn ? (
          <>
            <Link to="/signin">
              <Button colorScheme="pink">Login</Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="pink">Register</Button>
            </Link>{' '}
          </>
        ) : (
          <>
            {items.length > 0 && (
              <Link to={'/basket'}>
                <Button colorScheme={'pink'} variant="outline">
                  Basket {items.length}
                </Button>
              </Link>
            )}
            <Link to="/profile">
              <Button>Profile</Button>
            </Link>
            <Button
              colorScheme={'facebook'}
              variant="solid"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
