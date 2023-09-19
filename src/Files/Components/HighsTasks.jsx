import React, { useContext } from 'react';
import { searchContext, tasksContext } from '../Hooks/useContextProvider';
import { TaskBlock } from './TaskBlock';

export const HighsTasks = () => {
    let { tasks } = useContext(tasksContext);
    let { searchValue } = useContext(searchContext);
    let list = tasks.list && tasks?.list.filter((ele) => ele.priority.toLowerCase().includes("urgent".toLocaleLowerCase()))
        .filter((ele) => ele.body.toLowerCase().includes(searchValue.toLowerCase()))
        .filter((ele) => !ele.completed)
    return (
        <div style={{ width: "100%" }}>
            <div className='OverViewH2'>high priority</div>
            <div className='HighTasks'
                style={{
                    padding: "10px", display: "flex", gap: "20px", background: "rgba(0,0,0,0.05)", overflowX: "scroll",
                    borderRadius: "0 0 10px 10px", height: "130px"
                }}>
                {list.length < 1 ?
                    <div style={{ margin: "auto" }}>Nothing  to Display</div> :
                    list.map((element) => (
                        <TaskBlock key={element.id} element={element} />
                    ))}
            </div>
        </div>
    )
}
