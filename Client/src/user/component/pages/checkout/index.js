import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import routesconfig from '~/config/routes';
import styles from './CheckoutPage.module.scss';
import axios from 'axios';
import cx from 'classnames';

const CheckoutPage = () => {
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [isProcessing, setIsProcessing] = useState(false);
    const [infor, setInfor] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchdata = async () => {
            const res = await axios.get('http://localhost:5000/detail/', { withCredentials: true });
            if (res.data.success) {
                const data = res.data.data;
                const cartItemsArray = Object.keys(data).map((key) => {
                    return {
                        ID_chitietban: key,
                        ...data[key],
                    };
                });
                const activeOrders = cartItemsArray
                    .filter((order) => order.trangthai === 1)
                    .sort((a, b) => {
                        const timeA = new Date(a.ThoiGian);
                        const timeB = new Date(b.ThoiGian);
                        return timeB - timeA;
                    });

                const transformedActiveOrders = activeOrders.map((order) => ({
                    ...order,

                    MonAn: Object.values(order.MonAn).map((mon) => ({
                        image: mon.HinhAnhMon,
                        TenMonAn: mon.TenMonAn,
                        Gia: mon.ThanhTien,
                        SoLuong: mon.soLuong,
                    })),
                }));
                setInfor(transformedActiveOrders);
            }
        };
        fetchdata();
    }, []);
    console.log(infor);
    const subtotal = infor[0]?.MonAn?.reduce((sum, item) => sum + item.Gia * item.SoLuong, 0) || 0;

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        // try {
        //     // Gửi toàn bộ thông tin đơn hàng
        //     const response = await axios.post(
        //         'http://localhost:5000/api/bills/addbill',
        //         {
        //             orderId: infor[0].ID_chitietban,
        //         },
        //         {
        //             withCredentials: true,
        //         },
        //     );
        //     if (response.data.success) {
                alert('Đặt hàng thành công!');
                navigate(routesconfig.home);
        //     } else {
        //         alert('Đặt hàng thất bại: ' + (response.data.message || 'Lỗi không xác định'));
        //     }
        // } catch (error) {
        //     alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.');
        // } finally {
        //     setIsProcessing(false);
        // }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Xác nhận đơn hàng</h1>

            <div className={styles.orderContainer}>
                {infor.length > 0 ? (
                    <>
                        <div className={styles.orderSection}>
                            <h2 className={styles.sectionTitle}>Thông tin đơn hàng</h2>
                            <div className={styles.orderInfo}>
                                <p>
                                    Mã đơn hàng: <strong>{infor[0]?.Ma_HoaDon}</strong>
                                </p>
                                <p>Ngày đặt: {infor[0]?.ThoiGian}</p>
                            </div>

                            <div className={styles.orderItems}>
                                {infor[0].MonAn.map((item, idx) => (
                                    <div key={idx} className={styles.orderItem}>
                                        <img src={item.image} alt={item.name} className={styles.itemImage} />
                                        <div className={styles.itemInfo}>
                                            <h4>{item.TenMonAn}</h4>
                                            <p>
                                                {item.Gia}đ x {item.SoLuong}
                                            </p>
                                        </div>
                                        <div className={styles.itemPrice}>{Number(item.Gia * item.SoLuong)}đ</div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.orderSummary}>
                                <div className={styles.summaryRow}>
                                    <span>Tạm tính: {subtotal}</span>
                                </div>
                                <div className={styles.summaryRow}>
                                    <span>Giảm giá: {subtotal - infor[0].TongTien}</span>
                                </div>
                                <div className={cx(styles.summaryRow, styles.totalRow)}>
                                    <span>Tổng cộng:{infor[0].TongTien}</span>
                                </div>
                            </div>
                        </div>

                        {/* Thông tin khách hàng */}
                        <div className={styles.customerSection}>
                            <h2 className={styles.sectionTitle}>Thông tin khách hàng</h2>
                            <div className={styles.customerInfo}>
                                <p>
                                    <strong>Họ tên:</strong> {infor[0]?.TenKhachHang}
                                </p>
                                <p>
                                    <strong>Điện thoại:</strong> {infor[0]?.SoDienThoai}
                                </p>
                            </div>
                        </div>

                        {/* Phương thức thanh toán */}
                        <div className={styles.paymentSection}>
                            <h2 className={styles.sectionTitle}>Phương thức thanh toán</h2>
                            <form onSubmit={handlePaymentSubmit} className={styles.paymentForm}>
                                <div className={styles.paymentMethods}>
                                    <label className={styles.paymentOption}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={paymentMethod === 'cod'}
                                            onChange={() => setPaymentMethod('cod')}
                                        />
                                        <div className={styles.paymentContent}>
                                            <span className={styles.paymentName}>Thanh toán trực tiếp (COD)</span>
                                            <span className={styles.paymentDesc}>Trả tiền mặt khi dùng bửa xong</span>
                                        </div>
                                    </label>

                                    <label className={styles.paymentOption}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="banking"
                                            checked={paymentMethod === 'banking'}
                                            onChange={() => setPaymentMethod('banking')}
                                        />
                                        <div className={styles.paymentContent}>
                                            <span className={styles.paymentName}>Chuyển khoản ngân hàng</span>
                                            <span className={styles.paymentDesc}>Thanh toán qua Internet Banking</span>
                                        </div>
                                    </label>

                                    <label className={styles.paymentOption}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="momo"
                                            checked={paymentMethod === 'momo'}
                                            onChange={() => setPaymentMethod('momo')}
                                        />
                                        <div className={styles.paymentContent}>
                                            <span className={styles.paymentName}>Ví điện tử Momo</span>
                                            <span className={styles.paymentDesc}>Thanh toán qua ứng dụng Momo</span>
                                        </div>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className={cx(styles.submitButton, {
                                        [styles.processing]: isProcessing,
                                    })}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? 'Đang xử lý...' : 'Đặt hàng & Thanh toán'}
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <p>Đang tải dữ liệu...</p>
                )}
            </div>
        </div>
    );
};

export default CheckoutPage;
