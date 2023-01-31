import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faSpinner,
    faMagnifyingGlass,
    faSignIn,
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faUpload,
    faMessage,
    faCloudUpload,
    faGear,
    faCoins,
    faUser,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import { useReducer } from 'react';
import { Action } from '@remix-run/router';

import styles from '../../components/Header/Header.module.scss';
import images from '../../../../asset/images';
import Image from '../../../Image';
import AccountItem from '../../../AccountItem';
import { Wrapper as PopperWrapper } from '../../../Popper';
import Button from '../../../Button';
import Menu from '../../../Popper/Menu';
import { faKeyboard } from '@fortawesome/free-regular-svg-icons';
import { UploadIcon } from '../../../Icons';

// bind styles trả về một function cho cx
const cx = classNames.bind(styles);

const MENU_ITEMs = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tiếng việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and Help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];
//init
const initState = {
    currentSearch: '',
    searchedList: [],
};
//action
const SET_SEARCH = 'set_search';
const ADD_SEARCH = 'add_search';
const DELETE_SEARCH = 'delete_search';

const setSearch = (payload) => {
    return {
        type: SET_SEARCH,
        payload,
    };
};
const addSearch = (payload) => {
    return {
        type: ADD_SEARCH,
        payload,
    };
};
//reducer
const reducer = (state, action) => {
    switch (action.type) {
        case SET_SEARCH:
            return {
                ...state,
                currentSearch: action.payload,
            };
        case ADD_SEARCH:
            return {
                ...state,
                currentSearch: '',
                searchedList: [...state.searchedList, action.payload],
            };
        default:
            throw new Error('Invalid action');
    }

    return state;
};

function Header() {
    const [state, dispatch] = useReducer(reducer, initState);
    const { currentSearch, searchedList } = state;
    const currentUser = true;

    useEffect(() => {});
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View propfile',
            to: '/@ngoc',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMs,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Logout',
            to: '/logout',
            separate: true
        },
    ];
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <img src={images.logo} alt="Tiktok" />
                <HeadlessTippy
                    interactive
                    visible={currentSearch.length > 0}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <div className={cx('searched-list')}>
                                    {searchedList.map((item, index) => {
                                        return (
                                            <div key={index} className={cx('searched-child')}>
                                                <FontAwesomeIcon icon={faMagnifyingGlass} /> &nbsp;
                                                {item}
                                            </div>
                                        );
                                    })}
                                </div>
                                <h4 className={cx('search-title')}>Accounts</h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input
                            value={currentSearch}
                            onChange={(e) => {
                                dispatch(setSearch(e.target.value));
                            }}
                            placeholder="Search accounts and videos"
                            spellCheck={false}
                        />
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

                        <button
                            onClick={() => {
                                dispatch(addSearch(currentSearch));
                            }}
                            className={cx('search-btn')}
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </HeadlessTippy>
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy delay={[0, 200]} content="Upload video" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <UploadIcon/>
                                </button>
                            </Tippy>
                            <button className={cx('action-btn')}>
                                <FontAwesomeIcon icon={faMessage} />
                            </button>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button primary>Login</Button>
                        </>
                    )}
                    <Menu items={currentUser ? userMenu : MENU_ITEMs}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/89fd0c44132bbba327884036922fd33d~c5_100x100.jpeg?x-expires=1675324800&x-signature=4cWcv34lUsaP7M8xMk48j4sDib8%3D"
                                alt="Nguyen Van A"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}
export default Header;
