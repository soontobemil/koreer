import style from "../../assets/scss/sub/signup.module.scss";
import {handleSaveInput} from "../../util/etcUtil";
import {useCallback, useEffect} from "react";
import {useDispatch} from "react-redux";
import {duplicateCheck} from "../../slice/signupSlice";
import {ValidateStatus} from "../../types/signup";

interface duplResult {
    message: string;
}

interface Args{
    id: string;
    setId: (_: string) => void
    idValidate: ValidateStatus;
    setIdValidate: (_: ValidateStatus) => void;
    isDuplecateChecked: boolean;
    setIsDuplecateChecked: (_: boolean) => void
}
export function SignUpIdField({id, setId, idValidate, setIdValidate, isDuplecateChecked, setIsDuplecateChecked}: Args) {
    const dispatch = useDispatch<any>();
    // const [dupleMessage, setDupleMessage] = useState('');

    const duplicateIdCheck = useCallback(async () => {
            const result: duplResult = await dispatch(duplicateCheck(id)).unwrap();

            setIsDuplecateChecked(true);
            setIdValidate(ValidateStatus.NONE)
            // setDupleMessage(result.message)
        },
        // eslint-disable-next-line
        [dispatch, id, idValidate]
    );

    // useEffect(() => {
    //     setDupleMessage('')
    // }, [id]);

    useEffect(() => {
        if (id.length > 1) {
            // setDupleMessage('이메일 형식을 맞춰주세요.');
        }
        // eslint-disable-next-line
    }, [idValidate]);

    console.log(idValidate)
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
                {/*<span className={style.confirmMessage}>{dupleMessage}</span>*/}
                {idValidate === ValidateStatus.BELOW_REQUIRED_LENGTH && (
                    <span className={style.duplicateMessage}>
                    이메일을 작성해주세요.
                </span>
                )}

                {idValidate === ValidateStatus.UNFILLED && (
                    <span className={style.duplicateMessage}>
                    Please check the Duplication Check button.
                </span>
                )}
            </div>
        </>
    )
}