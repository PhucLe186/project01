import React from 'react';
import styles from './voucher.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const VoucherList = ({ vouchers, onSelectVoucher }) => {
    return (
        <div className={cx('voucher-list')}>
            <h2>Danh sách Voucher</h2>
            <ul className={cx('list')}>
                {vouchers.map((voucher, idx) => (
                    <li key={idx} onClick={() => onSelectVoucher(voucher)}>
                        <strong>{voucher.Vouchercode}</strong> - {voucher.MoTa}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VoucherList;
