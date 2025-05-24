import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import classNames from 'classnames/bind';
import styles from './signup.module.scss';
import routesconfig from '~/config/routes';

const cx = classNames.bind(styles);

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setaddress] = useState('');
    const [error, setError] = useState('');
    const [otp, setOtp] = useState(''); //
    const [check, setCheck] = useState(false); //

    const navigate = useNavigate();
    const isMatch = confirmPassword && password === confirmPassword;

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('hãy kiểm tra email của bạn');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/auth/register', {
                name,
                phone,
                email,
                password,
                address,
            });
            console.log(response.data);
            if (response.data && response.data.success) {
                alert('mã OTP đã được gửi về mail của bạn');
                setCheck(!check);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Đăng ký thất bại');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/auth/verify', {
                email,
                otp,
            });
            if (res.data) {
                alert('Xác thực thành công!');
                navigate(routesconfig.login);
            }
        } catch (error) {
            console.error(error.response?.data || 'Lỗi không xác định');
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('formBox')}>
                <h2>Đăng Ký</h2>
                <form onSubmit={check === true ? handleVerifyOtp : handleSignUp}>
                    <input
                        type="text"
                        placeholder="họ và tên"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="username"
                        required
                        className={cx('innput1')}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="username"
                        required
                        className={cx('innput1')}
                    />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                        className={cx('innput1')}
                    />
                    <input
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                        required
                        className={cx('innput', isMatch ? 'true' : 'false')}
                    />
                    <input
                        type="text"
                        placeholder="Số điện thoại"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="new-phone"
                        className={cx('innput1')}
                    />
                    <input
                        type="text"
                        placeholder="address"
                        value={address}
                        onChange={(e) => setaddress(e.target.value)}
                        className={cx('innput1')}
                    />
                    {check === true && (
                        <input
                            type="text"
                            placeholder="nhập otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className={cx('innput1')}
                        />
                    )}
                    {error && <p className={cx('error')}>{error}</p>}
                    <button
                        onClick={() => {
                            setError('');
                        }}
                        className={cx('button')}
                        type="submit"
                    >
                        Đăng ký
                    </button>
                </form>
                <div className={cx('note')}>
                    Đã có tài khoản? <div>Đăng nhập</div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
