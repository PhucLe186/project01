import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './BillDetail.module.scss';

const BillDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bill, setBill] = useState([]);

    // 🔹 Load dữ liệu từ API hoặc database
    useEffect(() => {
        const fetchBill = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/bills/${id}`);
                const list = response.data;
                const data = Object.keys(response.data).map((key) => ({
                    ...list,
                }));
                console.log('data là', data);
                const transform = data.map((order) => ({
                    ...order,

                    MonAn: Object.values(order.MonAn).map((mon) => ({
                        image: mon.HinhAnhMon,
                        TenMonAn: mon.TenMonAn,
                        Gia: mon.ThanhTien,
                        SoLuong: mon.soLuong,
                    })),
                }));

                setBill(transform);
            } catch (error) {
                console.error('❌ Không tìm thấy hóa đơn!', error);
                setBill(null);
            }
        };

        fetchBill();
    }, [id]);
    console.log(bill);
    if (!bill) {
        return <h2 className={styles.notFound}>Hóa đơn không tồn tại!</h2>;
    }

    const handleEdit = () => {
        navigate(`/bills/edit/${bill[0]?.id}`, { state: { bill } });
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/bills/${id}`);
            alert('✅ Đã xóa hóa đơn!');
            navigate('/bills');
        } catch (error) {
            console.error('❌ Lỗi khi xóa hóa đơn!', error);
            alert('❌ Không thể xóa hóa đơn!');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Chi tiết hóa đơn #{bill[0]?.id}</h2>
            <div className={styles.info}>
                <p>
                    <strong>Khách hàng:</strong> {bill[0]?.TenKhachHang}
                </p>
                <p>
                    <strong>Bàn:</strong> {bill[0]?.TenBan}
                </p>
                <p>
                    <strong>Trạng thái:</strong>
                    <span className={bill.trangthai === 'Đã thanh toán' ? styles.paid : styles.unpaid}>
                        {bill[0]?.trangthai}
                    </span>
                </p>
            </div>

            <h3 className={styles.subTitle}>Danh sách món ăn</h3>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Món</th>
                        <th>Đơn giá (VND)</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {bill[0]?.MonAn?.map((item, index) => (
                        <tr key={index}>
                            <td>{item.TenMonAn}</td>
                            <td>{Number(item.Gia).toLocaleString()}</td>
                            <td>{item.SoLuong}</td>
                            <td>{Number(item.Gia * item.SoLuong).toLocaleString()} VND</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3 className={styles.total}>Tổng tiền: {Number(bill[0]?.TongTien).toLocaleString()} VND</h3>

            <div className={styles.actions}>
                <button className={styles.editButton} onClick={handleEdit}>
                    Sửa
                </button>
                <button className={styles.deleteButton} onClick={handleDelete}>
                    Xóa
                </button>
                <Link to="/bills" className={styles.backButton}>
                    Quay lại danh sách
                </Link>
            </div>
        </div>
    );
};

export default BillDetail;
