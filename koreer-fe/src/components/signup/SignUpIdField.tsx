import style from "../../assets/scss/sub/signup.module.scss";
import {handleSaveInput} from "../../util/etcUtil";
import {useCallback} from "react";
import {useDispatch} from "react-redux";
import {duplicateCheck} from "../../slice/signupSlice";

interface Args{
    id: string;
    setId: (_: string) => void
}
export function SignUpIdField({id, setId}: Args) {
    const dispatch = useDispatch<any>();

    const duplicateIdCheck = useCallback(async () => {
            const result:any = await dispatch(duplicateCheck(id)).unwrap();
            console.log(result)
        },
        [dispatch]
    );

    return(
        <>
            <div className={style.content}>
                            <span className={style.contentText}>
                                ID
                            </span>
                <div className={style.contentWithButton}>
                    <input
                        placeholder={"koreer@gmail.com"}
                        className={style.contentInput}
                        onChange={(e) =>handleSaveInput(e, setId)}
                    />
                    <button className={style.checkDuplicatedButton} onClick={duplicateIdCheck}>
                        Duplication Check
                    </button>

                </div>
            </div>
        </>
    )
}