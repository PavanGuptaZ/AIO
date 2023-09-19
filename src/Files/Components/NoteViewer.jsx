import React, { useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { AiFillCloseCircle, AiFillDelete } from 'react-icons/ai';
import { editorOpener, notesContext } from '../Hooks/useContextProvider';


export const NoteViewer = () => {
    const { notes, dispatchNotes } = useContext(notesContext);
    const { setEditorViewer } = useContext(editorOpener);
    let check = notes.onEditor.id !== 0;
    let newDate = new Date().toISOString();
    const [text, setText] = useState({
        "head": check ? notes.onEditor.head : "",
        "body": check ? notes.onEditor.body : "",
        "id": check ? notes.onEditor.id : "",
        "tag": check ? notes.onEditor.tag : "all",
        "time": check ? notes.onEditor.time : newDate
    });
    const [checkLength, setCheckLength] = useState({ head: false, body: false });
    const handleChangeHead = (e) => {
        setText(element => ({ ...element, "head": e.target.value }))
    }
    const handleChangeBody = (e) => {
        setText(element => ({ ...element, "body": e.target.value }))
    }
    const handleChangeTag = (e) => {
        setText(element => ({ ...element, "tag": e.target.value }))
    }
    const handleSubmit = () => {
        if (text.head.trim().length < 1 || text.head.trim().length > 50) {
            setCheckLength((pre) => ({ ...pre, head: true }));
            return;
        };
        if (text.body.trim().length < 1) {
            setCheckLength((pre) => ({ ...pre, body: true }));
            return;
        }
        if (check) {
            dispatchNotes({
                type: "UPDATE_NOTE",
                payload: {
                    "head": text.head.trim(),
                    "body": text.body.trim(),
                    "id": text.id,
                    "tag": text.tag,
                    "time": newDate
                }
            })
        } else {
            dispatchNotes({
                type: "ADDNOTE",
                payload: {
                    "id": uuid(),
                    "head": text.head.trim(),
                    "body": text.body.trim(),
                    "tag": text.tag,
                    "time": newDate
                }
            })
        }
        CloseNotes();
    }
    const DeleteNotes = () => {
        dispatchNotes({
            type: "DELETE_NOTE",
            payload: {
                "id": text.id
            }
        })
        CloseNotes();
    }
    const CloseNotes = () => {
        dispatchNotes({
            type: "REMOVE_ONEDITOR",
            payload: 0
        })
        setEditorViewer(noteViewer => ({ ...noteViewer, notes: false }))
    }


    return (
        <div style={{
            position: "fixed", top: "0", left: "0", width: "100%", height: "100%", minWidth: "360px",
            display: "flex", alignItems: "center", justifyContent: "center"
        }}>
            <div style={{ width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }}></div>
            <div style={{
                position: "absolute",
                // top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                background: "#fff", width: "90%", maxWidth: "600px", minHeight: "400px", padding: "1rem", borderRadius: "10px",
            }}>
                <AiFillCloseCircle onClick={CloseNotes} className='closeIcon' style={{ position: 'absolute', top: "10px", right: "10px" }} />
                {check && <AiFillDelete onClick={DeleteNotes} className='closeIcon' style={{ position: 'absolute', top: "10px", right: "30px" }} />}
                <div style={{ display: "flex", flexDirection: "column", margin: "10px 0" }}>

                    <label className='label01' htmlFor="notetitle">Note Title</label>
                    <input className='text01' id='notetitle'
                        type="text" value={text.head}
                        onChange={(e) => handleChangeHead(e)} />
                    <div style={{ textAlign: "end" }}>
                        {checkLength.head && <label htmlFor="notetitle" style={{ color: "orangered", textAlign: "center" }}>Maximum 50 characters only you have </label>}
                        <label htmlFor="notetitle" style={{ color: text.head.length < 50 && text.head.length > 1 ? "green" : "orangered", textAlign: "center" }}>{text.head.length}</label>
                    </div>
                    <label className='label01' htmlFor="notebody">Note Body</label>
                    <textarea className='text01' id='notebody'
                        type="text" value={text.body}
                        onChange={(e) => handleChangeBody(e)}
                        style={{ resize: "vertical", minHeight: "200px", maxHeight: "400px" }} />
                    {checkLength.body && <label htmlFor="notebody" style={{ color: "orangered", textAlign: "center" }}>minimum characters Required</label>}

                    <select value={text.tag} className='text01' onChange={handleChangeTag} style={{ width: "100px", margin: "10px auto", cursor: "pointer" }}>
                        {notes.categories.map((tags) => (<option key={tags} value={tags}>{tags}</option>))}
                    </select>
                    <button onClick={handleSubmit} style={{
                        background: "#8981D8", border: "none", width: "100px", margin: "10px auto", padding: "0.5rem", color: "#fff",
                        borderRadius: "5px", cursor: "pointer"
                    }}>{!check ? "Submit" : "Update"}</button>
                </div>
            </div>
        </div>
    )
}
