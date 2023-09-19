import React, { useEffect, useReducer, useState } from 'react';
import { notesFunction, tasksFunction } from './useReduser';
import { initial_notes, initial_tasks, initial_editor } from '../Assets/InitialValues.js'
import { useVerifyData } from './useVerifyData';
export const notesContext = React.createContext();
export const tasksContext = React.createContext();
export const editorOpener = React.createContext();
export const searchContext = React.createContext();

export const ContextProvider = ({ children }) => {
  const [editorViewer, setEditorViewer] = useState(initial_editor);
  const [notes, dispatchNotes] = useReducer(notesFunction, useVerifyData("notes") || initial_notes);
  const [tasks, dispatchTasks] = useReducer(tasksFunction, useVerifyData("tasks") || initial_tasks);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])
  return (
    <searchContext.Provider value={{ searchValue, setSearchValue }}>
      <editorOpener.Provider value={{ editorViewer, setEditorViewer }}>
        <notesContext.Provider value={{ notes, dispatchNotes }}>
          <tasksContext.Provider value={{ tasks, dispatchTasks }}>
            {children}
          </tasksContext.Provider>
        </notesContext.Provider>
      </editorOpener.Provider>
    </searchContext.Provider>
  )
}
