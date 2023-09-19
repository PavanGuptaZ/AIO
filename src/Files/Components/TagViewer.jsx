import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillCloseCircle, AiFillDelete } from 'react-icons/ai';
import { editorOpener, notesContext, tasksContext } from '../Hooks/useContextProvider';

export const TagViewer = () => {
    const { editorViewer, setEditorViewer } = useContext(editorOpener);
    const { notes, dispatchNotes } = useContext(notesContext);
    const { tasks, dispatchTasks } = useContext(tasksContext);
    const navigator = useNavigate();
    let check = editorViewer.tagtype.value == null;
    const [tagName, setTagName] = useState({
        for: editorViewer.tagtype.for,
        value: check ? "" : editorViewer.tagtype.value
    });
    let check2 = tagName.value.trim().length > 10 || tagName.value.trim().length < 1;
    let check3 = editorViewer.tagtype.for === "notes" ? notes.categories.length >= 5 : tasks.categories.length >= 5;
    let check4 = editorViewer.tagtype.for === "notes";
    let check5 = check4 ? notes.categories.some((ele) => ele.toLowerCase() === tagName.value.toLowerCase()) :
        tasks.categories.some((ele) => ele.toLowerCase() === tagName.value.toLowerCase());
    // console.log(editorViewer.tagtype.for, editorViewer.tagtype.value);
    // console.log(tagName.for, tagName.value);
    const handleSubmit = () => {
        if (check) {
            if (check4) {
                dispatchNotes({ type: "ADD_TAG", payload: tagName.value })
            } else {
                dispatchTasks({ type: "ADD_TAG", payload: tagName.value })
            }
        } else {
            if (check4) {
                dispatchNotes({ type: "UPDATE_TAG", payload: { old: editorViewer.tagtype.value, new: tagName.value } })
            } else {
                dispatchTasks({ type: "UPDATE_TAG", payload: { old: editorViewer.tagtype.value, new: tagName.value } })
            }
        }
        navigator(`${editorViewer.tagtype.for}`)
        CloseTag();
    }

    const DeleteTag = () => {
        if (check4) {
            dispatchNotes({ type: "DELETE_TAG", payload: editorViewer.tagtype.value })
        } else {
            dispatchTasks({ type: "DELETE_TAG", payload: editorViewer.tagtype.value })
        }
        navigator(`${editorViewer.tagtype.for}`)
        console.log(editorViewer.tagtype.value);
        CloseTag();
    }
    const CloseTag = () => {
        setEditorViewer((pre) => ({ ...pre, tag: false, tagtype: { for: null, value: null } }))
    }
    // console.log(check, check2, check3,check4,check5);
    return (
        <div style={{
            position: "fixed", top: "0", left: "0", width: "100%", height: "100%", minWidth: "360px",
            display: "flex", alignItems: "center", justifyContent: "center"
        }}>
            <div style={{ width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }}></div>
            <div style={{
                position: "absolute",
                background: "#fff", width: "90%", maxWidth: "400px", padding: "1rem", borderRadius: "10px",
            }}>
                <AiFillCloseCircle onClick={CloseTag} className='closeIcon' style={{ position: 'absolute', top: "10px", right: "10px" }} />
                {<AiFillDelete onClick={DeleteTag} className='closeIcon' style={{ position: 'absolute', top: "10px", right: "30px" }} />}
                <div style={{ display: "flex", flexDirection: "column", margin: "10px 0" }}>

                    <label className='label01' htmlFor="notebody">Tag Name</label>
                    <textarea className='text01' id='notebody'
                        type="text" value={tagName.value} onChange={(e) => setTagName((pre) => ({ ...pre, value: (e.target.value.trim()) }))}
                        style={{ resize: "none", Height: "100px" }} />
                    {check2 && <label style={{ color: "orangered", textAlign: "center" }}>Max characters 10 Reached and minimum 1 characters</label>}
                    {check5 && <label style={{ color: "orangered", textAlign: "center" }}>Same Name is not allowed</label>}
                    {check && check3 && <label style={{ color: "orangered", textAlign: "center" }}>Max categories 5 Reached</label>}
                    <button onClick={handleSubmit} disabled={check ? (check5 || check2 || check3) : (check5 || check2)} style={{
                        background: "#8981D8", border: "none", width: "100px", margin: "10px auto", padding: "0.5rem", color: "#fff",
                        borderRadius: "5px", cursor: "pointer"
                    }}>{check ? "Submit" : "Update"}</button>
                </div>
            </div>
        </div>
    )
}
