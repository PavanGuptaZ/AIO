import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { editorOpener, searchContext, tasksContext } from '../Hooks/useContextProvider';
import { useKey } from '../Hooks/useKey';
import { IoIosAddCircle } from 'react-icons/io';
import { HiFlag } from 'react-icons/hi';

export const Tasks = ({ value }) => {
  let { tasks, dispatchTasks } = useContext(tasksContext);
  let { setSearchValue } = useContext(searchContext);
  const { setEditorViewer } = useContext(editorOpener);
  const navigator = useNavigate();
  const location = useLocation();
  const [sortkey, setSortKey] = useState({ urgent: false, high: false, normal: false, low: false })
  useEffect(() => {
    const locationCheck = location.pathname === "/tasks" || location.pathname === "/tasks/";
    locationCheck && navigator("/tasks/all");
  })
  useKey("Escape", () => {
    dispatchTasks({
      type: "REMOVE_ONEDITOR",
      payload: 0
    })
    setEditorViewer(pre => ({ ...pre, tasks: false, tag: false, tagtype: { for: null, value: null } }))
    setSearchValue("");
    navigator("/tasks/all");
    setSortKey((pre)=>{
      const updatedSortKey = { ...pre };
      for (const key in pre) {
          updatedSortKey[key] = false;
      }
      return updatedSortKey;

    })
  })
  const openEditor = () => {
    setEditorViewer(noteViewer => ({ ...noteViewer, tasks: true }))
  }
  const openTagEditor = (e) => {
    setEditorViewer(noteViewer => ({ ...noteViewer, tag: true, tagtype: { for: "tasks", value: null } }))
  }
  const tagEdit = (e, name) => {
    e.preventDefault();
    if (name !== "all") {
      setEditorViewer(noteViewer => ({ ...noteViewer, tag: true, tagtype: { for: "tasks", value: name } }))
    }
  }

  const handlePrioritySort = (e) => {
    let priorityValue = e.target.getAttribute("data-value")
    setSortKey((pre) => {
      const updatedSortKey = { ...pre };
      updatedSortKey[priorityValue] = !updatedSortKey[priorityValue];
      for (const key in pre) {
        if (key !== priorityValue) {
          updatedSortKey[key] = false;
        }
      }
      return updatedSortKey;
    })
  }
  let sortFliter = Object.keys(sortkey).filter(key => sortkey[key]).join('');
  return (
    <>
      <div style={{
        // border: "1px solid black",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          {tasks.categories.map((ele) => (
            <NavLink onContextMenu={(e) => tagEdit(e, ele)} key={ele} className='ButtonNav' to={`/tasks/${ele}`}>
              {ele}
            </NavLink>
          ))}
          <IoIosAddCircle onClick={openTagEditor} style={{
            fontSize: "1.5rem", color: "#fff", background: "#8981D8",
            borderRadius: "50%", cursor: "pointer", margin: "0 10px"
          }} />
        </div>
        <div style={{ display: "flex", gap: "5px", margin: "10px 0", flexWrap: "wrap" }}>
          <span onClick={(e) => handlePrioritySort(e)} className={`prioritySpanBox2 ${sortkey.urgent === true && "active"}`} data-value="urgent"><HiFlag color={tasks.priority.urgent} />urgent</span>
          <span onClick={(e) => handlePrioritySort(e)} className={`prioritySpanBox2 ${sortkey.high === true && "active"}`} data-value="high"><HiFlag color={tasks.priority.high} />high</span>
          <span onClick={(e) => handlePrioritySort(e)} className={`prioritySpanBox2 ${sortkey.normal === true && "active"}`} data-value="normal"><HiFlag color={tasks.priority.normal} />normal</span>
          <span onClick={(e) => handlePrioritySort(e)} className={`prioritySpanBox2 ${sortkey.low === true && "active"}`} data-value="low"><HiFlag color={tasks.priority.low} />low</span>
        </div>
        <div>
          <button onClick={openEditor} style={{
            cursor: "pointer", outline: "none", margin: "10px 0",
            color: "#685FBD", fontSize: "1rem", border: "none", padding: "2px 10px", backgroundColor: "transparent"
          }}>Add Tasks</button>
        </div>
      </div>
        <Outlet  context={{sortFliter}}/>
      {/* {value} */}
    </>
  )
}
