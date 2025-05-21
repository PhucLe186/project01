import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCartShopping } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './menulist.module.scss';

const cx = classNames.bind(styles);

function Pagination({ newsList, onClick, selectedMon, Showitem, Mon }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [show, setShow] = useState(false);
    const newsPerPage = 20;

    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = newsList.slice(indexOfFirstNews, indexOfLastNews);

    const totalPages = Math.ceil(newsList.length / newsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    const handleadd = (news) => {
        if (onClick) {
            onClick(news);
        }
    };
    return (
        <div className={cx('parent')}>
            <div className={cx('inner')}>
                <ul className={cx('list')}>
                    {currentNews.map((news, index) => (
                        <li onClick={() => setShow(true)} className={cx('item')} key={index}>
                            <img src={news.HinhMonAn} alt={news.courseName} className={cx('img')} />

                            <div className={cx('container')}>
                                <div className={cx('name')}>{news.TenMonAn}</div>
                                <div className={cx('price')}>{news.ThanhTien.toLocaleString()} VND</div>
                            </div>

                            <div className={cx('status')}>
                                <button
                                    className={cx('show')}
                                    onClick={() => {
                                        setShow(true);
                                        Showitem(news);
                                    }}
                                >
                                    chi tiết
                                </button>
                                <button
                                    className={cx('show')}
                                    disabled={news.TrangThai === 'hết'}
                                    onClick={() => {
                                        handleadd(news);
                                    }}
                                >
                                    {news.TrangThai === 'hết' ? 'hết' : <FontAwesomeIcon icon={faCartShopping} />}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {show === true ? (
                Mon && (
                    <div className={cx('overlay')} onClick={() => setShow(false)}>
                        <div className={cx('modal')} onClick={(e) => e.stopPropagation()}>
                            <button className={cx('close')} onClick={() => setShow(false)}>
                                &times;
                            </button>

                            <h2 className={cx('title')}>{Mon.TenMonAn}</h2>

                            <div className={cx('body')}>
                                <div className={cx('left')}>
                                    <img src={Mon.HinhMonAn} alt={Mon.TenMonAn} />
                                </div>

                                <div className={cx('right')}>
                                    <p>
                                        <strong>Giá:</strong> {Mon.ThanhTien?.toLocaleString()} VND
                                    </p>
                                    <p>
                                        <strong>số lượng:</strong> {Mon.SoLuong}
                                    </p>
                                    <p>
                                        <strong>Mô tả:</strong> {Mon.chitietmon?.MoTa || 'Chưa có mô tả'}
                                    </p>
                                    <p>
                                        <strong>Nguyên liệu:</strong> {Mon.chitietmon?.NguyenLieuChinh.join(', ')}
                                    </p>
                                    <p>
                                        <strong>Cách Chế Biến:</strong> {Mon.chitietmon?.CachCheBien}
                                    </p>
                                    <p className={cx('status')}>
                                        <strong>Trạng thái:</strong>
                                        <span className={cx(Mon.TrangThai === 'hết' ? 'false' : '')}>
                                            {Mon.TrangThai}
                                        </span>
                                    </p>
                                    <button
                                        className={cx('add-cart')}
                                        disabled={Mon.TrangThai === 'hết'}
                                        onClick={() => {
                                            handleadd(Mon);
                                        }}
                                    >
                                        {Mon.TrangThai === 'hết' ? 'Hết hàng' : 'Thêm vào giỏ hàng'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            ) : (
                <div>no hope</div>
            )}

            {/* Nút phân trang */}
            {totalPages === 1 ? (
                <></>
            ) : (
                <div className={cx('btn')}>
                    <button
                        className={cx('btn-left')}
                        onClick={() =>
                            currentPage === 1 ? setCurrentPage(totalPages) : setCurrentPage(currentPage - 1)
                        }
                    >
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>

                    {pageNumbers.map((number) => (
                        <button className={cx('number')} key={number} onClick={() => setCurrentPage(number)}>
                            {number}
                        </button>
                    ))}

                    <button
                        className={cx('btn-right')}
                        onClick={() =>
                            currentPage === totalPages ? setCurrentPage(1) : setCurrentPage(currentPage + 1)
                        }
                    >
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </div>
            )}
        </div>
    );
}

export default Pagination;
