import React, { useContext } from 'react';
import { editorOpener, notesContext } from '../Hooks/useContextProvider';
import { useGetTime } from '../Hooks';
import { useNavigate } from 'react-router-dom';

export const NotesBlock = ({ element }) => {
    const { setEditorViewer } = useContext(editorOpener);
    const { dispatchNotes } = useContext(notesContext)
    let { head, body, id, tag, time } = element;
    let navigator = useNavigate()
    const handleClick = () => {
        setEditorViewer((pre) => ({ ...pre, notes: true }))
        dispatchNotes({
            type: "ADD_TO_ONEDITOR",
            payload: {
                "head": head,
                "body": body,
                "id": id,
                "tag": tag,
                "time": time
            }
        })
    }
    const handleRightClick = (e) => {
        e.preventDefault();
        navigator(`/FullViewNotes/${id}`);
        dispatchNotes({
            type: "ADD_TO_ONEDITOR",
            payload: {
                "head": head,
                "body": body,
                "id": id,
                "tag": tag,
                "time": time
            }
        })
    }
    let lastUpdateTime = useGetTime(new Date().getTime(), new Date(time).getTime())
    let message = lastUpdate(lastUpdateTime)
    return (
        <div className='NotesBlock' onClick={handleClick} onContextMenu={(e)=>handleRightClick(e)}>
            {tag !== "all" && <span style={{
                background: "#8981D8", textAlign: "end", position: "absolute", top: "10px", right: "10px",
                padding: "0.125rem 0.25rem", borderRadius: "5px", color: "#fff", fontSize: "0.75rem"
            }}>{tag}</span>}
            <div style={{ color: "gray" }}>{message}</div>
            <div style={{ fontWeight: "500", marginBottom: "0.75rem", fontSize: "1.25rem", margin: "10px 0" }}>{head}</div>
            <div style={{ textOverflow: "ellipsis", overflow: "hidden" }}>{body}</div>
            {/* <div>{time}</div> */}
        </div>
    )
}
function lastUpdate(value) {
    let { minutes, hours, days, months } = value;
    let returnValue;
    if (minutes < 1) {
        returnValue = "just Now"
    } else if (hours < 1) {
        returnValue = "less than a Hour"
    } else if (days < 1) {
        returnValue = `${hours} hours ago`
    } else if (months < 30) {
        returnValue = `${days} days ago`
    }
    return returnValue;
}