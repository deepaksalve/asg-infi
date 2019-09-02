import React from 'react';
import cx from 'classnames';

const Header = ({ isLoggedIn, onLogout }) => (
  <header>
    <nav>
      <ul>
        <li className={cx('header--item ml--s active logo')}>Infilect</li>
        {isLoggedIn && (
          <li className={cx('header--item ml--s active fl--r')}>
            <span onClick={onLogout}>Log Out</span>
          </li>
        )}
      </ul>
    </nav>
  </header>
);

export default Header;
