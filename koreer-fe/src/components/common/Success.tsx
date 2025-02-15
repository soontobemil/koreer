import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store/store";
import {getCurrentUserAsync} from "../../slice/AuthSlice";

export function Success() {
    const location = useLocation(); // 현재 URL 정보를 가져옴
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        // 쿼리 파라미터 파싱
        const setup = async () => {
            // 토큰 저장
            const params = new URLSearchParams(location.search);
            const accessToken = params.get('accessToken');
            const refreshToken = params.get('refreshToken');

            if (accessToken) {
                document.cookie = `accessToken=${accessToken}; path=/; max-age=${60 * 60 * 24};`;
            }
            if (refreshToken) {
                document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${60 * 60 * 24 * 7};`;
            }

            // 유저 정보 확인
            const result = await dispatch(getCurrentUserAsync()).unwrap();
            if (result.data.role === "auth_user") {
                navigate('/', { replace: true });
            } else {
                navigate('/user-info', { replace: true });
            }
        };

        setup();
    }, [location, dispatch, navigate]);

    return(
        <>
        </>
    )
}