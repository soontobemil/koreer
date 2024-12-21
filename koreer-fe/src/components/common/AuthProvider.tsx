import {jwtDecode} from "jwt-decode";
import {useCallback} from "react";
import {useCookies} from "react-cookie";

// eslint-disable-next-line
function getExpiresFromToken(token: string) {
    const { exp } = jwtDecode(token) as { exp: number };
    return new Date(exp * 1000).toUTCString();
}

export function AuthProvider() {

    const [, setCookie, ] = useCookies(['accessToken', 'refreshToken']);

    const setAccessToken = useCallback(
        (accessToken: string) => {
            const futureDate = new Date();

            // 30 * 24 * 60 * 60 * 1000 = 30일짜리
            futureDate.setTime(futureDate.getTime() + (60 * 60 * 1000)); // 1시간
            setCookie('accessToken', accessToken, {
                path: '/',
                expires: futureDate,
                // domain: '/'
            });
        },
        [setCookie]
    );

    return{
        setAccessToken
    }
}