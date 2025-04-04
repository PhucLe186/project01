import React, { useState, useEffect } from 'react';
import styles from './member.module.scss';
import axios from 'axios';

const Member = () => {
    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await axios.get('http://localhost:5000/customer/');
                const cartData = res.data;

                const cartItemsArray = Object.keys(cartData).map((key) => {
                    return {
                        ID_KhachHang: key,
                        ...cartData[key],
                    };
                });
                setCustomers(cartItemsArray);
            } catch (error) {
                console.log(error.response?.data?.message || 'lỗi lấy menu');
            }
        };
        fetchdata();
    }, []);
    console.log(customers);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
    });

    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingId) {
            setCustomers(
                customers.map((customer) => (customer.id === editingId ? { ...customer, ...formData } : customer)),
            );
        } else {
            const newCustomer = {
                ...formData,
                id: customers.length > 0 ? Math.max(...customers.map((c) => c.id)) + 1 : 1,
            };
            setCustomers([...customers, newCustomer]);
        }

        setFormData({ name: '', phone: '', email: '', address: '' });
        setEditingId(null);
    };

    const handleEdit = (customer) => {
        setFormData(customer);
        setEditingId(customer.id);
    };

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
            setCustomers(customers.filter((customer) => customer.id !== id));
        }
    };

    const filteredCustomers = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Quản Lý Khách Hàng</h1>

            {/* Form thêm/chỉnh sửa */}
            <div className={styles.formContainer}>
                <h2 className={styles.formTitle}>{editingId ? 'Chỉnh sửa' : 'Thêm'} Khách Hàng</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Họ tên:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className={styles.inputField}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Số điện thoại:</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className={styles.inputField}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={styles.inputField}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Địa chỉ:</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className={styles.inputField}
                        />
                    </div>

                    <div className={styles.formActions}>
                        {editingId && (
                            <button
                                type="button"
                                onClick={() => {
                                    setFormData({ name: '', phone: '', email: '', address: '' });
                                    setEditingId(null);
                                }}
                                className={styles.cancelButton}
                            >
                                Hủy
                            </button>
                        )}
                        <button type="submit" className={styles.submitButton}>
                            {editingId ? 'Cập nhật' : 'Thêm'}
                        </button>
                    </div>
                </form>
            </div>

            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
            </div>

            {/* Bảng danh sách khách hàng */}
            <div className={styles.tableContainer}>
                <table className={styles.customerTable}>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Họ tên</th>
                            <th>SĐT</th>
                            <th>Email</th>
                            <th>Địa chỉ</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.length > 0 ? (
                            filteredCustomers.map((customer, index) => (
                                <tr key={customer.ID_MonAn}>
                                    <td>{index + 1}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.address}</td>
                                    <td>
                                        <button onClick={() => handleEdit(customer)} className={styles.editButton}>
                                            Sửa
                                        </button>
                                        <button
                                            onClick={() => handleDelete(customer.id)}
                                            className={styles.deleteButton}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className={styles.noData}>
                                    Không có khách hàng nào
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Member;
