import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '../../components/Header/Header.module.scss';
import images from '../../../../asset/images';
import AccountItem from '../AccountItem';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '../../../Popper';
// bind styles trả về một function cho cx
const cx = classNames.bind(styles);
function Header() {
    const [searchResult, setSearchResult] = useState([]);
    useEffect(()=>{
        setTimeout(() => {
            setSearchResult([])
        },0);
    },[])
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <img src={images.logo} alt="Tiktok" />
                <Tippy
                interactive
                    visible = {searchResult.length>0 }
                    render = {attrs =>(
                        <div className={cx('search-result')} tabIndex ="-1" {...attrs}>
                                <PopperWrapper>
                                    <h4 className={cx('search-title')}>
                                        Accounts
                                    </h4>
                                    <AccountItem/>
                                    <AccountItem/>
                                    <AccountItem/>
                                </PopperWrapper>
                        </div>
                    )}
                
                >
                    <div className={cx('search')}>
                        <input value={searchResult} onChange = {(e)=>{setSearchResult(e.target.value)}} placeholder="Search accounts and videos" spellCheck={false} />
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
    
                        <Tippy>
                            <button className={cx('search-btn')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </Tippy>
                    </div>
                </Tippy >
                <div className={cx('actions')}></div>
            </div>
        </header>
    );
}
export default Header;
