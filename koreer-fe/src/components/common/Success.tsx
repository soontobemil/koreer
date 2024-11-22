import {useLocation} from "react-router-dom";
import {useEffect} from "react";

export function Success() {
    const location = useLocation(); // 현재 URL 정보를 가져옴

    useEffect(() => {
        // 쿼리 파라미터 파싱
        const queryParams = new URLSearchParams(location.search);
        const accessToken = queryParams.get('accessToken');
        const refreshToken = queryParams.get('refreshToken');

        if (accessToken) {
            document.cookie = `accessToken=${accessToken}; path=/; max-age=${60 * 60 * 24};`; // 1일
        }
        if (refreshToken) {
            document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${60 * 60 * 24 * 7};`; // 7일
        }
        window.location.href = "/"
    }, [location]);

    return(
        <>
        </>
    )
}