import React from 'react'

export const Support = () => {
  const style01 = {
    fontSize: "2rem",
    fontWeight: "500",
    margin: "10px 0",
    textAlign: "center"
  }

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <div>
        <div style={style01}>Website ShortCuts</div>
        <table style={{ width: "fit-content" }}>
          <tr>
            <th>Shortcuts</th>
            <th>Page</th>
            <th>description</th>
            <th>Working?</th>
          </tr>
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
            <td>Ctrl + N</td>
            <td>overview, Notes and Tasks</td>
            <td>New Entry</td>
            <td>no</td>
          </tr>
          <tr>
            <td rowSpan={2}>Right Click</td>
            <td>Notes and Tasks</td>
            <td>To Rename Categorys</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>OverView</td>
            <td>Change Greeting Name</td>
            <td>Yes</td>
          </tr>
        </table>
      </div>
      <div style={{ maxWidth: "800px", margin: "10px" }}>
      Under Construction......

      </div>
    </div>
  )
}
