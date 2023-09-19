import React, { useContext } from 'react'
import { editorOpener, tasksContext } from '../Hooks/useContextProvider';
import { HiFlag } from 'react-icons/hi';

export const TaskBlock = ({ element }) => {
    let { body, completed, id, tag, priority } = element;
    const { setEditorViewer } = useContext(editorOpener)
    const { tasks, dispatchTasks } = useContext(tasksContext)

    const handleClick = () => {
        setEditorViewer((pre) => ({ ...pre, tasks: true }));
        dispatchTasks({
            type: "ADD_TO_ONEDITOR",
            payload: {
                "body": body,
                "completed": completed,
                "id": id,
                "tag": tag,
                "priority": priority
            }
        })
    }
    // console.log(tag);
    return (
        <div className='TasksBlock' onClick={handleClick}>
            {tag !== "all" && <span style={{
                background: "#8981D8", textAlign: "end", position: "absolute", top: "10px", right: "10px",
                padding: "0.125rem 0.25rem", borderRadius: "5px", color: "#fff", fontSize: "0.75rem"
            }}>{tag}</span>}
            <div style={{
                textDecoration: `${completed ? "line-through" : "none"}`,
                whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", margin: "15px 0"
            }}>{body}</div>
            <HiFlag color={tasks.priority[priority]} style={{textAlign:"end"}}/>
        </div>
    )
}
