import Wrapper from '~/component/wrapper';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Đảm bảo import CSS

import classNames from 'classnames/bind';
import styles from './props.module.scss';
import List from './List';
import { useState } from 'react';

const cx = classNames.bind(styles);
function Props({ children, menu, onClick }) {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <Tippy
                key={visible}
                interactive
                placement="bottom"
                visible={visible}
                offset={[10, 9]}
                onClickOutside={() => {
                    setVisible(false);
                }}
                delay={[0, 200]}
                render={(attrs) => (
                    <div className={cx('menu')} tabIndex="-1" {...attrs}>
                        <Wrapper>
                            {menu.map((item, idx) => {
                                return <List key={idx} data={item} onClick={onClick} />;
                            })}
                        </Wrapper>
                    </div>
                )}
            >
                <div onClick={() => setVisible(!visible)}>{children}</div>
            </Tippy>
        </div>
    );
}

export default Props;
