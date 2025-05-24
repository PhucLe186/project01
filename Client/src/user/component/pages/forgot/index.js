import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './forgot.module.scss';
import Button from '~/component/Button';
import routesconfig from '~/config/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function Forgot() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');
    const [sigup, setSigup] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showtext, setShowtext] = useState(false);
    const [showtext1, setShowtext1] = useState(false);
    const navigate = useNavigate();

    console.log(confirmPassword);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/auth/forgot', { email });

            if (res.data && res.data.success) {
                alert('mã OTP đã được gửi về mail của bạn');
                setShow(!show);
                setError('');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'lỗi');
            setSigup(true);
        }
    };
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const check = await axios.post('http://localhost:5000/auth/verifyy', {
                email,
                otp,
                password,
            });
            if (check.data && check.data.success) {
                alert('Xác thực thành công!');
                navigate(routesconfig.login);
            }
        } catch (error) {
            console.error(error.response?.data.message || 'Lỗi không xác định');
        }
    };

    return (
        <div className={cx('parren')}>
            <div className={cx('from')}>
                <h2>Đặt lại mật khẩu</h2>
                <form onSubmit={show ? handleVerifyOtp : handleSubmit}>
                    {show === false && (
                        <input
                            className={cx('email')}
                            type="email"
                            placeholder="Nhập email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    )}
                    {show === true && (
                        <div>
                            <div className={cx('show')}>
                                <input
                                    type={showtext ? 'text' : 'password'}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className={cx('input')}
                                    required
                                    autocomplete="current-password"
                                />
                                <div className={cx('icon-show')} onClick={() => setShowtext(!showtext)}>
                                    <FontAwesomeIcon icon={showtext ? faEye : faEyeSlash} />
                                </div>
                            </div>
                            <div className={cx('show')}>
                                <input
                                    type={showtext1 ? 'text' : 'password'}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="firmPassword"
                                    className={cx('input')}
                                    required
                                    autocomplete="current-password"
                                />
                                <div className={cx('icon-show')} onClick={() => setShowtext1(!showtext1)}>
                                    <FontAwesomeIcon icon={showtext1 ? faEye : faEyeSlash} />
                                </div>
                            </div>
                            <div className={cx('inner')}>
                                <input
                                    className={cx('otp')}
                                    type="text"
                                    placeholder="Nhập otp "
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                                <button className={cx('button')}>gửi lại</button>
                            </div>
                        </div>
                    )}
                    <p className={cx('error')}>{error}</p>
                    <button className={cx('button2')} type="submit">
                        Gửi email
                    </button>
                    {sigup === true && (
                        <Button Sigup to={routesconfig.signup}>
                            đăng ký
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Forgot;
