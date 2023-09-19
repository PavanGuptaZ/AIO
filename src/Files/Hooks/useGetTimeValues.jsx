export const useGetTimeValues = (key, value) => {
    let time;
    if (key === "date") {
        time = new Date(value);
    } else if (key === "new") {
        time = new Date()
    } else {
        return null;
    }

    let fullYear = time.getFullYear()
    let year = time.getFullYear() % 100
    let month = time.getMonth()
    let day = time.getDate()
    let week = Math.ceil(day / 7);
    let hours = time.getHours()
    let minutes = time.getMinutes()
    let seconds = time.getSeconds()
    let milliseconds = time.getMilliseconds()

    return { fullYear, year, month, week, day, hours, minutes, seconds, milliseconds }

}
