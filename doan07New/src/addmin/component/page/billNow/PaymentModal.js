import styles from './BillList.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function PaymentModal({
    paymentMethod,
    setPaymentMethod,
    setShowCodPopup,
    setShowPaymentModal,
    checkoutbutton,
    selectedBillId,
}) {
    return (
        <div className={cx('modal')}>
            <div className={cx('modalContent')}>
                <h3 className={cx('modalTitle')}>chọn Phương thức thanh toán</h3>
                <div className={cx('paymentOptions')}>
                    <label className={cx('paymentOption')}>
                        <div className={cx('info')}>
                            <strong>Thanh toán trực tiếp (COD)</strong>
                            <span>Trả tiền mặt khi dùng bữa xong</span>
                        </div>
                        <input
                            type="radio"
                            name="payment"
                            value="cod"
                            checked={paymentMethod === 'cod'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    </label>

                    <label className={cx('paymentOption')}>
                        <div className={cx('info')}>
                            <strong>Chuyển khoản ngân hàng</strong>
                            <span>Thanh toán qua Internet Banking</span>
                        </div>
                        <input
                            type="radio"
                            name="payment"
                            value="bank"
                            checked={paymentMethod === 'bank'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    </label>

                    <label className={cx('paymentOption')}>
                        <div className={cx('info')}>
                            <strong>Ví điện tử Momo</strong>
                            <span>Thanh toán qua ứng dụng Momo</span>
                        </div>
                        <input
                            type="radio"
                            name="payment"
                            value="momo"
                            checked={paymentMethod === 'momo'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    </label>
                </div>

                <button
                    className={cx('confirmBtn')}
                    onClick={() => {
                        if (!paymentMethod) return alert('Vui lòng chọn phương thức!');
                        //   checkoutbutton(selectedBillId, paymentMethod);
                        if (paymentMethod === 'cod') {
                            setShowPaymentModal(false);
                            setShowCodPopup(true);
                            setPaymentMethod('');
                        }
                    }}
                >
                    Xác Nhận
                </button>
            </div>
        </div>
    );
}

export default PaymentModal;
