import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { AuthContext } from '~/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import styles from './Login.module.scss';
import routesconfig from '~/config/routes';
import Button from '~/component/Button';

const cx = classNames.bind(styles);

function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const { user, Login } = useContext(AuthContext);
    const [password, setPassword] = useState('');
    const [showpassword, setShowpassword] = useState(false);
    const navigate = useNavigate();
    if (user) {
        navigate(routesconfig.home);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await Login(email, password);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('formBox')}>
                <div className={cx('toggle')}>
                    <button className={cx('button', isLogin ? 'active' : '')} onClick={() => setIsLogin(true)}>
                        Login
                    </button>
                </div>

                <h2>Login</h2>

                <form onSubmit={handleSubmit} className={cx('form')}>
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
                    {isLogin && (
                        <Button forgot to={routesconfig.fogot}>
                            Forgot password?
                        </Button>
                        // <a href="#" className={cx('forgotPassword')}>
                        //     Forgot password?
                        // </a>
                    )}
                    <button className={cx('button')} type="submit">
                        {cx('Login')}
                    </button>
                </form>

                <p>
                    Not a member?
                    <Button Users to={routesconfig.signup}>
                        đăng ký
                    </Button>
                </p>
            </div>
        </div>
    );
}

export default Login;
