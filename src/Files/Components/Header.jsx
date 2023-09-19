import React, { useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { searchContext } from '../Hooks/useContextProvider';

export const Header = () => {
  const { searchValue, setSearchValue } = useContext(searchContext)
  return (
    <header className='Header'>
      <div style={{display: "flex", alignItems: "center",width:"calc(100% - 150px"}}>
        <label htmlFor="searchBox" style={{ cursor: "pointer" }}> <FaSearch /></label>
        <input type="text" id='searchBox' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='Search Box' />
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: "1rem",width:"150px",
        padding: "0 1.5rem",cursor:"pointer"
      }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "url(https://i.pravatar.cc/200) center/cover"}}></div>
        <div style={{color:"#6A61C0"}}>User</div>
      </div>
    </header>
  )
}
