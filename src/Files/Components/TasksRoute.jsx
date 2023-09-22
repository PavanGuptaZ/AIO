import React, { useContext } from 'react';
import { TaskBlock } from '../Components';
import { searchContext, tasksContext } from '../Hooks/useContextProvider';
import { useOutletContext } from 'react-router-dom';


export const TasksRoute = ({ value }) => {
    let { tasks } = useContext(tasksContext);
    let { searchValue } = useContext(searchContext);
    let { sortFliter } = useOutletContext();

    return (
        <div style={{ margin: "20px 0", display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
            {tasks.list && tasks?.list.filter((ele) => ele.priority.toLowerCase().includes(sortFliter.toLocaleLowerCase())).filter((ele) => (value === "all" ? true : ele.tag === value)).filter((ele) => ele.body.toLowerCase().includes(searchValue.toLowerCase())).map((element) => (
                <TaskBlock key={element.id} element={element} />
            ))}
        </div>
    )
}
