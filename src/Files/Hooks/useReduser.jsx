export const notesFunction = (notes, action) => {
  let { type, payload } = action;
  // console.log(type, payload);
  switch (type) {
    case "ADDNOTE":
      return { ...notes, list: [...notes.list, payload] };
    case "UPDATE_NOTE":
      return {
        ...notes, list: notes.list.map((ele) =>
          ele.id === payload.id ? { ...ele, ...payload } : ele
        )
      };
    case "DELETE_NOTE":
      return {
        ...notes, list: notes.list.filter((ele) => ele.id !== payload.id)
      };
    case "REMOVE_ONEDITOR":
      return { ...notes, onEditor: { "head": 0, "body": 0, "id": 0, "tag": "all" } };
    case "ADD_TO_ONEDITOR":
      return { ...notes, onEditor: payload };
    case "ADD_TAG":
      return { ...notes, categories: [...notes.categories, payload] };
    case "UPDATE_TAG":
      return {
        ...notes, categories: notes.categories.map((ele) =>
          ele === payload.old ? payload.new : ele),
        list: notes.list.map((ele) =>
          ele.tag === payload.old ? { ...ele, tag: payload.new } : ele
        )
      };
    case "DELETE_TAG":
      return {
        ...notes, list: notes.list.map((ele) =>
          ele.tag === payload ? { ...ele, tag: "all" } : ele),
        categories: notes.categories.filter((ele) => ele !== payload)
      };
    default:
      return notes;
  }
}
export const tasksFunction = (tasks, action) => {
  let { type, payload } = action;
  switch (type) {
    case "ADDTASK":
      return { ...tasks, list: [...tasks.list, payload] };
    case "UPDATE_TASK":
      return {
        ...tasks, list: tasks.list.map((ele) =>
          ele.id === payload.id ? { ...ele, ...payload } : ele
        )
      };
    case "DELETE_TASK":
      return {
        ...tasks, list: tasks.list.filter((ele) => ele.id !== payload.id)
      };
    case "ADD_TO_ONEDITOR":
      return { ...tasks, onEditor: payload };
    case "REMOVE_ONEDITOR":
      return { ...tasks, onEditor: { "id": 0, "completed": false, "body": 0, "tag": "all","priority":"low" } };
    case "ADD_TAG":
      return { ...tasks, categories: [...tasks.categories, payload] };
    case "UPDATE_TAG":
      return {
        ...tasks, categories: tasks.categories.map((ele) =>
          ele === payload.old ? payload.new : ele),
        list: tasks.list.map((ele) =>
          ele.tag === payload.old ? { ...ele, tag: payload.new } : ele)
      };
    case "DELETE_TAG":
      return {
        ...tasks, list: tasks.list.map((ele) =>
          ele.tag === payload ? { ...ele, tag: "all" } : ele),
        categories: tasks.categories.filter((ele) => ele !== payload)

      };
    default:
      return tasks;
  }
}