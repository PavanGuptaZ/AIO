import './App.css';
import { Notes, OverView, Support, Tasks, PageNotFound, NoteFullView } from './Files/Pages';
import { Header, NavigatorNav, NoteViewer, TaskViewer, TagViewer, NotesRoute } from './Files/Components';
import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { editorOpener, notesContext, tasksContext } from './Files/Hooks/useContextProvider';

function App() {
  const { editorViewer } = useContext(editorOpener);
  const { tasks } = useContext(tasksContext);
  const { notes } = useContext(notesContext);
  return (
    <div className="Full-body">
      <main>
        <div className='contentBox'>
          <Header />
          <Routes>
            <Route path="/" element={<OverView />} />
            <Route path="notes" element={<Notes />} >
              <Route index element={<NotesRoute value={"all"} />} />
              {notes.categories.map((ele, idx) => {
                if (ele !== "all") {
                  return (<Route key={idx} path={ele} element={<NotesRoute value={ele} />} />)
                }
                return null
              })}
              <Route path="*" element={<PageNotFound />} />
            </Route>
            <Route path="tasks" element={<Tasks />}>
              <Route index element={<Tasks value={"all"} />} />
              {tasks.categories.map((ele, idx) => (<Route key={idx} path={ele} element={<Tasks value={ele} />} />))}
              <Route path="*" element={<PageNotFound />} />
            </Route>
            <Route path="support" element={<Support />} />
            <Route path="FullViewNotes/:idNote" element={<NoteFullView />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>

        <NavigatorNav />


      </main>
      {editorViewer.notes && <NoteViewer />}
      {editorViewer.tasks && <TaskViewer />}
      {editorViewer.tag && <TagViewer />}
    </div>
  );
}

export default App;
