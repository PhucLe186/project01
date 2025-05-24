import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.scss';
import classNames from 'classnames/bind';
import { AuthContext } from '~/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import routesconfig from '~/config/routes';
import logo from '../../../../asset/img/logo-removebg-preview.png'

const cx = classNames.bind(styles);

const Login = () => {
    const navigate = useNavigate();
    const { admin,Loginadmin} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [showpassword, setShowpassword] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


   if(admin){
        navigate(routesconfig.dashboard);
   }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await Loginadmin(email, password);
    };

    return (
        <div className={cx('loginContainer')}>

            <div className={cx('loginBox')}>
                <div className={cx('wrapper')}>
                    <img className={cx('image')} src={logo}/> 
                    </div>
                    <h1 className={cx('loginTitle')}>Đăng nhập Quản trị</h1>
               

                {error && <div className={cx('errorMessage')}>{error}</div>}

                <form onSubmit={handleSubmit} className={cx('loginForm')}>
                    <div className={cx('Form')}>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            className={cx('input')}
                            required
                        />
                        <div className={cx('show')}>
                            <input
                                type={showpassword ? 'text' : 'password'}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className={cx('input')}
                                required
                            />
                            <div className={cx('icon-show')} onClick={() => setShowpassword(!showpassword)}>
                                <FontAwesomeIcon icon={showpassword ? faEye : faEyeSlash} />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className={cx('loginButton')}>
                        Đăng nhập
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
