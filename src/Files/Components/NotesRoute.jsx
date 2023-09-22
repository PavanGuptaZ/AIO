import React, { useContext } from 'react';
import { notesContext, searchContext } from '../Hooks/useContextProvider';
import { NotesBlock } from '.';


export const NotesRoute = ({ value }) => {
  let { searchValue } = useContext(searchContext);
  let { notes } = useContext(notesContext);


  return (
    <div style={{ margin: "20px 0", display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
      {notes.list && notes?.list
        .filter((ele) => (value === "all" ? true : ele.tag === value))
        .filter((ele) => ele.body.toLowerCase().includes(searchValue.toLowerCase()))
        .map((element, idx) => (
          <NotesBlock key={idx} element={element} />
        ))}
    </div>
  )
}
