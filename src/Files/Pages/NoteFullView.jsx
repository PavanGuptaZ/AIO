import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { notesContext } from '../Hooks/useContextProvider';
import { v4 as uuid } from 'uuid';
import { MdOutlineSpeakerNotes } from 'react-icons/md';


export const NoteFullView = () => {
    const { notes, dispatchNotes } = useContext(notesContext);
    const navigator = useNavigate();

    let { idNote } = useParams()
    let note = notes.list.find((ele) => ele.id === idNote);
    let check = note !== undefined;
    // console.log(idNote,note);

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
    const handlePageChange = (e) => {
        navigator("/notes/all");
        CloseNotes();
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
        navigator("/notes/all")
    }
    const CloseNotes = () => {
        dispatchNotes({
            type: "REMOVE_ONEDITOR",
            payload: 0
        })
    }
    return (
        <div className='NotesView'>
            <div style={{ display: "flex", flexDirection: "column", margin: "10px 0" }}>
                <div style={{ display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
                    <button onClick={handleSubmit} className='btn03'>{!check ? "Submit" : "Update"}</button>
                    <select value={text.tag} className='text03' onChange={handleChangeTag} style={{ cursor: "pointer", height: "40px" }}>
                        {notes.categories.map((tags) => (<option key={tags} value={tags}>{tags}</option>))}
                    </select>
                    <button onClick={DeleteNotes} className='btn03'>Delete Note</button>
                    <button onClick={handlePageChange} className='btn03'
                        style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><MdOutlineSpeakerNotes /> To Note</button>
                </div>
                <label className='label01' htmlFor="notetitle" >Note Title</label>
                <input className='text03' id='notetitle'
                    type="text" value={text.head}
                    onChange={(e) => handleChangeHead(e)} />
                <div style={{ textAlign: "end" }}>
                    {checkLength.head && <label htmlFor="notetitle" style={{ color: "orangered", textAlign: "center" }}>Maximum 50 characters only you have </label>}
                    <label htmlFor="notetitle" style={{ color: text.head.length < 50 && text.head.length > 1 ? "green" : "orangered", textAlign: "center" }}>{text.head.length}</label>
                </div>
                <label className='label01' htmlFor="notebody">Note Body</label>
                <textarea className='text03' id='notebody'
                    type="text" value={text.body} 
                    onChange={(e) => handleChangeBody(e)}
                    style={{ resize: "vertical", minHeight: "200px" }} />
                {checkLength.body && <label htmlFor="notebody" style={{ color: "orangered", textAlign: "center" }}>minimum characters Required</label>}
            </div>
        </div>
    )
}