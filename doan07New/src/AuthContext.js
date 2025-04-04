import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:5000/auth/check', { withCredentials: true })
            .then((res) => setUser(res.data.user || res.data.admin))
            .catch(() => setUser(null));
    }, []);

    const Login = async (email, password) => {
        try {
            const res = await axios.post(
                'http://localhost:5000/auth/login',
                { email, password },
                { withCredentials: true },
            );
            setUser(res.data.user);
        } catch (error) {
            alert(error.response?.data?.message || 'Đăng nhập thất bại');
        }
    };

    const Loginadmin = async (email, password) => {
        try {
            const res = await axios.post(
                'http://localhost:5000/auth/admin',
                { email, password },
                { withCredentials: true },
            );
            setUser(res.data.admin);
        } catch (error) {
            alert(error.response?.data?.message || 'Đăng nhập thất bại');
        }
    };

    const logout = async () => {
        const res = await axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true });
        if (res.data.success) {
            setUser(null);
        }
    };

    return <AuthContext.Provider value={{ user, Login, logout, Loginadmin }}>{children}</AuthContext.Provider>;
};
