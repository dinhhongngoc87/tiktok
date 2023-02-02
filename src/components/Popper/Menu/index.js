import { Children, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '../../Popper';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import Header from './Header';

const cx = classNames.bind(styles);
const defaultFn = ()=>{}
function Menu({ children, items = [] ,hideOnClick = "false",onChange = defaultFn}) {
    const [history,setHistory] = useState([{data:items}])// đồng bộ cấu trúc của phần tử cha và con
    const current = history[history.length-1]
    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children //convert boolean (dùng để ktra xem có prop children hay k)
            return <MenuItem key={index} data={item} onClick = {()=>{
                if(isParent){
                    setHistory((prev)=>[...prev,item.children])
                }else{
                    onChange(item)
                }
            }} />
        });
    };
    return (
        <Tippy
            interactive
            delay={[0,500]}
            placement="bottom-end"
            hideOnClick = {hideOnClick}
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className = {cx('menu-popper')}>
                        {history.length>1&& <Header title={"Language"} onBack={()=>{
                            setHistory(prev=>prev.slice(0,history.length-1))
                        }} />}
                        {renderItems()} 
                    </PopperWrapper>
                </div>
            )}
            onHide = {()=>setHistory((prev)=>prev.slice(0,1))}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
