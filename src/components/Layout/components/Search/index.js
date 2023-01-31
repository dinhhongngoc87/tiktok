import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass, faL } from '@fortawesome/free-solid-svg-icons';
import { useReducer,useRef } from 'react';

import styles from './Search.module.scss';
import AccountItem from '../../../AccountItem';
import { Wrapper as PopperWrapper } from '../../../Popper';
import { SearchIcon } from '../../../Icons';

const cx = classNames.bind(styles);
//init
const initState = {
    currentSearch: '',
    searchedList: [],
};
//action
const SET_SEARCH = 'set_search';
const ADD_SEARCH = 'add_search';
const CLEAR_SEARCH = 'clear-search';
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
const clearSearch = () => {
    return {
        type: CLEAR_SEARCH,
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
        case CLEAR_SEARCH:
            return {
                ...state,
                currentSearch: '',
            };
        default:
            throw new Error('Invalid action');
    }

};
function Search() {
    const [state, dispatch] = useReducer(reducer, initState);
    const { currentSearch, searchedList } = state;
    const [showResult,setShowResult] = useState(true)
    const inputRef= useRef();
    useEffect(() => {});

    const handleClear = () => {
        inputRef.current.focus();
        dispatch(clearSearch());
    };
    const handleHideResult = () =>{
        setShowResult(false)
    }
    return (
        <HeadlessTippy
            interactive
            visible={currentSearch.length > 0 &&  showResult }
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <div className={cx('searched-list')}>
                            {searchedList.map((item, index) => {
                                return (
                                    <div key={index} className={cx('searched-child')}>
                                        <SearchIcon /> &nbsp;
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
            onClickOutside= {handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref = {inputRef}
                    value={currentSearch}
                    onChange={(e) => {
                        dispatch(setSearch(e.target.value));
                    }}
                    onFocus={()=>setShowResult(true)}
                    placeholder="Search accounts and videos"
                    spellCheck={false}
                />
                {!!currentSearch &&(
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )||<FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                

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
    );
}

export default Search;
