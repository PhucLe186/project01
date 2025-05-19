import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './histoty.module.scss';
import moment from 'moment';

const cx = classNames.bind(styles);

const LichSuDatBan = ({ put, abort, huyDon, getStatus }) => {
    const [show, setShow] = useState(false);

    return (
        <div className={cx('container')}>
            <h2 className={cx('title')}>Lịch Sử Đặt Bàn</h2>
            <button className={cx('toggleButton')} onClick={() => setShow(!show)}>
                {show ? 'Xem Đơn Đã Đặt' : 'Xem Đơn Đã Hủy'}
            </button>

            {!show ? (
                <>
                    <h3 className={cx('subtitle')}>Đã Đặt</h3>
                    <table className={cx('table')}>
                        <thead>
                            <tr className={cx('headerRow')}>
                                <th className={cx('cell')}>Mã Bàn</th>
                                <th className={cx('cell')}>Ngày đến</th>
                                <th className={cx('cell')}>Tổng tiền</th>
                                <th className={cx('cell')}>Trạng thái</th>
                                <th className={cx('cell')}>Món đã đặt</th>
                                <th className={cx('cell')}>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {put.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className={cx('noData')}>
                                        Không có dữ liệu
                                    </td>
                                </tr>
                            ) : (
                                put.map((item, idx) => (
                                    <tr key={idx} className={cx('dataRow')}>
                                        <td className={cx('cell')}>{item.ID_chitietban}</td>
                                        <td className={cx('cell')}>
                                            {moment(item.ThoiGian).format('HH:mm DD-MM-YYYY')}
                                        </td>

                                        <td className={cx('cell')}>{Number(item.TongTien).toLocaleString()} VNĐ</td>
                                        <td>
                                            {' '}
                                            <div className={cx('cell', getStatus(item.trangthai))}>
                                                {item.trangthai === 1
                                                    ? ' đã đặt trước '
                                                    : item.trangthai === 2
                                                    ? 'đang phục vụ'
                                                    : item.trangthai === 3
                                                    ? 'đã thanh toán'
                                                    : ''}
                                            </div>
                                        </td>
                                        <td className={cx('cell')}>{item.MonAn.join(', ')}</td>
                                        <td className={cx('cell')}>
                                            <button
                                                className={cx('cancelButton')}
                                                onClick={() => huyDon(item)}
                                                disabled={item.trangthai !== 1}
                                            >
                                                Hủy
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </>
            ) : (
                <>
                    <h3 className={cx('subtitle')}>Đã Hủy</h3>
                    <table className={cx('table')}>
                        <thead>
                            <tr className={cx('headerRow')}>
                                <th className={cx('cell')}>Mã đơn</th>
                                <th className={cx('cell')}>Ngày đặt</th>

                                <th className={cx('cell')}>Tổng tiền</th>
                                <th className={cx('cell')}>Trạng thái</th>
                                <th className={cx('cell')}>Món đã đặt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {abort.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className={cx('noData')}>
                                        Không có dữ liệu
                                    </td>
                                </tr>
                            ) : (
                                abort.map((item) => (
                                    <tr key={item.id} className={cx('dataRow')}>
                                        <td className={cx('cell')}>{item.ID_chitietban}</td>
                                        <td className={cx('cell')}>{item.ThoiGian}</td>

                                        <td className={cx('cell')}>{Number(item.ThanhTien).toLocaleString()} VNĐ</td>
                                        <td>
                                            <div className={cx('cell', getStatus(item.trangthai))}>
                                                {item.trangthai === 4 ? 'đã hủy ' : ''}
                                            </div>
                                        </td>
                                        <td className={cx('cell')}>{item.MonAn}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default LichSuDatBan;
