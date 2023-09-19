import React, { useContext, useState } from 'react';
import { HiFlag } from 'react-icons/hi'
import { editorOpener, tasksContext } from '../Hooks/useContextProvider';
import { v4 as uuid } from 'uuid';
import { AiFillCloseCircle, AiFillDelete } from 'react-icons/ai';

export const TaskViewer = () => {
    const { tasks, dispatchTasks } = useContext(tasksContext)
    const { setEditorViewer } = useContext(editorOpener);
    let check = tasks.onEditor.id !== 0;
    const [text, setText] = useState({
        "completed": check ? tasks.onEditor.completed : false,
        "body": check ? tasks.onEditor.body : "",
        "id": check ? tasks.onEditor.id : "",
        "tag": check ? tasks.onEditor.tag : "all",
        "priority": check ? tasks.onEditor.priority : "low",
    });
    const [checkLength, setCheckLength] = useState({ body: false });
    const [priorityFlag, setPriorityFlag] = useState(false);

    // console.log(text.completed);

    const handleChangeBody = (e) => {
        setText(element => ({ ...element, "body": e.target.value }))
    }
    const handleChangeTag = (e) => {
        setText(element => ({ ...element, "tag": e.target.value }))
    }
    const handlePriority = (e) => {
        console.log(e.target.getAttribute("data-value"));
        let priorityValue = e.target.getAttribute("data-value")
        setText(element => ({ ...element, "priority": priorityValue }))
        setPriorityFlag(false)
    }
    const handleChangeComplete = ()=>{
        setText(element => ({ ...element, "completed": !Boolean(element.completed)}))

    }
    const handleSubmit = () => {
        if (text.body.trim().length < 1) {
            setCheckLength((pre) => ({ ...pre, body: true }));
            return;
        }
        if (check) {
            dispatchTasks({
                type: "UPDATE_TASK",
                payload: {
                    "completed": text.completed,
                    "body": text.body.trim(),
                    "id": text.id,
                    "tag": text.tag,
                    "priority": text.priority
                }
            })
        } else {
            dispatchTasks({
                type: "ADDTASK",
                payload: {
                    "id": uuid(),
                    "completed": text.completed,
                    "body": text.body.trim(),
                    "tag": text.tag,
                    "priority": text.priority
                }
            })
        }
        CloseNotes();
    }
    const DeleteNotes = () => {
        dispatchTasks({
            type: "DELETE_TASK",
            payload: {
                "id": text.id
            }
        })
        CloseNotes();
    }
    const CloseNotes = () => {
        dispatchTasks({
            type: "REMOVE_ONEDITOR",
            payload: 0
        })
        setEditorViewer(noteViewer => ({ ...noteViewer, tasks: false }))
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
                background: "#fff", width: "90%", maxWidth: "600px", padding: "1rem", borderRadius: "10px",
            }}>
                <AiFillCloseCircle onClick={CloseNotes} className='closeIcon' style={{ position: 'absolute', top: "10px", right: "10px" }} />
                {check && <AiFillDelete onClick={DeleteNotes} className='closeIcon' style={{ position: 'absolute', top: "10px", right: "30px" }} />}
                <div style={{ display: "flex", flexDirection: "column", margin: "20px 0" }}>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginRight: "30px" }}>
                        <label className='label01' htmlFor="notebody">Task Details</label>
                        <div style={{ position: "relative" }}>
                            <HiFlag onMouseEnter={() => setPriorityFlag(true)} color={tasks.priority[text.priority]} style={{ fontSize: "1.5rem" }} />
                            {priorityFlag && <div onMouseLeave={() => setPriorityFlag(false)}
                                style={{ position: "absolute", top: "0rem", left: "50%", transform: "translateX(-50%)", width: "100px" }}>
                                <div style={{ background: "#fff", display: "flex", flexDirection: "column", gap: "5px", border: "1px solid gray", marginTop: "1.75rem" }}>
                                    <span onClick={(e) => handlePriority(e)} className='prioritySpanBox' data-value="urgent"><HiFlag color={tasks.priority.urgent} />urgent</span>
                                    <span onClick={(e) => handlePriority(e)} className='prioritySpanBox' data-value="high"><HiFlag color={tasks.priority.high} />high</span>
                                    <span onClick={(e) => handlePriority(e)} className='prioritySpanBox' data-value="normal"><HiFlag color={tasks.priority.normal} />normal</span>
                                    <span onClick={(e) => handlePriority(e)} className='prioritySpanBox' data-value="low"><HiFlag color={tasks.priority.low} />low</span>
                                </div>
                            </div>}
                        </div>
                    </div>
                    <textarea className='text01' id='notebody'
                        type="text" value={text.body}
                        onChange={(e) => handleChangeBody(e)}
                        style={{ resize: "vertical", minHeight: "200px", maxHeight: "400px" }} />
                    {checkLength.body && <label htmlFor="notebody" style={{ color: "orangered", textAlign: "center" }}>minimum characters Required</label>}

                    <div style={{margin: "10px auto",}}>
                        <select value={text.tag} className='text01' onChange={handleChangeTag} style={{ width: "100px", cursor: "pointer" }}>
                            {tasks.categories.map((tags) => (<option key={tags} value={tags}>{tags}</option>))}
                        </select>
                    </div>
                    <div style={{margin: "10px auto",display:"flex",alignItems:"centers",gap:"10px"}}>
                        <label htmlFor="forCompletedToggle">Completed</label>
                        <input id='forCompletedToggle' type='checkbox' checked={text.completed} onChange={handleChangeComplete} style={{width:"20px",height:"20px"}}></input>
                    </div>
                    <button onClick={handleSubmit} style={{
                        background: "#8981D8", border: "none", width: "100px", margin: "10px auto", padding: "0.5rem", color: "#fff",
                        borderRadius: "5px", cursor: "pointer"
                    }}>{!check ? "Submit" : "Update"}</button>
                </div>
            </div>
        </div>
    )
}
