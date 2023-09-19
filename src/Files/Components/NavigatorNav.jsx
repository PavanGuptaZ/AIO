import React, { useState } from 'react';
import AIO_icon from '../Assets/AIO_icon.png';
import { MdViewCompact, MdOutlineSpeakerNotes } from 'react-icons/md';
import { FaTasks } from 'react-icons/fa';
import { BiSupport } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

export const NavigatorNav = () => {
  const [headToggle, setHeadToggle] = useState(true);
  // let rootWidth = getComputedStyle(document.getElementById("SideNavbar"));
  // console.log(rootWidth);
  const handleToggleMode = () => {
    if (headToggle) {
      setHeadToggle(false)
    } else {
      setHeadToggle(true)

    }
  }
  return (
    <div id='SideNavbar' className={`NavigatorNav ${headToggle ? "close" : ""}`}>
      <div className='NavLogo' onClick={handleToggleMode}>
        <img src={AIO_icon} alt="" width="30px" />
        <span className='closer iconTitle'>All In One</span>
        {!headToggle ? <AiFillCaretLeft color='#fff' /> : <AiFillCaretRight color='#fff' />}
      </div>
      <div className='NavlinksBox'>
        <NavLink to="/" className='NavLinkItem'>
          <MdViewCompact className='icon' /> <span className='closer'>OverView</span>
        </NavLink>
        <NavLink to='notes' className='NavLinkItem'>
          <MdOutlineSpeakerNotes className='icon' /> <span className='closer'>Notes</span>
        </NavLink>
        <NavLink to='tasks' className='NavLinkItem'>
          <FaTasks className='icon' /> <span className='closer'>Tasks</span>
        </NavLink>
        <NavLink to='support' className='NavLinkItem'>
          <BiSupport className='icon' /> <span className='closer'>Supports</span>
        </NavLink>
      </div>
    </div>
  )
}
