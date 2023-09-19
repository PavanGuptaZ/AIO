export const useVerifyData = (key) => {
    let storedValue = JSON.parse(localStorage.getItem(key))
    if (
        storedValue !== null &&
        storedValue instanceof Object &&
        (storedValue.hasOwnProperty("categories") || storedValue.hasOwnProperty("list") || storedValue.hasOwnProperty("onEditor")) &&
        storedValue.categories instanceof Array &&
        storedValue.list instanceof Array &&
        storedValue.onEditor instanceof Object &&
        storedValue.categories.includes("all")
    ) {
        return storedValue;
    }else{
        return false;
    }
}
