var Task = ({title, date, details, priority, tags, project}) => {
    return {
        title: title || "",
        date: new Date(date),
        details: details || "",
        priority: priority || 0,
        tags: tags || [],
        project
    }
}

export default Task