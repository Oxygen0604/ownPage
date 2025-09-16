import React from'react';
import { Input } from 'antd';
import './Navbar.scss';

const Navbar : React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className='navbar'>
      <div className='logo'>
        Unicorn
      </div>

      <div className='function'>
        <div className='homePage' onClick={scrollToTop}>
          主页
        </div>

        <div className='menu'>
          菜单
        </div>

      </div>

      <div className='search'>
        <Input placeholder='搜索'/>
      </div>
    
    </div>
  );
}

export default Navbar;