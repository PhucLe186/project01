import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.scss';
import classNames from 'classnames/bind';
import { AuthContext } from '~/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import routesconfig from '~/config/routes';

const cx = classNames.bind(styles);

const Login = () => {
    const navigate = useNavigate();
    const { Loginadmin, user } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [showpassword, setShowpassword] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await Loginadmin(email, password);
        navigate(routesconfig.home);
    };

    return (
        <div className={cx('loginContainer')}>
            <div className={cx('loginBox')}>
                <h1 className={cx('loginTitle')}>Đăng nhập Quản trị</h1>

                {error && <div className={cx('errorMessage')}>{error}</div>}

                <form onSubmit={handleSubmit} className={cx('loginForm')}>
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

                    <button type="submit" className={cx('loginButton')} disabled={loading}>
                        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
