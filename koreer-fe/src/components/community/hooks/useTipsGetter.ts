import {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getTips} from "../../../slice/tipsSlice";
import {PageResponseDTO, ResponseDTO} from "../../../slice/common";

export function useTipsGetter() {
    const [tips, setTips] = useState<PageResponseDTO>();
    const [isLoaded, setIsLoaded] = useState(false);

    const dispatch = useDispatch<any>();
    const getTip = useCallback(async () => {
        try {
            const result: ResponseDTO = await dispatch(getTips()).unwrap();
            setTips(result.result)
            return result;
        } catch (e) {
            console.error('Error getting tips:', e);
            return null;
        }finally {
            setIsLoaded(true)
        }
    }, [dispatch]);

    useEffect(() => {
        if (!tips) {
            getTip().then();
        }
        // eslint-disable-next-line
    }, []);
    return{
        getTip, tips, isLoaded
    }
}