import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AcountItem.module.scss';
import Image from '../Image';

const cx = classNames.bind(styles);
function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <Image className={cx('avatar')} src="https://scontent.fhan4-2.fna.fbcdn.net/v/t39.30808-6/308020237_3411390675808945_8221188579736723413_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=joNil5rli1MAX_lA3N3&tn=TtFj4zgewfzjlXQN&_nc_ht=scontent.fhan4-2.fna&oh=00_AfAl6Vm04-Wb9SrCjmXm9F8jUzEKX-UE1olRmGIwjS-VIw&oe=63D92FBB" alt="anh" />
            <div className={cx('infor')}>
                <p className={cx('name')}>
                    <span>Dinh Hong Ngoc &nbsp;</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle}/>
                </p>
                <span className={cx('username')}>Dinh Hong Ngoc</span>
            </div>
        </div>
    );
}

export default AccountItem;
