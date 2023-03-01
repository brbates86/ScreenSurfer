import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header>
      <div>
        <Link>
         Home
        </Link>
        
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link>
                Profile
              </Link>
              <button  onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link>
                Login
              </Link>
              <Link>
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
