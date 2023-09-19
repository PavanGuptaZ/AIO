export const useGetTime = (date2, date1) => {
    const differenceinSeconds = date2 - date1;

    const milliSeconds = differenceinSeconds / 1000;
    const minutes = Math.floor(differenceinSeconds / (1000 * 60));
    const hours = Math.floor(differenceinSeconds / (1000 * 60 * 60));
    const days = Math.floor(differenceinSeconds / (1000 * 60 * 60 * 24));
    const months = Math.floor(differenceinSeconds / (1000 * 60 * 60 * 30 * 24));

    return { milliSeconds, minutes, hours, days, months }
}
