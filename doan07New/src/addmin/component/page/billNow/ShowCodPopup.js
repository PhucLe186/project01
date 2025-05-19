import styles from './BillList.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function showCodPopup({ setShowCodPopup, price, cashGiven, setCashGiven, checkoutbutton, selectedBillId }) {
    return (
        <div className={cx('overlay')}>
            <div className={cx('codPopup')}>
                <h3>Thanh toán COD</h3>
                <div className={cx('formGroup')}>
                    <label>Số tiền cần thanh toán:</label>
                    <input type="text" value={price.toLocaleString() + ' VNĐ'} readOnly />
                </div>
                <div className={cx('formGroup')}>
                    <label>Tiền khách đưa:</label>
                    <input
                        type="text"
                        value={cashGiven.toLocaleString()}
                        onChange={(e) => setCashGiven(e.target.value)}
                    />
                </div>
                <div className={cx('formGroup')}>
                    <label>Tiền thừa:</label>
                    <input
                        type="text"
                        value={cashGiven ? (Number(cashGiven) - price).toLocaleString() + ' VNĐ' : ''}
                        readOnly
                    />
                </div>
                <div className={cx('buttonGroup')}>
                    <button
                        onClick={() => {
                            setShowCodPopup(false);
                            checkoutbutton(selectedBillId);
                        }}
                    >
                        Xác nhận thanh toán
                    </button>
                    <button
                        onClick={() => {
                            setShowCodPopup(false);
                        }}
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
}

export default showCodPopup;
