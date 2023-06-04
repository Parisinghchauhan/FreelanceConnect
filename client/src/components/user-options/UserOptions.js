import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './UserOptions.css';
import Cookies from 'js-cookie';
import UserContext from '../../UserContext';
import { useNavigate } from 'react-router-dom';

function logout() {
  Cookies.remove('token');
  Cookies.remove('userId');
  window.location.reload();
}

function UserOptions() {
  const [show, setShow] = useState(false);
  const userOptionsRef = useRef(null);

  const showUserOptions = () => setShow(!show);

  const navigate = useNavigate();

  const userId = useContext(UserContext).userId;

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (userOptionsRef.current && !userOptionsRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleOptionClick = () => {
    setShow(false);
  };

  const handleSwitchClick = () => {
    const isFreelancer = Cookies.get('isFreelancer') === 'true';
    Cookies.set('isFreelancer', (!isFreelancer).toString());
    window.location.reload();
    setShow(false);
  };

  return (
    <div className="user-options" ref={userOptionsRef}>
      <div className="user-options__icon" onClick={showUserOptions}>
        {show ? (
          <span className="material-symbols-outlined activated">account_circle</span>
        ) : (
          <span className="material-symbols-outlined">account_circle</span>
        )}
      </div>
      {show && (
        <div className="user-options__wrapper">
          <div className="user-options__body">
            <Link to={`/user/${userId}`} onClick={handleOptionClick}>
              <div className="user-options__body__item">
                <div className="user-options__body__item__content">
                  <span className="material-symbols-outlined">person</span>
                  <p className="user-options__body__item__content__message">Profile</p>
                </div>
              </div>
            </Link>
            <div className="user-options__body__item" onClick={handleSwitchClick}>
              <div className="user-options__body__item__content">
                <span className="material-symbols-outlined">cached</span>
                <p className="user-options__body__item__content__message">Switch</p>
              </div>
            </div>
            <div className="user-options__body__item" onClick={() => {
              handleOptionClick();
              Cookies.remove('token');
              navigate('/login');
              window.location.reload();
            }}>
              <div className="user-options__body__item__content">
                <span className="material-symbols-outlined">logout</span>
                <p className="user-options__body__item__content__message">Logout</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserOptions;
