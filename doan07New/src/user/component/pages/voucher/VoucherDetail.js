// src/components/VoucherDetail.js
import React from 'react';
import styles from './voucher.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const VoucherDetail = ({ voucher, onUseVoucher }) => {
    if (!voucher) {
        return <div className={cx('text')}>Vui lòng chọn một voucher để xem chi tiết.</div>;
    }

    return (
        <div className={cx('voucher-detail')}>
            <h2>Chi tiết Voucher</h2>
            <p>
                <strong>Mã Voucher:</strong> {voucher.Vouchercode}
            </p>
            <p>
                <strong>Mô tả:</strong> {voucher.MoTa}
            </p>
            <p>
                <strong>Giảm giá:</strong> {voucher.GiaTriVoucher}
                {Number(voucher.GiaTriVoucher) <= 100 ? '%' : 'VNĐ'}
            </p>
            <p>
                <strong>Hạn sử dụng:</strong> {voucher.NgayHetHan}
            </p>
            <button onClick={() => onUseVoucher(voucher)}>Sử dụng Voucher</button>
        </div>
    );
};

export default VoucherDetail;
