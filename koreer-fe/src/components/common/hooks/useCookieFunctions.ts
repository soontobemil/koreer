export function useCookieFunctions() {
    const getCookie = (name:string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) { // @ts-ignore
            return parts.pop().split(';').shift();
        }
        return null;
    };

    const removeCookie = (name: string) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    };

    return{
        getCookie, removeCookie
    }
}