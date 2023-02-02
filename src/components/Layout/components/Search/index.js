import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass, faL } from '@fortawesome/free-solid-svg-icons';
import { useReducer, useRef } from 'react';

import * as searchServices from '../../../../apiServices/searchServices'
import styles from './Search.module.scss';
import AccountItem from '../../../AccountItem';
import { Wrapper as PopperWrapper } from '../../../Popper';
import { SearchIcon } from '../../../Icons';
import { useDebounce } from '../../../../hooks';

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
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);
    const { currentSearch, searchedList } = state;
    const debounced = useDebounce(currentSearch, 500); //when user stop typing , debounced will be updated after 500ms
    const inputRef = useRef();
    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }
        const fetchApi = async () =>{
            setLoading(true);
            const result = await searchServices.search(debounced)
            console.log(result)
            setSearchResult(result)
            setLoading(false);
        }
        fetchApi()
        
    }, [debounced]);

    const handleClear = () => {
        dispatch(clearSearch());
        setSearchResult([]);
        inputRef.current.focus();
    };
    const handleHideResult = () => {
        setShowResult(false);
    };
    const handleChange =(e) =>{
        const searchValue = e.target.value
        if(!searchValue.startsWith(' ') && searchValue.trim()){
            dispatch(setSearch(searchValue))
        }
    }
    return (
        <HeadlessTippy
            interactive
            visible={showResult && searchResult.length > 0}
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
                        {searchResult.map((result) => (
                            <AccountItem key={result.id} data={result} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={currentSearch}
                    onChange={handleChange}
                    onFocus={() => setShowResult(true)}
                    placeholder="Search accounts and videos"
                    spellCheck={false}
                />
                {!!currentSearch && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                <button
                    onClick={() => {
                        dispatch(addSearch(currentSearch));
                    }}
                    className={cx('search-btn')}
                    onMouseDown  = { e =>e.preventDefault()}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
