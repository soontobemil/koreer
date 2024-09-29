import {useCallback, useEffect, useState} from "react";
import {TipsDTO} from "../../../types/tips";
import {useDispatch} from "react-redux";
import {getTips} from "../../../slice/tipsSlice";

export function useTipsGetter() {
    const [tips, setTips] = useState<TipsDTO>();

    const dispatch = useDispatch<any>();
    const getTip = useCallback(async () => {

        try {
            const result: TipsDTO = await dispatch(getTips()).unwrap().then(() => {
                setTips(result)
                console.log('success')
            });

        } catch (e) {
            console.log('error message : ', e)
        }

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (!tips) {
            getTip().then();
        }
    }, []);
    console.log(tips)
    return{
        tips
    }
}