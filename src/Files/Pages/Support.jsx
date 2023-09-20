import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Support = () => {
  const style01 = {
    fontSize: "2rem",
    fontWeight: "500",
    margin: "10px 0",
    textAlign: "center"
  }
  const [viewNote, setViewNote] = useState({ view: false, text: "" })
  const navigator = useNavigate();
  const handleViewNote = () => {
    setViewNote((pre) => ({ ...pre, view: !viewNote.view }))
  }
  const handleClearEverything = (e) => {
    e.preventDefault();
    if (viewNote.text === "Yes Clear") {
      localStorage.clear();
      navigator("/");
      window.location.reload();
    } else {
      return
    }

  }

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <div>
        <div style={style01}>Website ShortCuts</div>
        <table style={{ width: "fit-content" }}>
          <thead>
            <tr>
              <th>Shortcuts</th>
              <th>Page</th>
              <th>description</th>
              <th>Working?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan={2}>Escape</td>
              <td>overview, Notes and Tasks</td>
              <td>Close Popup</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>overview, Notes and Tasks</td>
              <td>Clear Search</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Ctrl + " "</td>
              <td>overview, Notes and Tasks</td>
              <td>New Entry</td>
              <td>no</td>
            </tr>
            <tr>
              <td rowSpan={2}>Right Click, <br /> long Press in touch Screen</td>
              <td>Notes and Tasks</td>
              <td>To Rename Categorys</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>OverView</td>
              <td>Change Greeting Name</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>left Click</td>
              <td>Notes  and tasks</td>
              <td>Open Editing View</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Right Click, <br /> long Press in touch Screen</td>
              <td>Notes only</td>
              <td>Full Editing View</td>
              <td>Yes</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={(handleViewNote)} className='btn02' style={{ margin: "10px" }} >clear EveryThing</button>
      </div>
      <div style={{ maxWidth: "800px", margin: "10px" }}>
        {viewNote.view &&
          <div>
            <form action="" onSubmit={(e) => handleClearEverything(e)} style={{
              display: "flex", justifyContent: "center", gap: "0.5rem",flexDirection:"column",alignItems:"center",
              border: "1px solid gray", margin: "0.5rem", padding: "0.5rem",paddingBottom:"1rem", borderRadius: "0.75rem"
            }}>
              <label className='label01' htmlFor="clearEverthingText">Enter "Yes Clear" here</label>
              <div>
              <input className='text02' id='clearEverthingText' type="text" style={{borderTopRightRadius:"0",borderBottomRightRadius:"0"}}
                value={viewNote.text}
                onChange={(e) => setViewNote((pre) => ({ ...pre, text: e.target.value }))} />
              <input className='btn02' type="submit" style={{borderTopLeftRadius:"0",borderBottomLeftRadius:"0"}} />
              </div>
            </form>
          </div>}
          <div style={{textAlign:"center"}}>
        Still under Construction......
          </div>

      </div>
    </div>
  )
}
