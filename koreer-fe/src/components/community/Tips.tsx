import {useTipsGetter} from "./hooks/useTipsGetter";
import {useEffect} from "react";

export function Tips() {

    const{tips} = useTipsGetter();

    useEffect(() => {
        console.log(tips)
    }, []);
    console.log(123123)
    return(
        <>
            <button>tips</button>
        </>
    )
}