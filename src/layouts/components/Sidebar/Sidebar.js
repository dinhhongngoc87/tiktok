import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import config from '../../../config';
import Menu,{MenuItem} from './Menu';

const cx = classNames.bind(styles)

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title = "For you" to = {config.routes.home} icon = {null}/>
                <MenuItem title = "Following" to = {config.routes.following} icon = {null}/>
                <MenuItem title = "For you" to = {config.routes.live} icon = {null}/>
            </Menu>
        </aside>
    )
}

export default Sidebar;
