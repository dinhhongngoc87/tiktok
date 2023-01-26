import classNames from 'classnames/bind';
import styles from '../../components/Header/Header.module.scss';
// bind styles trả về một function cho cx
const cx = classNames.bind(styles)

function Header() {
    return <header className={cx('wrapper')}>
        <div className = {cx('inner')}>
            <div>Element 1</div>
            <div>Element 2</div>
        </div>
    </header>;
}
export default Header;
