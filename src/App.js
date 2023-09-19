import './App.css';
import { Notes, OverView, Support, Tasks, PageNotFound } from './Files/Pages';
import { Header, NavigatorNav, NoteViewer, TaskViewer, TagViewer } from './Files/Components';
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
            <Route path="notes" >
              <Route index element={<Notes value={"all"} />} />
              {notes.categories.map((ele, idx) => (<Route key={idx} path={ele} element={<Notes value={ele} />} />))}
              <Route path="*" element={<PageNotFound />} />
            </Route>
            <Route path="tasks">
              <Route index element={<Tasks value={"all"} />} />
              {tasks.categories.map((ele, idx) => (<Route key={idx} path={ele} element={<Tasks value={ele} />} />))}
              <Route path="*" element={<PageNotFound />} />
            </Route>
            <Route path="support" element={<Support />} />
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
