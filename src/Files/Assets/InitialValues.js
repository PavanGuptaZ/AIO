export const initial_notes = {
    "categories": ["all", "Personal", "Ideas"],
    "list": [{
        "id": "a",
        "head": "Personal Task",
        "body": "Buy groceries and laundry detergent.",
        "tag": "Personal",
        "time":new Date()
    }, {
        "id": "b",
        "head": "Work Meeting",
        "body": "Prepare for the team meeting at 2 PM.",
        "tag": "Work",
        "time":new Date()

    }, {
        "id": "c",
        "head": "Projects_Ideas",
        "body": "Brainstorm new app ideas.",
        "tag": "Ideas",
        "time":new Date()

    }, {
        "id": "d",
        "head": "Sample",
        "body": "Collect some ideas",
        "tag": "all",
        "time":new Date()

    }],
    "onEditor": {
        "head": 0,
        "body": 0,
        "id": 0,
        "tag": "all",
        "time":new Date()

    }
}

export const initial_tasks = {
    "categories": ["all", "Personal", "Work"],
    "list": [{
        "id": "a",
        "completed": true,
        "body": "Buy groceries",
        "tag": "Personal",
        "priority": "low"
    }, {
        "id": "b",
        "completed": false,
        "body": "Finish homework assignment",
        "tag": "Work",
        "priority": "normal"
    }, {
        "id": "c",
        "completed": true,
        "body": "to be known",
        "tag": "all",
        "priority": "high"
    }, {
        "id": "d",
        "completed": false,
        "body": "Read A book",
        "tag": "Work",
        "priority": "urgent"
    }],
    "onEditor": {
        "id": 0,
        "completed": false,
        "body": 0,
        "tag": "all",
        "priority": "low"
    },
    "priority": {
        "low": "#D8D8D8",
        "normal": "#6FDDFF",
        "high": "#FFCD00",
        "urgent": "#F60302"
    }
}
export const initial_editor = {
    "notes": false,
    "tasks": false,
    "tag": false,
    "tagtype": {
      for: null,
      value: null
    }
  }