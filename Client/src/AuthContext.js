import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null)

    useEffect(() => {
  const fetchData = async () => {
    try {
      const [userRes, adminRes] = await Promise.all([
        axios.get('http://localhost:5000/auth/check', { withCredentials: true }),
        axios.get('http://localhost:5000/admin/check', { withCredentials: true })
      ]);
      setUser(userRes.data.user);
      setAdmin(adminRes.data.admin);
    } catch (error) {
      setUser(null);
      setAdmin(null);
    }
  };

  
  fetchData();
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
                'http://localhost:5000/admin/login',
                { email, password },
                { withCredentials: true },
            );
            setAdmin(res.data.admin);
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
    const logoutadmin = async () => {
        const response = await axios.post('http://localhost:5000/admin/logout', {}, { withCredentials: true });
        if (response.data.success) {
            setAdmin(null);
        }
    };

    return <AuthContext.Provider value={{ user, admin,  Login, Loginadmin, logout, logoutadmin }}>{children}</AuthContext.Provider>;
};
