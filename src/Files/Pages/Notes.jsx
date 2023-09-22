import React, { useContext } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { editorOpener, notesContext, searchContext } from '../Hooks/useContextProvider';
import { useKey } from '../Hooks/useKey';
import { IoIosAddCircle } from 'react-icons/io';


export const Notes = ({ value }) => {
  let { notes, dispatchNotes } = useContext(notesContext);
  const { setEditorViewer } = useContext(editorOpener);
  const { setSearchValue } = useContext(searchContext);
  const navigator = useNavigate();
  const location = useLocation();
  console.log(location);
  // useEffect(() => {
  //   const locationCheck = location.pathname === "/notes" || location.pathname === "/notes/";
  //   locationCheck && navigator("/notes/all");
  // })

  useKey("Escape", () => {
    dispatchNotes({
      type: "REMOVE_ONEDITOR",
      payload: 0
    })
    setEditorViewer(pre => ({ ...pre, notes: false, tag: false, tagtype: { for: null, value: null } }))
    setSearchValue("");
    navigator("/notes/all");
  })
  const openEditor = () => {
    setEditorViewer(noteViewer => ({ ...noteViewer, notes: true }))
  }
  const openTagEditor = () => {
    setEditorViewer(noteViewer => ({ ...noteViewer, tag: true, tagtype: { for: "notes", value: null } }))
  }
  const tagEdit = (e, name) => {
    e.preventDefault();
    if (name !== "all") {
      setEditorViewer(noteViewer => ({ ...noteViewer, tag: true, tagtype: { for: "notes", value: name } }))
    }
  }
  return (
    <>
      <div style={{
        // border: "1px solid black",
        display: "flex", alignItems: "center", justifyContent: "space-between",flexWrap:"wrap"
      }}>
        <div style={{ display: "flex", alignItems: "center",gap:"10px" ,flexWrap:"wrap"}}>

          {notes.categories.map((ele) => (
            <NavLink onContextMenu={(e) => tagEdit(e, ele)} className='ButtonNav' key={ele} to={`/notes/${ele}`}>
              {ele}
            </NavLink>))}


          <IoIosAddCircle onClick={openTagEditor} style={{
            fontSize: "1.5rem", color: "#fff", background: "#8981D8",
            borderRadius: "50%", cursor: "pointer", margin: "0 10px"
          }} />
        </div>
        <div>
          <button onClick={openEditor} style={{
            cursor: "pointer", outline: "none",margin:"10px 0",
            color: "#685FBD", fontSize: "1rem", border: "none", padding: "10px", backgroundColor: "transparent"
          }}>Add List</button>
        </div>
      </div>

        <Outlet />
        {/* {value} */}
    </>
  )
}

