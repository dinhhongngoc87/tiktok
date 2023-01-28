import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useReducer } from 'react';
import styles from '../../components/Header/Header.module.scss';
import images from '../../../../asset/images';
import AccountItem from '../AccountItem';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '../../../Popper';
import { Action } from '@remix-run/router';

// bind styles trả về một function cho cx
const cx = classNames.bind(styles);
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
    switch(action.type){
        case SET_SEARCH:
            return{
                ...state,
                currentSearch:action.payload
            }
        case ADD_SEARCH:
            return{
                ...state,
                currentSearch:'',
                searchedList:[...state.searchedList,action.payload]
            }
        default:
            throw new Error('Invalid action')

    }

    return state
};
function Header() {
    const [state, dispatch] = useReducer(reducer, initState);
    const { currentSearch, searchedList } = state;
    console.log('check input: ',currentSearch)
    console.log('check array: ',searchedList)
    useEffect(() => {});

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <img src={images.logo} alt="Tiktok" />
                <Tippy
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

                        <Tippy>
                            <button onClick={()=>{dispatch(addSearch(currentSearch))}} className={cx('search-btn')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </Tippy>
                    </div>
                </Tippy>
                <div className={cx('actions')}></div>
            </div>
        </header>
    );
}
export default Header;
